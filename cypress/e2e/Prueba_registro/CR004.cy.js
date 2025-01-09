///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

// Caso de prueba para validar contraseñas
describe("ID CR004, Caso de Prueba 4: Validación de contraseñas", () => {

    it("Validar contraseña con requisitos específicos", () => {
        // Visitar la página de inicio de sesión
        cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
        // Validar el título de la página
        cy.title().should('eq', 'Inlaze - QA Test Front');
        cy.log("La función title funcionó correctamente");
        cy.wait(2000);

        // Hacer clic en el enlace para registrarse
        cy.get('a[href="/auth/sign-up"]').click();
        cy.wait(2000);

        // Llenar campos de nombre y correo electrónico
        cy.get("#full-name").should("be.visible").type("Pepito Prueba").tab().type("correo@prueba.com");
        cy.wait(2000);

        // Probar contraseñas válidas e inválidas
        const contraseñas = [
            { password: "123", valid: false },          // Menos de 8 caracteres
            { password: "abcdefgh", valid: false },    // Sin mayúscula ni carácter especial
            { password: "ABCDEFGH", valid: false },    // Sin minúscula ni carácter especial
            { password: "12345Hh*", valid: true },     // Cumple con los requisitos
        ];

        contraseñas.forEach(({ password, valid }) => {
            // Ingresar contraseña y confirmación
            cy.get("#password").clear().type(password);
            cy.get("#confirm-password").clear().type(password);

            // Validar mensaje de error o aceptación según la validez
            if (valid) {
                cy.get('.error-message').should('not.exist'); // Suponiendo que exista un mensaje de error para contraseñas inválidas
                  
                cy.log(`Contraseña válida: ${password}`);
            } else {
               
                cy.log(`Contraseña inválida: ${password}`);
            }
        });

        // Asegurarse de que una contraseña válida permita continuar
        cy.get("#password").clear().type("12345Hh*");
        cy.get("#confirm-password").clear().type("12345Hh*");
        cy.get('button[type="submit"]').should('be.enabled').click();

      
    });
});
