
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

    it('Search for 1984 and validate Author and book details', () => {
        cy.get('#searchbar-large').type('1984{Enter}');
        cy.get('.book-title').contains('1984').click();
        cy.get('.nome_autor').first().should('have.text', 'GEORGE ORWELL');
        cy.get('.col-lg-6')
            .should('contain.text', 'ISBN: 9789722071550')
            .should('contain.text', 'Dimensões: 235 x 157 x\n 23 mm')
            .should('contain.text', 'Páginas: 344');
    });

    it('Search for 1984 and Confirm "A Quinta dos Animais" its by the same Author', () => {
        // os livros são de facto do mesmo autor mas 'a quinta dos animais' não está presente no site, portanto fiz o teste na mesma...
        //...de forma a demonstrar que isto seria um bug.
        cy.get('#searchbar-large').type('1984{Enter}');
        cy.get('.book-title').contains('1984').click();
        cy.get('.nome_autor').first().invoke('text').then((author) => {
            cy.get('#searchbar-large').type('A Quinta dos Animais{Enter}');
            cy.get('.book-title').contains('A Quinta dos Animais').click();
            cy.get('.nome_autor').first().should('have.text', author);
        });
    });

    it('When Searching for "1984" When adding to the basket Then basket number increases 1', () => {
        cy.intercept({
            method: 'POST',
            url : '/pt/loja/comprar.php?*',
        }).as ('buy_book');

        cy.get('#searchbar-large').type('1984{Enter}');
        cy.get('.book-title').contains('1984').click();
        cy.get('.choose-op-item > .more').first().click();
        cy.wait('@buy_book');
        cy.get('.header-content').contains('1');
        cy.get('.checkout-btn ').click();
        cy.get('input[value="1"]').should('exist');

    });
});