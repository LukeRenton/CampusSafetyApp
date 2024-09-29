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


// Command to login with given user details
Cypress.Commands.add('login', (student_number, password) => {
    cy.visit('/');
    cy.get('input.inputField[placeholder="Student Number"]').type(student_number); 
    cy.get('input.inputField[placeholder="Password"]').type(password);
    cy.get('button').click();
  });

// Comamnd to report each type of alert
Cypress.Commands.add('report', (reportTypes) => {
    cy.intercept('POST', '/alerts/alerts').as('postAlerts');
    reportTypes.forEach((type) => {
        cy.get('.navbar-report-button').click();
        cy.get(`.shown-navbar-button-${type}`).click();
        cy.get('.report-confirmation-button-yes').click();
        cy.wait('@postAlerts').its('response.statusCode').should('eq', 200);
    });

});

// Command to report each type of incident
Cypress.Commands.add('incident', () => {
    // cy.intercept('POST', '/incidents/report-incidents').as('postIncidents');
    cy.get('.navbar-report-button').click();
    cy.get(`.navbar-report-button`).click();
    cy.get('.detailed-report-type-item').each(($el) => {
        cy.wrap($el).find('.report-card-root').click();
        cy.get('.make-detailed-report-button-cancel').click();
    });
    cy.get('.detailed-report-close').click();
    // cy.wait('@postIncidents').its('response.statusCode').should('eq', 200);
});


// Command to go to walk home assistance page
Cypress.Commands.add('goToWalkHomeAssist', () => {
    cy.get('.menu-button-root').click();
    cy.get('.side-menu-walk-home > .side-menu-item-root').click();
});

// Command to use walk home assistance "now" feature
Cypress.Commands.add('walkHomeAssist', () => {
    cy.goToWalkHomeAssist();
    cy.contains('button', 'Ride Now').click();
    cy.get('.ride-now-confirmation-content').should('be.visible');
    cy.get('.ride-now-confirmation-content h1').should('have.text', "You're all set!");  
    cy.get('.ride-now-confirmation-content p').should('have.text', 'Make your way to the nearest campus security office.');
})


// Command to use walk home assistance "schedule" feature
Cypress.Commands.add('walkHomeAssistSchedule', () => {
    cy.goToWalkHomeAssist();
    cy.contains('button', 'Schedule').click();
    cy.get('.time-picker').clear().type('12:00').should('have.value', '12:00');
    cy.get('.scheduleride-button').click();
    cy.get('.selectres-dropdown').select('Ernest Oppenheimer Hall').should('have.value', 'residence2');
    cy.get('.selectres-button').click();
    cy.get('.ride-now-confirmation-content').should('be.visible');
    cy.get('.ride-now-confirmation-content h1').should('have.text', "You're all set!");
})


// Command to logout
Cypress.Commands.add('logout', () => {
    cy.get('.menu-button-root').click();
    cy.get('.side-menu-logout-signout-button').click();
    // cy.get('.inputField').should('be.visible');
})