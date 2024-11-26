describe('Login Test', () => {
    it('should successfully log in with valid credentials', () => {
      // Abre la URL del frontend
      cy.visit('/'); // Cambia '/' por la ruta de tu página de inicio
  
      // Rellena los campos del formulario de inicio de sesión
      cy.get('input[name="username"]').type('user'); // Cambia 'username' por el atributo name real
      cy.get('input[name="password"]').type('user'); // Cambia 'password' por el atributo name real
  
      // Haz clic en el botón de login
      cy.get('button[type="submit"]').click();
  
      // Verifica que el usuario sea redirigido al dashboard o página principal
      cy.url().should('include', '/home'); // Cambia '/home' según tu aplicación
  
      
      
    });
  
    it('should display an error message for invalid credentials', () => {
      cy.visit('/');
  
      cy.get('input[name="username"]').type('wronguser');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      // Verifica que se muestra un mensaje de error
      cy.contains('Nombre de usuario o contraseña incorrectos.').should('be.visible');
    });
  });
  