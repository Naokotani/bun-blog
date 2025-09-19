all: build

build:
	@echo "minifying CSS..."
	./scripts/min.sh
	@echo "building image and running container..."
	docker compose up --build -d
