/*
	docker ps
	docker exec -it id_container mongo server -u seuusuario -p suasenha --authenticationDataBase nome_database
*/

/*
	databases
	show dbs

	muda para contexto para um database
	use herois

	mostra tabelas(coleções)
	show collections

	Create
	db.nome_tabela.inset({
		nome: 'Flash',
		poder: 'Velocidade',
		dataNascimento: '1998-01-01'
	})

	Read
	db.nome_tabela.find()

	Update
	db.herois.update({ _id: ObjectId("667afddf9013c180ba1d6798") }, { nome: 'Mulher maravilha' })
	forma mais segura
		db.herois.update({ _id: ObjectId("667b002c9013c180ba1d67a0") }, { $set: { poder: 'super força' } })
	
	Delete
	db.herois.remove({ _id: ObjectId("667afdad9013c180ba1d6797") })

	query com saída mais bonita
	db.nome_tabela.find().pretty()
	
	código javascript no mongo
	for (i = 0; i <= 100; i++) {
		db.herois.insert({
			nome: `Clone-${i}`,
			poder: 'Velocidade',
			dataNascimento: '1998-01-01'
		})
	}
	
	contar
	db.herois.count()
	mostra um
	db.herois.findOne()
	mostra 50 em ordem decrescente pelo nome
	db.herois.find().limit(50).sort({ nome: -1 })
	mostra coluna específica
	db.herois.find({}, { poder: 1, _id: 0 })
	db.herois.find({ nome: 'Flash' })
*/
