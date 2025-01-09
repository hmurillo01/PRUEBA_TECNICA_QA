///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

describe("ID CL001: Caso de prueba 1:Login con Credenciales Correctas e Incorrectas", () => {

 it ("Verificar inicio de sesión con credenciales correctas", () => {
         // Visitar la página de inicio de sesión
       cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
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
    });

    //Prueba con credenciales incorrectas, prueba adicional

/*  it("Verificar que el sistema informe si las credenciales son incorrectas", () => {
        // Visitar la página de inicio de sesión
        cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
        // Validar el título de la página
        cy.title().should('eq', 'Inlaze - QA Test Front');
        cy.log("La función title funcionó correctamente");
        cy.wait(2000);

        // Credenciales incorrectas 
        const usuarioIncorrecto = {
            email: "usuariofalso@correo.com", // Email no registrado
            contraseña: "Contraseñafalsa" // Contraseña incorrecta
        };

        // Llenar los campos con credenciales incorrectas
        cy.get("#email").should("be.visible").type(usuarioIncorrecto.email);
        cy.get("#password").should("be.visible").type(usuarioIncorrecto.contraseña);

        // Hacer clic en el botón de inicio de sesión
        cy.xpath("/html/body/app-root/app-sign-in/main/section[1]/app-sign-in-form/form/button").should("be.disabled");


        cy.log("El boton de ingresar no se habilita al estar las credenciales incorrectas incorrectas");
    });*/

}); 

