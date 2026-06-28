"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

export interface User {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  hydrated: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (
    name: string,
    email: string,
    password: string
  ) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const SESSION_KEY = "ampario.session";
const USERS_KEY = "ampario.users";

interface StoredUser extends User {
  password: string;
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persistSession = useCallback((u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  }, []);

  const register = useCallback(
    (name: string, email: string, password: string) => {
      const users = readUsers();
      const normalized = email.trim().toLowerCase();
      if (users.some((u) => u.email === normalized)) {
        return { ok: false, error: "Un compte existe déjà avec cet email." };
      }
      const newUser: StoredUser = { name, email: normalized, password };
      writeUsers([...users, newUser]);
      persistSession({ name, email: normalized });
      return { ok: true };
    },
    [persistSession]
  );

  const login = useCallback(
    (email: string, password: string) => {
      const users = readUsers();
      const normalized = email.trim().toLowerCase();
      const found = users.find((u) => u.email === normalized);
      if (!found || found.password !== password) {
        return { ok: false, error: "Email ou mot de passe incorrect." };
      }
      persistSession({ name: found.name, email: found.email });
      return { ok: true };
    },
    [persistSession]
  );

  const logout = useCallback(() => persistSession(null), [persistSession]);

  return (
    <AuthContext.Provider
      value={{ user, hydrated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
