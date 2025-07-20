/// <reference types="cypress" />

// cypress/e2e/admin-home-edit.cy.ts

describe("Admin Home Edit Flow", () => {
  const ADMIN_EMAIL = "admin@admin.com"; // ajuste conforme seed
  const ADMIN_PASSWORD = "admin"; // ajuste conforme seed

  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login as admin, access admin page, and edit Hero section", () => {
    // Fill login form
    cy.get('input[name="email"]').type(ADMIN_EMAIL);
    cy.get('input[name="password"]').type(ADMIN_PASSWORD);
    cy.get('button[type="submit"]').click();

    // Should redirect to /admin
    cy.url().should("include", "/admin");

    // Should see edit options for home page
    cy.contains(/edit home/i).should("be.visible");

    // Should see Hero component (by test id or text)
    cy.get('[data-testid="hero-section"]').should("exist");

    // Check if edit button for Hero is present and click it
    cy.get('[data-testid="edit-hero-button"]').should("be.visible").click();

    // Check for edit fields (inputs) for title, subtitle, text, and image
    cy.get('[data-testid="hero-title-input"]')
      .should("be.visible")
      .clear()
      .type("Novo Título Hero");
    cy.get('[data-testid="hero-subtitle-input"]')
      .should("be.visible")
      .clear()
      .type("Novo Subtítulo Hero");
    cy.get('[data-testid="hero-text-input"]')
      .should("be.visible")
      .clear()
      .type("Novo texto do Hero para teste.");

    // Simular upload de imagem (ajuste o caminho conforme necessário)
    const imagePath = "file2.png";
    cy.get('[data-testid="hero-image-input"]').attachFile(imagePath);

    // Submeter edição
    cy.get('[data-testid="hero-save-button"]').click();

    // Verificar se as alterações aparecem na interface
    cy.get('[data-testid="hero-title"]').should("contain", "Novo Título Hero");
    cy.get('[data-testid="hero-subtitle"]').should(
      "contain",
      "Novo Subtítulo Hero"
    );
    cy.get('[data-testid="hero-text"]').should(
      "contain",
      "Novo texto do Hero para teste."
    );
    cy.get('[data-testid="hero-image"]')
      .should("have.attr", "src")
      .and("include", "file2.png");
  });
});
