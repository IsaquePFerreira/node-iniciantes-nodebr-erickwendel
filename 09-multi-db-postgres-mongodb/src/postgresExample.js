// Get sequelize
// npm install sequelize pg pg-hstore

// Import
const Sequilize = require('sequelize')

const driver = new Sequilize(
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

async function main() {
	const Herois = driver.define('herois', {
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
	await Herois.create({
		nome: 'Lanterna Verde',
		poder: 'Anel'
	})

	const result = await Herois.findAll({
		raw: true,
		attributes: ['nome']
	})
	console.log('result', result)
}

main()
