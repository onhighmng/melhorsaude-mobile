import { supabase } from "@/lib/supabase";

const SUPABASE_PROJECT_REF = (() => {
  const url = process.env.VITE_SUPABASE_URL;
  if (!url) return null;
  try {
    const hostname = new URL(url).hostname;
    return hostname.split(".")[0] || null;
  } catch (error) {
    if (process.env.DEV) {
      console.debug("Failed to derive Supabase project ref", error);
    }
    return null;
  }
})();

interface ResetOptions {
  signOut?: boolean;
}

export async function resetAppState(options: ResetOptions = {}) {
  const { signOut = false } = options;

  try {
    if (signOut) {
      await supabase.auth.signOut().catch(() => {
        /* ignore */
      });
    }

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    if ("caches" in window) {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((key) => caches.delete(key)));
    }

    if (SUPABASE_PROJECT_REF) {
      localStorage.removeItem(`sb-${SUPABASE_PROJECT_REF}-auth-token`);
    }

    sessionStorage.clear();
  } finally {
    window.location.reload();
  }
}

