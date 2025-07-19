const USERS = [
  {
    email: "admin@teste.com",
    password: "admin123",
    role: "admin",
    name: "Admin",
  },
  { email: "user@teste.com", password: "user123", role: "user", name: "User" },
];

let currentSession: any = null;

export const createSession = async (email: string, password: string) => {
  const user = USERS.find((u) => u.email === email && u.password === password);
  if (user) {
    currentSession = { payload: user };
    return { status: 200 };
  }
  currentSession = null;
  return { status: 401 };
};

export const destroySession = async () => {
  currentSession = null;
  return null;
};
// Stub for @/actions/auth
// TODO: Implement real authentication logic as needed for your project

export const getSession = async () => {
  return currentSession;
};

export const signIn = async () => {
  // Implement sign-in logic
};

export const signOut = async () => {
  // Implement sign-out logic
};
