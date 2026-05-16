import React, { Suspense } from 'react';
import MelhorSaudeLanding from '@/figma/imports/MelhorSaudeLanding';

export default function PublicLandingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <MelhorSaudeLanding />
        </Suspense>
    );
}
