// All our commands are found in the commands.js file. We can now use these commands in our tests.

describe('Full User Journey', () => {
    it('should allow a user to log in and interact with various features', () => {
        // **Login Test**
        cy.login('2540440', '123');
    
        // **Test Each Report**
        // We can update the test case by just adding the different report types to the array
        const reportTypes = ['medical', 'fire', 'natural', 'security', 'weather'];
        cy.report(reportTypes);

        
         
      });
});