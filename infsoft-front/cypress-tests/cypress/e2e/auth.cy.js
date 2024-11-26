// cypress/e2e/auth.cy.js

describe('Authentication Tests', () => {
  it('Login with valid credentials', () => {
    cy.visit('/');
    cy.get('label.login').click(); // Cambia a la pestaña de login
    cy.get('form.login input[placeholder="Username"]').type('user');
    cy.get('form.login input[placeholder="Password"]').type('user');
    cy.get('form.login input[type="submit"]').click();
    cy.url().should('include', '/home'); // Verifica la redirección a /home
  });

  it('Login with invalid credentials', () => {
    cy.visit('/');
    cy.get('label.login').click();
    cy.get('form.login input[placeholder="Username"]').type('invalidUsername');
    cy.get('form.login input[placeholder="Password"]').type('invalidPassword');
    cy.get('form.login input[type="submit"]').click();
    cy.get('.error-message').should('contain', 'Nombre de usuario o contraseña incorrectos.');
  });

  //Si ya he ejecutado el test, recordas que el usuario ya existe. Por lo que el test no pasará. EL usuario
  // debe ser eliminado con el admin (http://localhost:8080/api/admin/users/newuser)

  it('Register successfully', () => {
    cy.visit('/');
    cy.get('label.signup').click(); // Cambia a la pestaña de registro
    cy.get('form.signup input[placeholder="Username"]').type('newUser');
    cy.get('form.signup input[placeholder="Email Address"]').type('newuser@example.com');
    cy.get('form.signup input[placeholder="Password"]').type('password123');
    cy.get('form.signup input[placeholder="Confirm password"]').type('password123');
    cy.get('form.signup input[type="submit"]').click();
    // Verifica que no haya mensajes de error y que se muestre el formulario de login
    cy.get('form.login').should('be.visible');
     
  });

    it('Both Password fields must match', () => {
    cy.visit('/');
    cy.get('label.signup').click(); // Cambia a la pestaña de registro
    cy.get('form.signup input[placeholder="Username"]').type('newUser123');
    cy.get('form.signup input[placeholder="Email Address"]').type('newUser123@example.com');
    cy.get('form.signup input[placeholder="Password"]').type('password123');
    cy.get('form.signup input[placeholder="Confirm password"]').type('password1234');
    cy.get('form.signup input[type="submit"]').click();
    cy.get('.error-message').should('contain', 'Las contraseñas no coinciden.');
    });




  it('Register user already exists', () => {
    cy.visit('/');
    cy.get('label.signup').click(); // Cambia a la pestaña de registro
    cy.get('form.signup input[placeholder="Username"]').type('newUser');
    cy.get('form.signup input[placeholder="Email Address"]').type('newuser@example.com');
    cy.get('form.signup input[placeholder="Password"]').type('password123');
    cy.get('form.signup input[placeholder="Confirm password"]').type('password123');
    cy.get('form.signup input[type="submit"]').click();
    // Verifica que no haya mensajes de error
    cy.get('.error-message').should('contain', 'El usuario ya existe.');      
  });

  it('Mail already exists', () => {
    cy.visit('/');
    cy.get('label.signup').click(); // Cambia a la pestaña de registro
    cy.get('form.signup input[placeholder="Username"]').type('newUser123');
    cy.get('form.signup input[placeholder="Email Address"]').type('newUser@example.com');
    cy.get('form.signup input[placeholder="Password"]').type('password123');
    cy.get('form.signup input[placeholder="Confirm password"]').type('password123');
    cy.get('form.signup input[type="submit"]').click();
    cy.get('.error-message').should('contain', 'El correo electrónico ya está en uso.'); 
  });


});