import { NextRequest, NextResponse } from "next/server";

const USERS = [{ username: "vic123", password: "123456", name: "Admin" }];

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
  }
  // Set cookie (simple, not secure for produção)
  const response = NextResponse.json({
    ok: true,
    user: { username: user.username, name: user.name },
  });
  response.cookies.set(
    "colunavistobr_session",
    JSON.stringify({ username: user.username, name: user.name }),
    {
      httpOnly: false,
      path: "/",
      sameSite: "lax",
    }
  );
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("colunavistobr_session", "", { maxAge: 0, path: "/" });
  return response;
}
