import {checkUrl, openPage} from "../support/utilities";

class Login {

    inputEmail = () => cy.get('#email');
    inputPassword = () => cy.get('#password');
    buttonLogin = () => cy.contains('button', 'Přihlaste se');

    login(username, password) {
        openPage(Cypress.env("baseUrl"));
        this.inputEmail().type(username);
        this.inputPassword().type(password);
        this.buttonLogin().click();
    }
}

class Dashboard {
    navitemDashboard = () => cy.contains('a', 'Dashboard');
    navitemPortfolio = () => cy.contains('button', 'Portfolia');
    navitemContatcs = () => cy.contains('a', 'Adresář');
}

class Contacts {
    buttonNewContact = () => cy.contains('button', 'Vytvořit nový kontakt');
    headerNewContact = () => cy.contains('h2', 'Vytvořit nový kontakt');
    inputLastName = () => cy.get('#lastName');
    inputFirstName = () => cy.get('#firstName');
    inputEmail = () => cy.get('#email');
    inputPhone = () => cy.get('#phone');
    buttonSave = () => cy.contains('button', 'Uložit');
    contact = (name) => cy.contains(name);

}

const login = new Login();
const dashboard = new Dashboard();
const contacts = new Contacts();
const user = Cypress.env('testUser')

describe('Smoke tests', () => {
    beforeEach(() => {
        login.login(user.username, user.password);
    })

    it('User log in successfully', () => {
        checkUrl('/dashboard')
        dashboard.navitemContatcs().should('exist').and('be.visible');
        dashboard.navitemPortfolio().should('exist').and('be.visible');
        dashboard.navitemDashboard().should('exist').and('be.visible');
    });

    it('Logged in user can create new contact', () => {
        dashboard.navitemContatcs().click();
        contacts.buttonNewContact().click();
        contacts.headerNewContact().should('exist').and('be.visible');
        contacts.inputLastName().type('Doe');
        contacts.inputFirstName().type('John');
        contacts.inputEmail().type('hello@world.com');
        contacts.inputPhone().type('+420732123456');
        contacts.buttonSave().click();
        checkUrl('/contact');
        contacts.contact('John Doe').should('exist').and('be.visible');
    });
})