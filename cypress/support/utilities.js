export function openPage(url) {
    cy.visit(url);
}

export function checkUrl(subUrl = null) {
    subUrl ? cy.url().should('contain', subUrl) : {}
}