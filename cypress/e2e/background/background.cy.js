
context('Background', () => {

    beforeEach (() => {
        cy.visit('https://www.leyaonline.com/pt/');
        cy.get('#cookiescript_reject').click();
    });
    
    it('Check if Background Dark Mode works properly', () => {
        cy.get('body').should('have.css', 'background-color').and('match', /rgb\(255, 255, 255\)/);
        cy.get('#darkmode').click();
        cy.get('body').should('have.css', 'background-color').and('match', /rgb\(30, 31, 30\)/);
        cy.get('#darkmode').click();
        cy.get('body').should('have.css', 'background-color').and('match', /rgb\(255, 255, 255\)/);
    });
});