package.update:
	@for p in $(project_folders); do \
		cd "$(base_dir)/$$p"; \
		if [ -d "$$p/node_modules" ]; then \
			echo "Installing dependencies in $$p"; \
		else \
			echo "Updating dependencies in $$p"; \
		fi; \
		yarn; \
		echo ""; \
	done;

start: package.update
	docker compose up

migration.generate:
	@if ! [ "$(name)" ]; then \
		echo "No name provided. You must provide a name for the migration."; \
		echo "Example: make migration.generate name=CreateDummyTable"; \
		exit 1; \
	fi
	docker compose run --rm backend npm run migration:generate --name=$(name)
	docker compose down

migration.revert:
	docker compose run --rm backend yarn migration:revert
	docker compose down

migration.run:
	docker compose run --rm backend yarn migration:run
	docker compose down