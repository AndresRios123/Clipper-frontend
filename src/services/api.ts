//Holaaaa
const API_BASE = "/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
}


// ---- Auht ----

export type LoginResponse = {
  _id: string;
  nombre: string;
  email: string;
  rol: "admin" | "barbero";
  token: string;
}

export type LoginParams = {
  email: string;
  password: string;
}

export function login(params: LoginParams) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(params),
  })
}

// ---- Register Owner ----

export type RegisterOwnerResponse = LoginResponse & {
  barberia :{
    id_: string;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
  };
};

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