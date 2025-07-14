build:
	cd client && npm run build

start:
	cd client && npm start

dev:
	docker compose up
up:
	docker tag onamsysteamcom-server onamsysteam/onamsysteam:latest && docker push onamsysteam/onamsysteam:latest