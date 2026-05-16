
// Secure Storage wrapper using Web Crypto API (AES-GCM)
// Improvement: Keys are now derived from the User Identity, preventing cross-user data access.

const ENC_ALGO = 'AES-GCM';
const STORAGE_PREFIX = 'secure_';

class SecureStorageService {
    private keyCache: Map<string, CryptoKey> = new Map();

    /**
     * Derives an encryption key specific to the current user.
     * Uses SHA-256(UserId + AppSalt) to ensure User A cannot decrypt User B's data.
     * Note: This is client-side obfuscation. Truly sensitive data should not be stored in LocalStorage.
     */
    private async getEncryptionKey(userId: string): Promise<CryptoKey> {
        if (this.keyCache.has(userId)) {
            return this.keyCache.get(userId)!;
        }

        const encoder = new TextEncoder();
        // We use the Anon Key as a partial salt because it is constant for the app, 
        // ensuring the key is consistent across reloads.
        const salt = process.env.VITE_SUPABASE_ANON_KEY || 'melhor-saude-static-salt';
        const keyMaterial = encoder.encode(`${userId}:${salt}`);

        const hash = await window.crypto.subtle.digest('SHA-256', keyMaterial);

        const key = await window.crypto.subtle.importKey(
            'raw',
            hash,
            { name: ENC_ALGO },
            false,
            ['encrypt', 'decrypt']
        );

        this.keyCache.set(userId, key);
        return key;
    }

    /**
     * Stores an encrypted item bound to the specific user.
     */
    async setItem(userId: string, key: string, value: any): Promise<void> {
        try {
            if (!userId) throw new Error('SecureStorage: userId is required');

            const cryptoKey = await this.getEncryptionKey(userId);
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const encodedValue = new TextEncoder().encode(JSON.stringify(value));

            const encryptedContent = await window.crypto.subtle.encrypt(
                { name: ENC_ALGO, iv },
                cryptoKey,
                encodedValue
            );

            // Pack IV + Data
            const buffer = new Uint8Array(encryptedContent);
            const combined = new Uint8Array(iv.length + buffer.length);
            combined.set(iv);
            combined.set(buffer, iv.length);

            // Store as Base64 with user-prefixed key
            const base64 = btoa(String.fromCharCode(...combined));
            localStorage.setItem(`${STORAGE_PREFIX}${userId}_${key}`, base64);
        } catch (error) {
            console.error('SecureStorage Set Error:', error);
            throw error;
        }
    }

    /**
     * Retrieves and decrypts an item for the specific user.
     */
    async getItem<T>(userId: string, key: string): Promise<T | null> {
        try {
            if (!userId) return null;

            const item = localStorage.getItem(`${STORAGE_PREFIX}${userId}_${key}`);
            if (!item) return null;

            const combined = new Uint8Array(
                atob(item).split('').map(c => c.charCodeAt(0))
            );

            // Extract IV (12 bytes)
            const iv = combined.slice(0, 12);
            const data = combined.slice(12);
            const cryptoKey = await this.getEncryptionKey(userId);

            const decrypted = await window.crypto.subtle.decrypt(
                { name: ENC_ALGO, iv },
                cryptoKey,
                data
            );

            return JSON.parse(new TextDecoder().decode(decrypted));
        } catch (error) {
            console.error('SecureStorage Get Error:', error);
            return null;
        }
    }

    removeItem(userId: string, key: string): void {
        localStorage.removeItem(`${STORAGE_PREFIX}${userId}_${key}`);
    }

    /**
     * Clears all secure storage for a specific user.
     */
    clearUserStorage(userId: string): void {
        const prefix = `${STORAGE_PREFIX}${userId}_`;
        Object.keys(localStorage)
            .filter(k => k.startsWith(prefix))
            .forEach(k => localStorage.removeItem(k));
    }
}

export const secureStorage = new SecureStorageService();
