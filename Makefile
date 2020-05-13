up:
	docker-compose up -d

migrate:
	npx sequelize db:migrate

down:
	docker-compose down

logs:
	docker-compose logs -f

deploy:
	git push heroku master

undo:
	npx sequelize db:migrate:undo:all

seed:
	npx sequelize db:seed:all