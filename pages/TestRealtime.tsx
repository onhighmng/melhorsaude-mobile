import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';

export default function TestRealtime() {
    const { user } = useAuth();
    const [status, setStatus] = useState<'CONNECTING' | 'SUBSCRIBED' | 'DISCONNECTED' | 'CHANNEL_ERROR'>('CONNECTING');
    const [events, setEvents] = useState<any[]>([]);
    const [pingCount, setPingCount] = useState(0);

    useEffect(() => {
        if (!user) return;

        // Create a unique channel for testing
        const channelName = `test-realtime-${user.id}-${Date.now()}`;
        console.log(`Subscribing to channel: ${channelName}`);

        // Subscribe to NOTIFICATIONS table (or any table you enabled)
        // We use notifications because we can safely insert into it for testing
        const channel = supabase
            .channel(channelName)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    console.log('Event received!', payload);
                    setEvents((prev) => [payload, ...prev]);
                }
            )
            .subscribe((state) => {
                console.log(`Subscription state changed: ${state}`);
                setStatus(state === 'SUBSCRIBED' ? 'SUBSCRIBED' : state === 'CHANNEL_ERROR' ? 'CHANNEL_ERROR' : status);
            });

        return () => {
            console.log('Cleaning up subscription');
            supabase.removeChannel(channel);
        };
    }, [user]);

    const simulateChange = async () => {
        if (!user) return;
        try {
            setPingCount(p => p + 1);
            // Insert a dummy notification
            const { error } = await supabase
                .from('notifications')
                .insert({
                    user_id: user.id,
                    type: 'system',
                    title: `Test Realtime ${pingCount + 1}`,
                    message: 'This is a test notification to verify realtime sync.',
                    is_read: false
                });

            if (error) {
                console.error('Insert error:', error);
                alert(`Error: ${error.message}`);
            }
        } catch (err: any) {
            console.error('Error:', err);
            alert(`Exception: ${err.message}`);
        }
    };

    const clearEvents = () => setEvents([]);

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Realtime Diagnostic Tool
                        <Badge variant={status === 'SUBSCRIBED' ? 'default' : 'destructive'} className={status === 'SUBSCRIBED' ? 'bg-green-500' : ''}>
                            {status}
                        </Badge>
                    </CardTitle>
                    <CardDescription>
                        Use this tool to verify if Supabase Realtime is working for your current session.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-slate-100 p-4 rounded-md min-h-[200px] max-h-[400px] overflow-y-auto font-mono text-sm">
                        {events.length === 0 ? (
                            <p className="text-gray-400 italic text-center py-8">No events received yet.</p>
                        ) : (
                            events.map((evt, i) => (
                                <div key={i} className="mb-2 pb-2 border-b border-gray-200 last:border-0">
                                    <div className="text-xs text-blue-600 font-bold">{evt.eventType} on {evt.table}</div>
                                    <div className="text-xs text-gray-500">{new Date(evt.commit_timestamp).toLocaleTimeString()}</div>
                                    <pre className="mt-1 text-xs overflow-x-auto">
                                        {JSON.stringify(evt.new || evt.old, null, 2)}
                                    </pre>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={clearEvents}>Clear Log</Button>
                    <Button onClick={simulateChange} disabled={status !== 'SUBSCRIBED'}>
                        Trigger Test Event (Insert Notification)
                    </Button>
                </CardFooter>
            </Card>

            <div className="text-sm text-gray-500">
                <p><strong>How to interpret:</strong></p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Status:</strong> Should be <span className="text-green-600 font-bold">SUBSCRIBED</span>. If CONNECTING stays forever, check your network or Supabase URL.</li>
                    <li><strong>Trigger Event:</strong> Clicking the button inserts a row into <code>notifications</code>. If Realtime works, it should appear in the log immediately.</li>
                    <li>If nothing appears after clicking, the <code>supabase_realtime</code> publication might be missing the table, or RLS is blocking the subscription.</li>
                </ul>
            </div>
        </div>
    );
}
