import { loginAdmin } from "@/actions/loginAdmin";
import { describe, it, expect } from "@jest/globals";

// Polyfill para Node.js (Jest)
if (typeof global.TextEncoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.TextEncoder = require("util").TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  global.TextDecoder = require("util").TextDecoder;
}

// Credenciais do .env e seed
const USERNAME = "vic123";
const PASSWORD = "123456";
const WRONG_PASSWORD = "wrongpass";

describe("loginAdmin", () => {
  it("should login with correct credentials", async () => {
    const user = await loginAdmin(USERNAME, PASSWORD);
    expect(user).not.toBeNull();
    expect(user?.username).toBe(USERNAME);
  });

  it("should not login with wrong password", async () => {
    const user = await loginAdmin(USERNAME, WRONG_PASSWORD);
    expect(user).toBeNull();
  });

  it("should not login with non-existent user", async () => {
    const user = await loginAdmin("notfound", PASSWORD);
    expect(user).toBeNull();
  });
});
