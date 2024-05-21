/// <reference types="Cypress" />

import faker from "faker";

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html');
    });
    it('verifica o título da aplicação', () => {        

        cy.title().should('eq','Central de Atendimento ao Cliente TAT');
  
    })
    it('Preencher os campos obrigatórios e enviar formulário', () => {   
        
        const campos = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            textArea: faker.random.words(5)
        }

        cy.camposObrigatorioValido(campos.firstName, campos.lastName, campos.email, campos.textArea); 
  });
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {   
        
        const campos = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: 'inavalido@lkj',
            textArea: faker.random.words(5)
        }

        cy.camposObrigatorioInvalido(campos.firstName, campos.lastName, campos.email, campos.textArea); 
  });
  
    it('Validação do campo de telefone que apenas deve aceitar números', () => {   
        
        const campos = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            phoneNumber: "tester",
            textArea: faker.random.words(5)
        }

        cy.campoPhoneNumber(campos.firstName, campos.lastName, campos.email, campos.phoneNumber, campos.textArea); 
  });
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {   
        
        const campos = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            phoneNumber: " ",
            textArea: faker.random.words(5)
        }

        cy.campoPhoneNumber(campos.firstName, campos.lastName, campos.email, campos.phoneNumber, campos.textArea); 
  });
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {   
        
        cy.get('.button')
       .click()
       .get("span[class='error']")
       .should('be.visible', 'Valide os campos obrigatórios!')  
  });
    it('Marca ambos checkboxes, depois desmarca o último', () => {   
        const campos = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),            
            textArea: faker.random.words(5)
        }

      cy.checkBoxes(campos.firstName, campos.lastName, campos.email, campos.textArea) 
  });
    it('Seleciona arquivos pa pasta fixture', () => {   
        const campos = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),            
            textArea: faker.random.words(5)
        }

      cy.selectFiles(campos.firstName, campos.lastName, campos.email, campos.textArea) 
  });
  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile');
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click();

    cy.get('#title').should('contain', 'CAC TAT - Política de privacidade')  

  })
  it('Testar página da política de privacidade de forma independente', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click();

    cy.get('#title').should('contain', 'CAC TAT - Política de privacidade')  

    cy.get('#white-background').should('have.css', 'background-color', 'rgb(255, 255, 254)')

  })


  
});