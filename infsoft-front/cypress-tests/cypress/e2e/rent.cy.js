describe('Home Page Rental Tests', () => {
  beforeEach(() => {
    // Realizar login utilizando la interfaz de usuario
    cy.visit('/');
    cy.get('label.login').click(); // Cambiar a la pestaña de login
    cy.get('form.login input[placeholder="Username"]').type('newuser'); // Usuario válido
    cy.get('form.login input[placeholder="Password"]').type('password123'); // Contraseña válida
    cy.get('form.login input[type="submit"]').click();
    cy.url().should('include', '/home'); // Verificar que redirige al home
  });

  it('Should rent a car successfully', () => {
    // Esperar a que los autos se carguen
    cy.get('.single-featured-cars').should('have.length.greaterThan', 0);

    // Hacer clic en el botón "Alquilar" del primer auto
    cy.get('.single-featured-cars').first().find('.rent-button').click();

    // Ingresar el número de días y confirmar el alquiler
    cy.get('input[type="number"]').type('5');
    cy.get('button').contains('Aceptar').click();

    // Verificar que el mensaje de éxito se muestre
    cy.get('.success-message').should('contain', 'Alquiler exitoso');

    // Esperar a que el mensaje desaparezca
    cy.get('.success-message').should('not.exist');
  });

  it('Should view my rentals and return to home', () => {
    // Navegar a mis alquileres
    cy.get('.nav-menu').contains('Mis Alquileres').click();

    // Verificar que estamos en la página de alquileres
    cy.url().should('include', '/my-rentals');
    cy.get('.title').should('contain', 'Mis Alquileres');

    // Verificar que los alquileres se cargan
    cy.get('.rental-item').should('have.length.at.least', 0);

    // Volver al home
    cy.get('.back-button').click();
    cy.url().should('include', '/home');
  });

  it('Should logout successfully', () => {
    // Hacer click en logout
    cy.get('.nav-menu').contains('Logout').click();

    // Verificar que aparece el modal de confirmación
    cy.get('.modal').should('be.visible');
    cy.get('.modal-content').contains('¿Estás seguro que deseas salir?');

    // Confirmar logout
    cy.get('button').contains('Sí').click();

    // Verificar que redirige al login
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Verificar que el token fue eliminado
    cy.window().its('localStorage').invoke('getItem', 'jwt').should('be.null');
    cy.window().its('localStorage').invoke('getItem', 'userId').should('be.null');
  });
});
