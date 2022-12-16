export class LoginPage {
    constructor() {
        this.usernameInput = '#user'
        this.passwordInput = '#pass'
        this.loginButton = '#submitForm'
    }

    escribirUsuario(usuario) {
        cy.get(this.usernameInput).type(usuario);
    };
    escribirContraseña(contraseña) {
        cy.get(this.passwordInput).type(contraseña);
    };
    clickLoginButton() {
        cy.get(this.loginButton).click();
    };

};