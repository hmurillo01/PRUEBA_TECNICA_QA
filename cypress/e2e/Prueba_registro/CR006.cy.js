///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

describe("ID CR006, Caso de Prueba 6:Validar que el sistema informe si las contraseñas no coinciden", () => {

    it("Verificar error por contraseñas diferentes", () => {
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
            nombre: "Henry Murillo",
            email: "correo@prueba4.com",
            contraseña: "Contrasea@111",
            confirmacion: "Contrasea@112" // Contraseña no coincidente
        };

        // Llenar el formulario de registro
        cy.get("#full-name").should("be.visible").type(usuario.nombre);
        cy.wait(2000)
        cy.get("#email").should("be.visible").type(usuario.email);
        cy.wait(2000)
        cy.get("#password").should("be.visible").type(usuario.contraseña);
        cy.wait(2000)
        cy.get("#confirm-password").should("be.visible").type(usuario.confirmacion);
        cy.wait(2000)

        // Intentar registrar al usuario
        cy.xpath("/html/body/app-root/app-sign-up/main/section[2]/app-sign-up-form/form/button").should("be.disabled");

        // Verificar que aparezca el mensaje de error
        cy.get('.label-text-alt').should("be.visible").and("contain", " Passwords do not match");
        
          
        cy.log("El sistema correctamente informa que las contraseñas no coinciden.");
    });

});
