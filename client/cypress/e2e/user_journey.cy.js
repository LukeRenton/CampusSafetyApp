//Code below is from here: https://stackoverflow.com/a/65897739 --no clue how it fixed it after all the other attemps but nice

export const setFakePosition = position => {
  console.debug(`cypress::setGeolocationOverride with position ${JSON.stringify(position)}`);
  cy.log("**setGeolocationOverride**").then(() =>
      Cypress.automation("remote:debugger:protocol", {
          command: "Emulation.setGeolocationOverride",
          params: {
              latitude: position.latitude,
              longitude: position.longitude,
              accuracy: 50
          }
      })
  );
};


describe('Full User Journey with Geolocation Override', () => {
  it('should allow a user to log in and interact with various features', () => {
      // Set fake geolocation before visiting the site
      setFakePosition({ latitude: -26.191, longitude: 28.0302 });

      // ** Test Login **
      cy.visit('/');
      cy.login('2540440', '123'); 

      // **Test Each Report**
      const reportTypes = ['medical', 'fire', 'natural', 'security', 'weather'];
      cy.report(reportTypes);

      // **Test Each Incident**
      cy.incident();

      // **Actually send alert**
      cy.reportSingleIncident();

      // **Test tabs in nav**
      cy.checkTabs();
      cy.get('.main-dark-back').click();

      // **Test Walk Home Assist**
      cy.walkHomeAssist();
      cy.wait(5000);
      cy.get('.main-dark-back').click();
      cy.walkHomeAssistSchedule();
      cy.wait(5000);
      cy.get('.main-dark-back').click();

      // **Test logout**
      cy.logout();
  });
});
