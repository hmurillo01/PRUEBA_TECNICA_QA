///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

describe("ID CL002: Caso de prueba 2:Validar que el formulario de login no se envíe si los campos no están completos", () => {

    it("Validar campos vacíos", () => {
        // Visitar la página de inicio de sesión
       cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
       // Validar el título de la página
       cy.title().should('eq', 'Inlaze - QA Test Front');
       cy.log("La función title funcionó correctamente");
       cy.wait(2000);

        // Credenciales registradas previamente
        const login = {
            email: "correo@prueba.com", // Email registrado
            contraseña: "12345Hh*"       // Contraseña registrada
        };

        // Validar que no se envíe si ambos campos están vacíos
        cy.xpath("/html/body/app-root/app-sign-in/main/section[1]/app-sign-in-form/form/button").should("be.disabled");
        cy.wait(2000)
        cy.log("El formulario no se envía si ambos campos están vacíos");

        // Validar que no se envíe si solo el campo de email está vacío
        cy.get("#password").should("be.visible").type(login.contraseña);
        cy.wait(2000)
        cy.xpath("/html/body/app-root/app-sign-in/main/section[1]/app-sign-in-form/form/button").should("be.disabled");
        cy.wait(2000)
        cy.log("El formulario no se envía si el email está vacío");
       

        // Validar que no se envíe si solo el campo de contraseña está vacío
       
        cy.xpath("/html/body/app-root/app-sign-in/main/section[1]/app-sign-in-form/form/div[2]/app-password/div/input").clear();
        cy.wait(2000)
        cy.get("#email").should("be.visible").type(login.email);
        cy.wait(2000)
        cy.xpath("/html/body/app-root/app-sign-in/main/section[1]/app-sign-in-form/form/button").should("be.disabled");
        cy.wait(2000)
        cy.log("El formulario no se envía si la contraseña está vacía");

        // Validar que se pueda enviar cuando ambos campos estén completos
        cy.get("#password").should("be.visible").type(login.contraseña);
        cy.wait(2000)
        cy.get("[type='submit']").should("be.enabled").click();
        cy.wait(2000)
        cy.log("El formulario se envía cuando ambos campos están completos");
    });

});
