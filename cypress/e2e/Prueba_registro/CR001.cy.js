///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

describe("ID CR001:Caso de prueba1: Verificar registro de usuario con datos válidos", () => {

    it("Registrar un usuario con nombre, email y contraseña válidos", () => {
       // Visitar la página de inicio de sesión
       cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
       // Validar el título de la página
       cy.title().should('eq', 'Inlaze - QA Test Front');
       cy.log("La función title funcionó correctamente");
       cy.wait(2000);

        // Hacer clic en el enlace para registrarse
        cy.get('a[href="/auth/sign-up"]').click();

        // Datos de registro al formulario
        const usuario = {
            nombre: "Pepito prueba",
            email: "correo@prueba.com", // Email válido
            contraseña: "12345Hh*"
        };

        // Llenar el formulario de registro
        cy.get("#full-name").should("be.visible").type(usuario.nombre);
        cy.get("#email").should("be.visible").type(usuario.email);
        cy.get("#password").should("be.visible").type(usuario.contraseña);
        cy.get("#confirm-password").should("be.visible").type(usuario.contraseña);

        // Clic en el boton registrar
        cy.xpath("/html/body/app-root/app-sign-up/main/section[2]/app-sign-up-form/form/button").should("be.enabled").click();


        cy.log("El usuario fue registrado exitosamente.");
    });

});
