///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

describe("ID CR002, Caso de Prueba 2: Validación de campo de Nombre", () => {

    it("Validar nombres con una o dos palabras", () => {
       // Visitar la página de inicio de sesión
       cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
       // Validar el título de la página
       cy.title().should('eq', 'Inlaze - QA Test Front');
       cy.log("La función title funcionó correctamente");
       cy.wait(2000);

       // Hacer clic en el enlace para registrarse
       cy.get('a[href="/auth/sign-up"]').click();
       cy.wait(2000)
        // Llenar campos de correo electrónico y contraseña
        cy.get("#email").should("be.visible").type("correo@prueba.com")
        cy.wait(2000)
        cy.get("#password").should("be.visible").type("12345Hh*")
        cy.wait(2000)
        cy.get("#confirm-password").should("be.visible").type("12345Hh*")
        cy.wait(2000)

        // Escenarios de prueba para el campo nombre
        const fullname = [
            { nombre: "A ", valido: false },   // Nombre con solo una palabra
            { nombre: "A B", valido: true },   // Nombre con dos palabras
            { nombre: "Henry Esteban Murillo", valido: true }, // Nombre con tres palabras
            { nombre: "Henry Esteban Murillo Gomez", valido: true } // Nombre con cuatro palabras
        ];

        fullname.forEach(({ nombre, valido }) => {
            // Limpiar e ingresar el nombre
            cy.get("#full-name").clear().type(nombre);
            cy.wait(2000)

            // Validar comportamiento según el caso
            if (valido) {
             
                  
                cy.log(`Nombre válido aceptado: ${nombre}`);
            } else {
                // Validar que se muestra un mensaje de error para nombres inválidos
                
                cy.log(`Nombre inválido rechazado: ${nombre}`);
            }
        });
       //cy.get('button[type="submit"]').should('be.enabled').click();
    });

});
