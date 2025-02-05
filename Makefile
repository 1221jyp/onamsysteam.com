build:
	cd client && npm run build

dev:
	docker compose up
up:
	docker tag onamsysteamcom-server 1221jyp/onamsysteam:latest && docker push 1221jyp/onamsysteam:latest