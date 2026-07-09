// ===============================================
// api.ts - Servicio central para llamadas HTTP
// ===============================================
// Este archivo es la ÚNICA capa que se comunica
// con el backend. Cualquier página o componente
// que necesite datos del servidor debe importar
// las funciones de aquí, NUNCA llamar a fetch()
// directamente.
// ===============================================

// En desarrollo (Vite proxy): API_BASE = "/api" → redirige a localhost:3000
// En producción (Vercel):     API_BASE = "https://..." → va directo a Render
// La variable VITE_API_URL se configura en las env vars de Vercel.
const API_BASE = import.meta.env.VITE_API_URL || "/api";

// -------------------------------------------------
// request() - función genérica que envuelve fetch()
// -------------------------------------------------
// T: es un "genérico" de TypeScript. Sirve para que
//    quien llame a request() pueda decir "esto me va
//    a devolver un objeto de tipo X".
// endpoint: la ruta (ej: "/auth/login")
// options:  lo mismo que le pasas a fetch() (method,
//           body, headers extra, etc.)
// -------------------------------------------------
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // 1. Buscar el JWT en localStorage (lo guardamos al hacer login)
  const token = localStorage.getItem("token");

  // 2. Construir los headers:
  //    - Siempre mandamos Content-Type: application/json
  //    - Si hay token, mandamos Authorization: Bearer <token>
  //    - Si el que llama pasa headers extra, se fusionan
  //      (los extra pueden pisar los nuestros, eso está bien)
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 3. Hacer la petición fetch
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // 4. Convertir la respuesta a JSON
  const data = await res.json();

  // 5. Si el servidor respondió con código de error (401, 400, 500...),
  //    lanzamos una excepción con el mensaje que nos mandó el backend.
  //    Así el código que llama puede atraparlo con try/catch.
  if (!res.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  // 6. Todo bien, devolvemos los datos ya tipados como T
  return data as T;
}

// ===============================================
// AUTH - Login y Registro
// ===============================================

// --- Login ---

// LoginResponse describe la forma exacta de lo que
// devuelve el backend en POST /api/auth/login
export type LoginResponse = {
  _id: string;
  nombre: string;
  email: string;
  rol: "admin" | "barbero";
  token: string;
};

// LoginParams describe lo que hay que mandarle
// al backend para hacer login
export type LoginParams = {
  email: string;
  password: string;
};

// login() llama al endpoint de login y devuelve
// una promesa que resuelve en LoginResponse
export function login(params: LoginParams) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// --- Register Owner ---

// RegisterOwnerResponse extiende LoginResponse porque
// devuelve lo mismo (user + token) y además la barbería
export type RegisterOwnerResponse = LoginResponse & {
  barberia: {
    _id: string;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
  };
};

// RegisterOwnerParams describe todo lo que necesita
// el endpoint de registro con barbería
export type RegisterOwnerParams = {
  nombre: string;
  email: string;
  password: string;
  barberia: {
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
  };
};

export function registerOwner(params: RegisterOwnerParams) {
  return request<RegisterOwnerResponse>("/auth/register/owner", {
    method: "POST",
    body: JSON.stringify(params),
  });
}