/// <reference types="Cypress" />

Cypress.Commands.add('camposObrigatorioValido', (
    firstName,
    lastName,
    email,
    textArea) => { 
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    
    cy.get('#open-text-area').type(textArea);
    cy.get('.button')
       .click()
       .get('.success')
       .should('be.visible', 'Mensagem enviada com sucesso.') 
    
})
Cypress.Commands.add('camposObrigatorioInvalido', (
    firstName,
    lastName,
    email,
    textArea) => { 
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    
    cy.get('#open-text-area').type(textArea);
    cy.get('.button')
       .click()
       .get("span[class='error']")
       .should('be.visible', 'Valide os campos obrigatórios!') 
    
})
Cypress.Commands.add('campoPhoneNumber', (
    firstName,
    lastName,
    email,
    phoneNumber,
    textArea) => { 
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    cy.get('#phone').type(phoneNumber);
    cy.get('#phone-checkbox').check();

    
    cy.get('#open-text-area').type(textArea);
    cy.get('.button')
       .click()
       .get("span[class='error']")
       .should('be.visible', 'Valide os campos obrigatórios!') 
    
})
Cypress.Commands.add('checkBoxes', (
    firstName,
    lastName,
    email,    
    textArea) => { 
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);

    cy.get('#email-checkbox').check().should('be.checked');    
    cy.get('#phone-checkbox').check().should('be.checked'); 

    cy.get('#phone-checkbox').uncheck().should('not.be.checked');
    
    cy.get('#open-text-area').type(textArea);
    cy.get('.button')
       .click()
       .get('.success')
       .should('be.visible', 'Mensagem enviada com sucesso.') 
    
})
Cypress.Commands.add('selectFiles', (
    firstName,
    lastName,
    email,
    textArea) => { 
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    
    cy.get('#open-text-area').type(textArea);

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
    
    
})


