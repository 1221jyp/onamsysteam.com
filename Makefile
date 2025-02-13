build:
	cd client && npm run build

start:
	cd client && npm start

dev:
	docker compose up
up:
	docker tag onamsysteamcom-server 1221jyp/onamsysteam:latest && docker push 1221jyp/onamsysteam:latest