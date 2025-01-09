///<reference types="Cypress"/>
require('cypress-plugin-tab');
require('cypress-xpath');

describe("ID CL004, Caso de prueba 4:Verificar que la plataforma permita cerrar la sesión correctamente", () => {
    it("Validar funcionalidad de cierre de sesión", () => {
          // Visitar la página de inicio de sesión
      cy.visit("https://test-qa.inlaze.com/auth/sign-in");
        
      // Validar el título de la página
      cy.title().should('eq', 'Inlaze - QA Test Front');
      cy.log("La función title funcionó correctamente");
      cy.wait(2000);
        // Credenciales de acceso
        const login = {
            email: "correo@prueba.com",
            password: "12345Hh*"
        };

        // Ir a la página de inicio de sesión
        cy.visit("https://test-qa.inlaze.com/auth/sign-in");

        // Iniciar sesión con credenciales válidas
        cy.get("#email").type(login.email);
        cy.wait(2000)
        cy.get("#password").type(login.password);
        cy.wait(2000)
        cy.get('button[type="submit"]').click();

        // Verificar redirección al panel
        cy.url().should("eq", "https://test-qa.inlaze.com/panel");

        // Hacer clic en la imagen para desplegar el campo de logout
        cy.get('img[alt="Rengoku"]').should("be.visible").click(); // Selector del atributo `alt` para identificar la imagen
        cy.wait(2000) 
          
          // Verificar que el nombre del usuario esté visible en el formulario
          cy.xpath("//ul//a[contains(text(), 'Logout')]").should("be.visible").click();
          cy.wait(2000)
        
        // Verificar redirección a la página de inicio de sesión
        cy.url().should("eq", "https://test-qa.inlaze.com/auth/sign-in");

        // Se valida que ya no se pueda acceder al panel sin iniciar sesión
        cy.visit("https://test-qa.inlaze.com/panel");
        cy.url().should("eq", "https://test-qa.inlaze.com/auth/sign-in");
    });
});

