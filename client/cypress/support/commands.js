// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (student_number, password) => {
    cy.visit('/');
    cy.get('input.inputField[placeholder="Student Number"]').type(student_number); 
    cy.get('input.inputField[placeholder="Password"]').type(password);
    cy.get('button').click();
  });

Cypress.Commands.add('report', (reportTypes) => {
    cy.intercept('POST', '/alerts/alerts').as('postAlerts');
    reportTypes.forEach((type) => {
        cy.get('.navbar-report-button').click();
        cy.get(`.shown-navbar-button-${type}`).click();
        cy.get('.report-confirmation-button-yes').click();
        cy.wait('@postAlerts').its('response.statusCode').should('eq', 200);
    });

});