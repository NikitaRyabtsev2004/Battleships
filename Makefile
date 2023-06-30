install:
	-g npm @latest
	-f npm 

publish:
	--dry-run
	
run:
	Battleships.js

lint:
	npx eslint