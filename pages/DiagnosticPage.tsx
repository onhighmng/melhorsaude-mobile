import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/hooks/useBookings';
import { supabase } from '@/lib/supabase';

export default function DiagnosticPage() {
  const { user, profile } = useAuth();
  const { upcomingBookings, pastBookings, loading } = useBookings();
  const [directQueryResult, setDirectQueryResult] = useState<any>(null);
  const [specialistCheck, setSpecialistCheck] = useState<any>(null);

  useEffect(() => {
    runDiagnostics();
  }, [user]);

  const runDiagnostics = async () => {
    if (!user) return;





    // Direct query test
    const { data, error } = await (supabase
      .from('bookings') as any)
      .select('*')
      .eq('user_id', user.id);



    setDirectQueryResult({ data, error });

    // Check if user is also a specialist
    const { data: specData } = await (supabase
      .from('specialists') as any)
      .select('*')
      .eq('user_id', user.id)
      .single();

    setSpecialistCheck(specData);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Booking Diagnostics</h1>

        {/* User Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Info</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto scrollbar-pill text-sm">
            {JSON.stringify({ user, profile }, null, 2)}
          </pre>
        </div>

        {/* useBookings Hook Result */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">useBookings Hook Result</h2>
          <p>Loading: {loading ? 'Yes' : 'No'}</p>
          <p>Upcoming Bookings Count: {upcomingBookings.length}</p>
          <p>Past Bookings Count: {pastBookings.length}</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto scrollbar-pill text-sm mt-4">
            {JSON.stringify({ upcomingBookings, pastBookings }, null, 2)}
          </pre>
        </div>

        {/* Direct Query Result */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Direct Supabase Query</h2>
          {directQueryResult && (
            <>
              <p>Records Found: {directQueryResult.data?.length || 0}</p>
              <p>Error: {directQueryResult.error ? 'Yes' : 'No'}</p>
              <pre className="bg-gray-100 p-4 rounded overflow-auto scrollbar-pill text-sm mt-4">
                {JSON.stringify(directQueryResult, null, 2)}
              </pre>
            </>
          )}
        </div>

        {/* Specialist Check */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Specialist Check</h2>
          {specialistCheck ? (
            <>
              <p className="text-green-600">✅ User IS a specialist</p>
              <pre className="bg-gray-100 p-4 rounded overflow-auto scrollbar-pill text-sm mt-4">
                {JSON.stringify(specialistCheck, null, 2)}
              </pre>
            </>
          ) : (
            <p className="text-gray-600">User is NOT a specialist</p>
          )}
        </div>

        {/* Console Logs Note */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="font-semibold">📝 Check Browser Console</p>
          <p className="text-sm text-gray-700 mt-2">
            Open your browser's developer console (F12) to see detailed logs from the hooks.
          </p>
        </div>

        {/* Refresh Button */}
        <button
          onClick={runDiagnostics}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          🔄 Re-run Diagnostics
        </button>
      </div>
    </div>
  );
}

