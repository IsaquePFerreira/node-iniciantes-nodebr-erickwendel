const assert = require('assert')
const MongoDB = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
	nome: 'Mulher Maravilha',
	poder: 'Laço da verdade'
}

const context = new Context(new MongoDB())
describe('MongoDB suíte de teste', function() {
	this.beforeAll(async () => {
		await context.connect()
	})

	it('verificar conexão', async () => {
		const result = await context.isConnected()
		const expected =  'Conectado'

		assert.deepEqual(result, expected)
	})
	
	it('cadastrar', async () => {
		const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
		assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
	})
})

