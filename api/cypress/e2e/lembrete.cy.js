import { Types } from 'mongoose'

describe('POST /agendamentos/:id/lembrete', () => {

    beforeEach(() => {
        // Aqui precisamos de autenticação como funcionario para realizar o cancelamento    
        cy.login('1005', 'pwd123')
    });
    context('Quando tenho um agendamento', () => {
        const agendamento = {
            nomeCliente: 'Miguel Dias',
            emailCliente: 'dias@gmail.com',
            data: '10/01/2025',
            hora: '10:00',
            matricula: '1005',
            codigoServico: 2
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

        it('Deve poder enviar um lembrete por email', () => {

            cy.postLembrete(agendamentoId).should((response)=> {
                expect(response.status).to.eql(200)
                expect(response.body.message).to.eql('Lembrete enviado com sucesso')
            })

            cy.findOne(
                {agendamentoId: new Types.ObjectId(agendamentoId)},
                {collection: 'lembretes'}
            ).then((result)=>{
                expect(result.conteudoHtml).to.include(agendamento.nomeCliente)
            })

        });
    });
    it('Deve retornar 404 quando o agendamento não existe', () => {
        cy.postLembrete(new Types.ObjectId()).should((response) => {
            expect(response.status).to.eq(404)
       })
    });
});

