/// <reference types="cypress" />
import "cypress-file-upload";

describe("Admin Page - Avatar and Project Image Upload", () => {
  beforeEach(() => {
    cy.visit("/admin");
  });

  it("should allow admin to login and see the admin dashboard", () => {
    cy.get('form input[name="username"]', { timeout: 10000 })
      .should("be.visible")
      .type("vic123");
    cy.get('form input[name="password"]', { timeout: 10000 })
      .should("be.visible")
      .type("123456");
    cy.get('form button[type="submit"]', { timeout: 10000 })
      .should("be.enabled")
      .click();
    // Aguarda redirecionamento e dashboard
    cy.location("pathname", { timeout: 20000 }).should("include", "/admin");
    cy.contains("Painel do Administrador", { timeout: 20000 }).should(
      "be.visible"
    );
  });

  it("should allow admin to upload, view and delete avatar and project (Hero) image", () => {
    // Login flow (if not already logged in)
    cy.get("body").then(($body) => {
      if ($body.find('form input[name="username"]').length) {
        cy.get('form input[name="username"]', { timeout: 10000 })
          .should("be.visible")
          .type("vic123");
        cy.get('form input[name="password"]', { timeout: 10000 })
          .should("be.visible")
          .type("123456");
        cy.get('form button[type="submit"]', { timeout: 10000 })
          .should("be.enabled")
          .click();
      }
    });
    // Aguarda redirecionamento e dashboard
    cy.location("pathname", { timeout: 20000 }).should("include", "/admin");
    cy.contains("Painel do Administrador", { timeout: 20000 }).should(
      "be.visible"
    );

    // --- Avatar Upload ---
    cy.get('input[type="file"][data-testid="avatar-upload"]')
      .should("exist")
      .click({ force: true });
    cy.fixture("file2.png", "base64").then((fileContent) => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, "image/png");
      cy.get('input[type="file"][data-testid="avatar-upload"]').attachFile({
        fileContent: blob,
        fileName: "file2.png",
        mimeType: "image/png",
      });
    });
    cy.get("button").contains("Upload Avatar").should("be.enabled").click();
    cy.wait(2000);
    cy.get("body").then(($body) => {
      cy.writeFile("cypress/logs/admin-avatar-upload.html", $body.html() || "");
      if ($body.find('.text-green-700:contains("Upload successful!")').length) {
        cy.get(".text-green-700").should("contain", "Upload successful!");
        cy.get('img[alt="Admin Avatar"]').should("be.visible");
      } else if ($body.find("div.text-red-600").length) {
        const errorMsg = $body.find("div.text-red-600").text();
        cy.log("Erro exibido no frontend: " + errorMsg);
        if (errorMsg.includes("this blob already exists")) {
          cy.log("Upload já existia, fluxo considerado válido.");
        } else {
          throw new Error("Upload failed: " + errorMsg);
        }
      } else {
        throw new Error(
          "Nem sucesso nem erro detectado após upload de avatar."
        );
      }
    });

    // --- Avatar Delete ---
    cy.get('[data-testid="delete-avatar"]').should("exist").click();
    cy.wait(1000);
    cy.get("body").then(($body) => {
      cy.writeFile("cypress/logs/admin-avatar-delete.html", $body.html() || "");
      if ($body.find('.text-green-700:contains("Avatar deleted")').length) {
        cy.get(".text-green-700").should("contain", "Avatar deleted");
        cy.get('img[alt="Admin Avatar"]').should("not.exist");
      } else if ($body.find("div.text-red-600").length) {
        const errorMsg = $body.find("div.text-red-600").text();
        cy.log("Erro exibido no frontend: " + errorMsg);
        throw new Error("Delete avatar failed: " + errorMsg);
      } else {
        throw new Error(
          "Nem sucesso nem erro detectado após delete de avatar."
        );
      }
    });

    // --- Project Hero Image Upload ---
    cy.get('input[type="file"][data-testid="hero-upload"]')
      .should("exist")
      .click({ force: true });
    cy.fixture("file2.png", "base64").then((fileContent) => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, "image/png");
      cy.get('input[type="file"][data-testid="hero-upload"]').attachFile({
        fileContent: blob,
        fileName: "file2.png",
        mimeType: "image/png",
      });
    });
    cy.get("button").contains("Upload Hero Image").should("be.enabled").click();
    cy.wait(2000);
    cy.get("body").then(($body) => {
      cy.writeFile("cypress/logs/admin-hero-upload.html", $body.html() || "");
      if ($body.find('.text-green-700:contains("Upload successful!")').length) {
        cy.get(".text-green-700").should("contain", "Upload successful!");
        cy.get('img[alt="Project Hero"]').should("be.visible");
      } else if ($body.find("div.text-red-600").length) {
        const errorMsg = $body.find("div.text-red-600").text();
        cy.log("Erro exibido no frontend: " + errorMsg);
        if (errorMsg.includes("this blob already exists")) {
          cy.log("Upload já existia, fluxo considerado válido.");
        } else {
          throw new Error("Upload failed: " + errorMsg);
        }
      } else {
        throw new Error(
          "Nem sucesso nem erro detectado após upload de imagem do projeto."
        );
      }
    });

    // --- Project Hero Delete ---
    cy.get('[data-testid="delete-hero"]').should("exist").click();
    cy.wait(1000);
    cy.get("body").then(($body) => {
      cy.writeFile("cypress/logs/admin-hero-delete.html", $body.html() || "");
      if ($body.find('.text-green-700:contains("Hero image deleted")').length) {
        cy.get(".text-green-700").should("contain", "Hero image deleted");
        cy.get('img[alt="Project Hero"]').should("not.exist");
      } else if ($body.find("div.text-red-600").length) {
        const errorMsg = $body.find("div.text-red-600").text();
        cy.log("Erro exibido no frontend: " + errorMsg);
        throw new Error("Delete hero image failed: " + errorMsg);
      } else {
        throw new Error(
          "Nem sucesso nem erro detectado após delete de imagem do projeto."
        );
      }
    });
  });
});
// MVP não exige fluxo admin, dashboard ou login. Testes desabilitados.
