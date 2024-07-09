const ICrud = require('./interfaces/interfaceCrud')
const Sequilize = require('sequelize')


class Postgres extends ICrud {
    constructor() {
        super()
		this._driver = null
		this._herois = null
    }

    async create(item) {
		const {
		dataValues
		} = await this._herois.create(item)

		return dataValues
    }

	async read(item = {}) {
		return this._herois.findAll({ where: item,  raw: true })
	}

	async update(id, item) {
		console.log('id', id)
		return this._herois.update(item, { where: { id : id }})
	}

	async delete(id) {
		const query = id ? { id } : {}	
		return this._herois.destroy({ where: query })
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


	async defineModel() {
		this._herois = this._driver.define('herois', {
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
		await this._herois.sync()
	}

	/*_connect() {
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
		this.defineModel()
	}*/
		async connect() {
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
			await this.defineModel()
		}
}

module.exports = Postgres
