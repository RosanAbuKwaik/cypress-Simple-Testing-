describe('DuckDuckGo Search Test', () => {

  it('should search for a term', () => {

    cy.visit('https://duckduckgo.com')

    cy.get('#searchbox_input')
      .should('be.visible')
      .type('Cypress testing{enter}')

    cy.url().should('include', 'Cypress+testing')

  })

})
