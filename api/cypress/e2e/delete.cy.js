import { Types } from 'mongoose'

describe('DELETE/agendamentos/:id', () => {

    beforeEach(() => {
        // Aqui precisamos de autenticação como funcionario para realizar o cancelamento    
        cy.login('1004', 'pwd123')
    });
    context('Quando tenho um agendamento', () => {
        const agendamento = {
            nomeCliente: 'Daphne Blake',
            emailCliente: 'daphne@gmail.com',
            data: '10/01/2025',
            hora: '10:00',
            matricula: '1004',
            codigoServico: 4
        }

        let agendamentoId

        before(() => {

            cy.deleteMany(
                { matricula: agendamento.matricula },
                { collection: 'agendamentos' }
            ).then((result) => {
                cy.log(result)
            })
            // Aqui quem faz o agendamento é o cliente
            cy.postAgendamento(agendamento)
                .should((response) => {
                    expect(response.status).to.eql(201)
                    agendamentoId = response.body.agendamentoId
                })

        })

        it('Deve poder remover pelo id', () => {

            cy.deleteAgendamento(agendamentoId).should((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Agendamento cancelado com sucesso')
            })

        });
    });
    it('Deve retornar 404 quando o agendamento não existir', () => {
        cy.deleteAgendamento(new Types.ObjectId()).should((response) => {
            expect(response.status).to.eq(404)
            expect(response.body.error).to.eq('Agendamento não encontrado')
        })
    });
});

