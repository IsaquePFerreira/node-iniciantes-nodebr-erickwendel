const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
	0: 'Disconectado',
	1: 'Conectado',
	2: 'Conectando',
	3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor() {
        super()
		this._herois = null
		this._driver = null
    }

	connect() {
		Mongoose.connect('mongodb://isaquepferreira:naosei@localhost:27017/herois', 
			{ useNewUrlParser: true }).catch(error => {
				if(!error) return;
				console.log('Falha na conexão!', error)
			}) 

		const connection = Mongoose.connection
		connection.once('open', () => console.log('database rodando...'))

		this._driver = connection
		this.defineModel()
	}

	async isConnected() {
		const state = STATUS[this._driver.readyState]

		if(state === 'Conectado') return state
		if(state !== 'Conectando') return state

		await new Promise(resolve => setTimeout(resolve, 1000))

		return STATUS[this._driver.readyState]
	}

	defineModel() {
		const heroiSchema = new Mongoose.Schema({
			nome: {
				type: String,
				required: true
			},
			poder: {
				type: String,
				required: true
			},
			insertAt: {
				type: Date,
				default: new Date()
			}
		})

		this._herois = Mongoose.model('herois', heroiSchema)
	}

	create(item) {
		return this._herois.create(item)
	}
}

module.exports = MongoDB
