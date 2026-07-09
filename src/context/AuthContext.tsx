// ===============================================
// AuthContext.tsx - Estado global de autenticación
// ===============================================
// Este archivo usa React Context + hooks para que
// CUALQUIER componente de la app pueda saber si
// hay un usuario logueado, quién es, hacer login,
// registrarse o cerrar sesión, sin tener que pasar
// props manualmente.
//
// Cómo se usa:
//   1. En main.tsx envolvemos toda la app con
//      <AuthProvider> (como un wrapper)
//   2. Cualquier componente hijo hace:
//      const { user, login, logout } = useAuth();
// ===============================================

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  login as apiLogin,
  registerOwner as apiRegisterOwner,
} from "../services/api";
import type { RegisterOwnerParams } from "../services/api";

// ---------------------------------------------------------
// User - Tipo que representa al usuario autenticado
// ---------------------------------------------------------
// user.barberia es opcional porque al hacer login normal
// (como barbero) no se devuelve la barbería, solo el admin
// la recibe al registrarse.
// ---------------------------------------------------------
type User = {
  _id: string;
  nombre: string;
  email: string;
  rol: "admin" | "barbero";
  barberia?: {
    _id: string;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
  };
};

// ---------------------------------------------------------
// AuthContextValue - lo que expone el contexto
// ---------------------------------------------------------
// Cualquier componente que llame a useAuth() obtiene esto:
type AuthContextValue = {
  user: User | null;          // null si no hay sesión
  token: string | null;       // el JWT, null si no hay sesión
  isAuthenticated: boolean;   // true si hay token
  login: (email: string, password: string) => Promise<void>;
  registerOwner: (params: RegisterOwnerParams) => Promise<void>;
  logout: () => void;
};

// Crear el contexto (inicialmente undefined)
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---------------------------------------------------------
// AuthProvider - componente que envuelve la app
// ---------------------------------------------------------
export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializamos el estado desde localStorage
  // Esto es clave para que si el usuario recarga la página,
  // NO pierda la sesión. El token y el user se guardaron
  // en localStorage al hacer login/register.
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  });

  // isAuthenticated se deriva del token (true si existe)
  const isAuthenticated = !!token;

  // -------------------------------------------------------
  // login() - inicia sesión en el backend
  // -------------------------------------------------------
  // 1. Llama a la función login() de api.ts
  // 2. Si todo sale bien, guarda el token y los datos
  //    del usuario en el estado y en localStorage
  // 3. Si la API lanza error, se propaga hacia arriba
  //    (quien llame a login() debe atraparlo con try/catch)
  // -------------------------------------------------------
  const login = async (email: string, password: string) => {
    const res = await apiLogin({ email, password });

    setToken(res.token);
    setUser({
      _id: res._id,
      nombre: res.nombre,
      email: res.email,
      rol: res.rol,
    });

    // Persistir en localStorage para que sobreviva a recargas
    localStorage.setItem("token", res.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: res._id,
        nombre: res.nombre,
        email: res.email,
        rol: res.rol,
      })
    );
  };

  // -------------------------------------------------------
  // registerOwner() - registra dueño + barbería
  // -------------------------------------------------------
  // Funciona igual que login() pero además guarda los
  // datos de la barbería en el user
  // -------------------------------------------------------
  const registerOwner = async (params: RegisterOwnerParams) => {
    const res = await apiRegisterOwner(params);

    setToken(res.token);
    setUser({
      _id: res._id,
      nombre: res.nombre,
      email: res.email,
      rol: res.rol,
      barberia: res.barberia,
    });

    localStorage.setItem("token", res.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: res._id,
        nombre: res.nombre,
        email: res.email,
        rol: res.rol,
        barberia: res.barberia,
      })
    );
  };

  // -------------------------------------------------------
  // logout() - cierra sesión
  // -------------------------------------------------------
  // Limpia el estado y el localStorage. El componente que
  // llame a logout() debe además redirigir al login con
  // useNavigate()
  // -------------------------------------------------------
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Proveemos todo el valor del contexto a los hijos
  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, registerOwner, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------
// useAuth() - hook para consumir el contexto
// ---------------------------------------------------------
// Es un wrapper sobre useContext que:
//   - Da acceso directo a user, token, login, logout, etc.
//   - Si alguien lo usa fuera de <AuthProvider>, lanza
//     un error claro (en lugar de un undefined silencioso)
// ---------------------------------------------------------
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}