import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@/components/app/auth-provider";
import type { ReactNode } from "react";
import AdminPage from "@/app/admin/page";

const MockAuthProvider = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

jest.mock("@/actions/auth", () => ({
  getSession: async () => ({
    payload: { id: 1, name: "Admin", role: "admin" },
  }),
  createSession: async () => ({ status: 200 }),
  destroySession: async () => {},
}));

describe("Admin Page", () => {
  it("should render the Admin title", async () => {
    render(
      <MockAuthProvider>
        <AdminPage />
      </MockAuthProvider>
    );
    expect(
      await screen.findByText(/painel do administrador/i)
    ).toBeInTheDocument();
  });

  it("should match snapshot", async () => {
    const { asFragment } = render(
      <MockAuthProvider>
        <AdminPage />
      </MockAuthProvider>
    );
    await screen.findByText(/painel do administrador/i);
    expect(asFragment()).toMatchSnapshot();
  });
});
