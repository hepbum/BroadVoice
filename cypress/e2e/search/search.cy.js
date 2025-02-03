
context('Search Leya', () => {

beforeEach (() => {
    cy.visit('https://www.leyaonline.com/pt/');
    cy.get('#cookiescript_reject').click();
});

it ('Search for George and confirm results are expected', () => {
    cy.get('#searchbar-large').type('George{Enter}');
    cy.get('.container').contains('O Triunfo dos Porcos').click();
    cy.get('.sinopse').should('contain.text', 'Quinta Manor');
});

it.only('Search for 1984 and validate Author and book details', () => {
    cy.get('#searchbar-large').type('1984{Enter}');
    cy.get('.book-title').contains('1984').click();
    cy.get('.nome_autor').first().should('have.text', 'GEORGE ORWELL');
    cy.get('.col-lg-6')
        .should('contain.text', 'ISBN: 9789722071550')
        .should('contain.text', 'Dimensões: 235 x 157 x\n 23 mm')
        .should('contain.text', 'Páginas: 344');

});

});