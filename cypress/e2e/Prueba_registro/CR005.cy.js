///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

describe("ID CR005, Caso de Prueba 5:Validar que el formulario no se envíe si hay campos obligatorios incompletos", () => {

    it("Validar campos obligatorios uno a uno", () => {
        // Visitar la página de inicio de sesión
       cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
       // Validar el título de la página
       cy.title().should('eq', 'Inlaze - QA Test Front');
       cy.log("La función title funcionó correctamente");
       cy.wait(2000);

        // Hacer clic en el enlace para registrarse
        cy.get('a[href="/auth/sign-up"]').click();

        // Datos del usuario válido
        const usuario = {
            nombre: "Pepito prueba3",
            email: "correo@prueba.com",
            contraseña: "12345Hh*"
        };

        // Validar campo 'Fullname' este vacío
        cy.get("#full-name").clear();
        cy.wait(2000)
        cy.get("#email").should("be.visible").type(usuario.email);
        cy.wait(2000)
        cy.get("#password").type(usuario.contraseña);
        cy.wait(2000)
        cy.get("#confirm-password").type(usuario.contraseña);
        cy.wait(2000)
        cy.xpath("/html/body/app-root/app-sign-up/main/section[2]/app-sign-up-form/form/button").should("be.disabled");
        cy.log("El formulario no se envía si el campo fullname está vacío");

        // Validar campo 'Email' este vacío
        cy.get("#full-name").type(usuario.nombre);
        cy.wait(2000)
        cy.get("#email").clear();
        cy.wait(2000)
        cy.get("#password").clear().type(usuario.contraseña);
        cy.wait(2000)
        cy.get("#confirm-password").clear().type(usuario.contraseña);
        cy.wait(2000)
        cy.xpath("/html/body/app-root/app-sign-up/main/section[2]/app-sign-up-form/form/button").should("be.disabled");
        cy.log("El formulario no se envía si el campo email está vacío");

        // Validar campo 'Contraseña' este vacío
        cy.get("#email").type(usuario.email);
        cy.wait(2000)
        cy.get("#password").clear();
        cy.wait(2000)
        cy.get("#confirm-password").clear().type(usuario.contraseña);
        cy.wait(2000)
        cy.xpath("/html/body/app-root/app-sign-up/main/section[2]/app-sign-up-form/form/button").should("be.disabled");
        cy.wait(2000)
        cy.log("El formulario no se envía si la contraseña está vacía");

        // Validar campo 'Confirmar Contraseña' este vacío
        cy.get("#password").type(usuario.contraseña);
        cy.wait(2000)
        cy.get("#confirm-password").clear();
        cy.wait(2000)
        cy.xpath("/html/body/app-root/app-sign-up/main/section[2]/app-sign-up-form/form/button").should("be.disabled");
        cy.log("El formulario no se envía si la confirmación de la contraseña está vacía");

        // Completar todos los campos para el formulario se envie correctamente
        cy.get("#confirm-password").type(usuario.contraseña);
        cy.xpath("/html/body/app-root/app-sign-up/main/section[2]/app-sign-up-form/form/button").should("be.enabled");
        cy.wait(3000)
        cy.get('button[type="submit"]').should('be.enabled').click();
        cy.log("El formulario es enviable cuando todos los campos están completos");
    });

});
