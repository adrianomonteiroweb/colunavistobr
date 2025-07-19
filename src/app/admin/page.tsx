"use client";
import { useState } from "react";
import { useAuth } from "@/components/app/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const { user, login, logout, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoading) {
    return <div className="text-center py-20">Carregando...</div>;
  }

  if (!user) {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      const ok = await login(email, password);
      if (!ok) {
        setError("Credenciais inválidas");
      }
    };
    return (
      <div className="flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4 p-6 bg-white rounded shadow"
        >
          <h1 className="text-2xl font-bold mb-4">Login Administrador</h1>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" disabled={isLoading} className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">
          Acesso restrito ao administrador.
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-bold mb-4">Painel do Administrador</h1>
      <p className="mb-6">Bem-vindo, {user.name || user.email}!</p>
      <Button data-testid="logout" onClick={logout} className="w-32">
        Sair
      </Button>
    </main>
  );
};

export default AdminPage;
