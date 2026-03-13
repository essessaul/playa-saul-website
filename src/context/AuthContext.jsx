import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

function inferRoleFromEmail(email) {
  if (!email) return null;
  const lower = email.toLowerCase();
  if (lower.includes("owner")) return "owner";
  if (lower.includes("sales")) return "sales_manager";
  if (lower.includes("listing")) return "listing_manager";
  return "master_admin";
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      const authSession = data?.session ?? null;

      if (!mounted) return;

      if (authSession?.user) {
        setSession({
          email: authSession.user.email,
          role: authSession.user.user_metadata?.role || inferRoleFromEmail(authSession.user.email),
          user: authSession.user,
        });
      } else {
        setSession(null);
      }
      setLoading(false);
    }

    bootstrap();

    const listener = supabase
      ? supabase.auth.onAuthStateChange((_event, authSession) => {
          if (!mounted) return;
          if (authSession?.user) {
            setSession({
              email: authSession.user.email,
              role: authSession.user.user_metadata?.role || inferRoleFromEmail(authSession.user.email),
              user: authSession.user,
            });
          } else {
            setSession(null);
          }
          setLoading(false);
        })
      : { data: { subscription: { unsubscribe() {} } } };

    return () => {
      mounted = false;
      listener?.data?.subscription?.unsubscribe?.();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      async signIn({ email, password }) {
        if (!supabase) {
          throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data?.user || data?.session?.user;
      },
      async signOut() {
        if (!supabase) {
          setSession(null);
          return;
        }
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      },
      hasRole(allowedRoles = []) {
        return !!session?.role && allowedRoles.includes(session.role);
      }
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
