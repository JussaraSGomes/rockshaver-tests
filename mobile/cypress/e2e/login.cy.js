describe('Login', () => {

  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('/')

    cy.contains('p', 'Faça login com a sua conta')
      .should('be.visible')
  })

  it('Deve logar como barbeiro', () => {

    const funcionario = {
      matricula: '1007',
      senha: 'pwd123',
      nome: 'Slash'
    }

    cy.login(funcionario)
    cy.verificarUsuarioLogado(funcionario)
  })

  it('Não deve logar quando a senha é inválida', () => {

    const funcionario = {
      matricula: '1006',
      senha: 'abc123',
      nome: 'Jimi'
    }

    cy.login(funcionario)

    // Trecho utilizado para capturar uma informação que é apresentada em um pop-up no modible de forma rápida.
    // Aqui a captura da informação é salvo em um documento temp durante a execução do teste de automação.
    //cy.wait(1000)

    //cy.document().then((doc) => {
    //  const codigoHtml = doc.documentElement.outerHTML
    //  cy.writeFile('temp.html', codigoHtml)
    //})

    cy.verificarToast('Falha ao realizar login. Verifique suas credenciais.')
  })

  it('Não deve logar quando a matricula não existe', () => {

    const funcionario = {
      matricula: '1010',
      senha: 'pwd123',
    }

    cy.login(funcionario)

    cy.verificarToast('Falha ao realizar login. Verifique suas credenciais.')

  })

  it('Não deve logar os campos que não são preenchidos', () => {

    cy.get('form').submit()

    cy.verificarToast('Informe sua matrícula e sua senha!')

  })
})



