describe('Fire reporting test', () => {
    it('After login in, we can report a fire at the current location', () => {
        cy.login('2540440', '123');
        cy.url().should('include', '/main');
        cy.get('.navbar-report-button').click();
        cy.get('.shown-navbar-button-fire').click();
        cy.get('.report-confirmation-button-yes').click();
    });
});