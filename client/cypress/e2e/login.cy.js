describe('Login Test', () => {
    it('should login with valid credentials', () => {
        cy.login('2540440', '123');
        cy.url().should('include', '/main');
    });
});

