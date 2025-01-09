///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

describe("ID CL003, Caso de prueba 3: Validar nombre de usuario", () => {

 it ("Verificar inicio de sesión con credenciales correctas", () => {
      // Visitar la página de inicio de sesión
      cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
      // Validar el título de la página
      cy.title().should('eq', 'Inlaze - QA Test Front');
      cy.log("La función title funcionó correctamente");
      cy.wait(2000);
        
       // Validar el título de la página
       cy.title().should('eq', 'Inlaze - QA Test Front');
       cy.log("La función title funcionó correctamente");
       cy.wait(2000);

        // Credenciales registradas previamente
        const usuario = {
            email: "correo@prueba.com", // Email registrado
            contraseña: "12345Hh*"       // Contraseña registrada
        };

        // Llenar los campos de email y contraseña
        cy.get("#email").should("be.visible").type(usuario.email);
        cy.wait(2000)
        cy.get("#password").should("be.visible").type(usuario.contraseña);

        // Hacer clic en el botón de inicio de sesión
        cy.get('button[type="submit"]').should("be.enabled").click();

        // Verificar redirección o mensaje de éxito
        cy.url().should("eq", "https://test-qa.inlaze.com/panel"); 
        cy.wait(2000)
        cy.xpath("/html/body/app-root/app-panel-root/main/section[1]/h2").should("be.visible").and("contain", " Welcome to Lorem"); // Selector para un mensaje de bienvenida
          
        cy.log("Inicio de sesión exitoso con credenciales correctas.");

        // Verificar que el nombre del usuario esté visible en el formulario
        cy.xpath("/html/body/app-root/app-panel-root/app-navbar/div/div[2]/div/div/h2") 
          .should("be.visible")
          .and("contain", "Pepito Prueba");
          cy.wait(2000)
          cy.log("Se muestra correctamente  el nombre de usuario.");

    });

 
}); 

