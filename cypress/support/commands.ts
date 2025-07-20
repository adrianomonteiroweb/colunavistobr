import "cypress-file-upload";
import USERS from "../fixtures/users";

Cypress.Commands.add("login", (role: keyof typeof USERS) => {
  const { email, password } = USERS[role];
  cy.visit("/");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("logout", () => {
  cy.get('[data-testid="logout"]').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(role: "user" | "admin"): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}
