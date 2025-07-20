/// <reference types="cypress" />
import "cypress-file-upload";

describe("Blob Upload Test Page", () => {
  it("should upload an image and show success via user clicks", () => {
    cy.visit("/blob-upload-test");

    // Simula o clique do usuário no input de arquivo
    cy.get('input[type="file"]').should("exist").click({ force: true });

    // Seleciona o arquivo de fixture e faz o upload simulando o fluxo real
    cy.fixture("file.png", "base64").then((fileContent) => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, "image/png");
      cy.get('input[type="file"]').attachFile({
        fileContent: blob,
        fileName: "file.png",
        mimeType: "image/png",
      });
    });

    // Simula o clique do usuário no botão de upload
    cy.get("button").contains("Upload").should("be.enabled").click();

    // Aguarda o início do upload
    cy.wait(2000);
    cy.get("body").then(($body) => {
      cy.writeFile("cypress/logs/blob-upload-page.html", $body.html() || "");
      cy.log("HTML da página salvo em cypress/logs/blob-upload-page.html");
    });

    // Aguarda por sucesso ou erro
    cy.get("body", { timeout: 20000 }).then(($body) => {
      if ($body.find('.text-green-700:contains("Upload successful!")').length) {
        cy.get(".text-green-700").should("contain", "Upload successful!");
        cy.get("a")
          .should("have.attr", "href")
          .and("include", "colunavistobr/profile");
        cy.get('img[alt="Uploaded"]').should("be.visible");
      } else if ($body.find("div.text-red-600").length) {
        const errorMsg = $body.find("div.text-red-600").text();
        cy.log("Erro exibido no frontend: " + errorMsg);
        // Permite sucesso se o erro for de blob já existente
        if (errorMsg.includes("this blob already exists")) {
          cy.log("Upload já existia, fluxo considerado válido.");
        } else {
          throw new Error("Upload failed: " + errorMsg);
        }
      } else {
        cy.writeFile("cypress/logs/blob-upload-page.html", $body.html() || "");
        throw new Error(
          "Nem sucesso nem erro detectado após upload. Veja o HTML salvo para debug."
        );
      }
    });
  });
});
