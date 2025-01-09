///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

describe("ID CR003, Caso de Prueba 3:Validar que no se pueda registrar un usuario con un email ya existente", () => {

    it("Intentar registro con un email duplicado", () => {
        // Visitar la página de inicio de sesión
       cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
       // Validar el título de la página
       cy.title().should('eq', 'Inlaze - QA Test Front');
       cy.log("La función title funcionó correctamente");
       cy.wait(2000);

        // Hacer clic en el enlace para registrarse
        cy.get('a[href="/auth/sign-up"]').click();

        // Datos del usuario existente
        const usuarioExistente = {
            nombre: "Pepito Prueba2",
            email: "jaimeespriella@outlook.com", // Email ya registrado
            contraseña: "12345Hh*"
        };

        // Llenar el formulario de registro
        cy.get("#full-name").should("be.visible").type(usuarioExistente.nombre);
        cy.get("#email").should("be.visible").type(usuarioExistente.email);
        cy.get("#password").should("be.visible").type(usuarioExistente.contraseña);
        cy.get("#confirm-password").should("be.visible").type(usuarioExistente.contraseña);

        // Intentar registrar el usuario
        cy.get('button[type="submit"]').should("be.enabled").click();

        cy.log("El formulario no posee  un selector de error que valide el correo ya registrado")
          

        cy.log("El sistema correctamente registro un email duplicado.");
    });

});



