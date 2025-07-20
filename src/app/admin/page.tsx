"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/app/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const { user, login, isLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/blob-upload-test");
    }
  }, [user, router]);

  if (isLoading) {
    return <div className="text-center py-20">Carregando...</div>;
  }

  if (user) {
    return (
      <div className="text-center py-20">Redirecionando para upload...</div>
    );
  }

  // Renderiza o formulário de login se não estiver logado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Validação username
    if (!username.trim()) {
      setError("Usuário é obrigatório");
      return;
    }
    // Validação senha: 6 dígitos numéricos
    if (!/^\d{6}$/.test(password)) {
      setError("A senha deve conter exatamente 6 dígitos numéricos");
      return;
    }
    const ok = await login(username, password);
    if (!ok) {
      setError("Credenciais inválidas");
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permite apenas números e máximo 6 caracteres
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPassword(value);
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 p-6 bg-white rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Login Administrador</h1>
        <Input
          name="username"
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <Input
          name="password"
          type="password"
          placeholder="Senha (6 dígitos)"
          value={password}
          onChange={handlePasswordChange}
          required
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          autoComplete="current-password"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" disabled={isLoading} className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  );

  // Nunca chega aqui pois redireciona se user existe
};

export default AdminPage;
