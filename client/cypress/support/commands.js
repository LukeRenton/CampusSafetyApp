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

import 'cypress-file-upload';


// Command to login with given user details
Cypress.Commands.add('login', (student_number, password) => {
    cy.visit('/');
    cy.get('input.inputField[placeholder="Student Number"]').type(student_number); 
    cy.get('input.inputField[placeholder="Password"]').type(password);
    cy.get('button').click();
    cy.wait(10000);
  });

// Comamnd to report each type of alert
Cypress.Commands.add('report', (reportTypes) => {
    cy.intercept('POST', '/alerts/alerts').as('postAlerts');
    reportTypes.forEach((type) => {
        cy.get('.navbar-report-button').click();
        cy.wait(500);
        cy.get(`.shown-navbar-button-${type}`).click();
        cy.wait(500);
        cy.get('.report-confirmation-button-yes').click();
        cy.wait('@postAlerts').its('response.statusCode').should('eq', 200);
        cy.wait(5000);
        cy.get('.notification-close').click();
        cy.wait(1000);
        cy.get('.marker-popup-back').click();
        cy.wait(500);
    });

});

// Command to report each type of incident
Cypress.Commands.add('incident', () => {
    cy.get('.navbar-report-button').click();
    cy.get(`.navbar-report-button`).click();
    cy.get('.detailed-report-type-item').each(($el) => {
        cy.wrap($el).find('.report-card-root').click();
        cy.get('.make-detailed-report-button-cancel').click();
    });
    cy.get('.detailed-report-close').click();
    cy.wait(1000);
});

// Command to report a single incident
Cypress.Commands.add('reportSingleIncident', () => {
    const filePath = 'image.png';
    cy.intercept('POST', '/incidents/report-incidents').as('postIncidents');
    cy.get('.navbar-report-button').click();
    cy.wait(250);
    cy.get(`.navbar-report-button`).click();
    cy.get('.detailed-report-type-item').eq(0).click();
    cy.wait(500);
    cy.get('.make-detailed-report-upload-picture-input').attachFile(filePath);
    cy.wait(250);
    cy.get('#report-description-input').type("Test Description");
    cy.wait(250);
    cy.get('.make-detailed-report-button-submit').click();
    cy.wait('@postIncidents').its('response.statusCode').should('eq', 200);
    cy.get('.notification-close').click();
    cy.wait(250);
    cy.get('.marker-popup-content').should('be.visible');
    cy.get('.marker-popup-back').click({force: true});
    cy.wait(250);
});


// Command to check each tab in the navigation bar
Cypress.Commands.add('checkTabs', () => {
    cy.get('.menu-button-root').click();

    cy.get('.side-menu-nav-item.side-menu-notifications .side-menu-item-root').click();
    cy.wait(1000);
    cy.get('.menu-top-nav').click();

    cy.get('.side-menu-nav-item.side-menu-reports .side-menu-item-root').click();
    cy.wait(1000);
    cy.get('.menu-top-nav').click();

    cy.get('.side-menu-nav-item.side-menu-info .side-menu-item-root').click();
    cy.wait(1000);
    cy.get('.menu-top-nav').click();

    cy.get('.side-menu-nav-item.side-menu-first-aid .side-menu-item-root').eq(0).click();
    cy.wait(1000);
    cy.get('.menu-top-nav').click();

    cy.get('.side-menu-nav-item.side-menu-first-aid .side-menu-item-root').eq(1).click();
    cy.wait(1000);
    cy.get('.menu-top-nav').click();
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
    cy.get('.selectres-dropdown').select('Ernest Oppenheimer Hall').should('have.value', 'Ernest Oppenheimer Hall');
    cy.get('.selectres-button').click();
    cy.get('.ride-now-confirmation-content').should('be.visible');
    cy.get('.ride-now-confirmation-content h1').should('have.text', "You're all set!");
})


// Command to logout
Cypress.Commands.add('logout', () => {
    cy.get('.menu-button-root').click();
    cy.get('.side-menu-signout-button').click();
    // cy.get('.inputField').should('be.visible');
})