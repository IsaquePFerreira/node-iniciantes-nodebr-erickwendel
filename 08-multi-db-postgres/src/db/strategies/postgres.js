const ICrud = require('./interfaces/interfaceCrud')
const Sequilize = require('sequelize')


class Postgres extends ICrud {
    constructor() {
        super()
		this._driver = null
		this._herois = null
		this._connect()
    }

	async isConnected() {
		try {
			await this._driver.authenticate()
			return true
			
		} 
		catch(error) {
			console.log('Fail!', error)	
			return false
		}
	}

    create(item) {
        console.log('O item foi salvo no postgres')
    }

	async defineModel() {
		this._herois = driver.define('herois', {
			id: {
				type: Sequilize.INTEGER,
				required: true,
				primaryKey: true,
				autoIncrement: true
			},

			nome: {
				type: Sequilize.STRING,
				required: true
			},

			poder: {
				type: Sequilize.STRING,
				required: true
			}
		},
			{
				tableName: 'TB_HEROIS',
				freezeTableName: false,
				timestamps: false
			})
		await Herois.sync()
	}

	_connect() {
		this._driver = new Sequilize(
			'heroes',
			'isaquepferreira',
			'naosei',
			{
				host: 'localhost',
				dialect: 'postgres',
				quoteIdentifiers: false,
				operatorAliases: false
			}
		)
	}
}

module.exports = Postgres
