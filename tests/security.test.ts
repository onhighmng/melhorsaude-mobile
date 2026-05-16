// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

describe('Security & RLS Verification', () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Optional, for advanced tests

    console.log('Debug: using Supabase URL:', supabaseUrl?.substring(0, 20) + '...');
    console.log('Debug: Service Key present:', !!serviceKey);

    if (!supabaseUrl || !anonKey || supabaseUrl.includes('localhost')) {
        console.warn('Skipping Security Tests: Invalid or Missing Env Vars (URL: ' + supabaseUrl + ')');
        return;
    }

    // Client 1: Anonymous / Unauthenticated
    const anonClient = createClient(supabaseUrl, anonKey);

    it('should deny anonymous access to profiles table', async () => {
        const { data, error } = await anonClient
            .from('profiles')
            .select('*')
            .limit(1);

        // Expect either an error OR empty data (RLS usually returns empty array on select if no policy matches)
        // But for profiles, usually 'public' policy users can view?
        // Let's check the policy: "Users can view own profile".
        // Anonymous users should see NOTHING.

        if (error) {
            // Ideally specific RLS error, but empty data is also valid RLS behavior
            expect(error).toBeDefined();
        } else {
            expect(data).toEqual([]);
        }
    });

    it('should deny anonymous access to companies table', async () => {
        const { data, error } = await anonClient
            .from('companies')
            .select('*')
            .limit(1);

        // Expect empty
        expect(data).toEqual([]);
    });

    // Test Authenticated User Access (if Service Key available to create one)
    if (serviceKey) {
        it('should allow user to view their OWN profile', async () => {
            // Create admin client
            const adminClient = createClient(supabaseUrl, serviceKey, {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            });

            // Create a temp test user
            const email = `test_security_${Date.now()}@example.com`;
            const password = 'securePassword123!';

            const { data: userData, error: createError } = await adminClient.auth.admin.createUser({
                email,
                password,
                email_confirm: true
            });

            if (createError) throw createError;
            const userId = userData.user.id;

            try {
                // Sign in as this user
                const { data: authData, error: signInError } = await anonClient.auth.signInWithPassword({
                    email,
                    password
                });

                if (signInError) throw signInError;

                const userClient = createClient(supabaseUrl, anonKey, {
                    global: { headers: { Authorization: `Bearer ${authData.session.access_token}` } }
                });

                // 1. Check Profile Access (Should be able to see self)
                // Note: Profile might not exist yet if trigger didn't run? 
                // 'profiles' is typically created via trigger on auth.users.
                // Let's wait a moment for trigger?
                await new Promise(r => setTimeout(r, 1000));

                const { data: profile, error: profileError } = await userClient
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();

                // If trigger works, profile exists. If not, it might allow insert?
                // Assuming trigger:
                expect(profileError).toBeNull();
                expect(profile).toBeDefined();
                expect(profile.id).toBe(userId);

                // 2. Check Access to OTHER profiles (Should verify RLS denies it)
                // We need another user ID. 
                // But "select *" often returns only OWN rows.
                // Let's try select * without filter. Should return 1 row (self).
                const { data: allProfiles } = await userClient
                    .from('profiles')
                    .select('*');

                // Assuming this is the only user we created or db has others.
                // RLS typically says "using (id = auth.uid())" -> returns ONLY self.

                // We can't easily assert "doesn't see others" without knowing others exist.
                // But we can assert "sees self".
                expect(allProfiles?.length).toBeGreaterThanOrEqual(1);
                const otherProfiles = allProfiles?.filter(p => p.id !== userId);
                expect(otherProfiles?.length).toBe(0); // Should verify strict isolation

            } finally {
                // Cleanup
                await adminClient.auth.admin.deleteUser(userId);
            }
        });
    } else {
        // If no service role key, we can't test authenticated scenarios fully.
        it.skip('checks authenticated access (requires SUPABASE_SERVICE_ROLE_KEY)', () => { });
    }
});
