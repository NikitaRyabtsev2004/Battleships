install:
	-f npm 
	-g npm @latest
	
publish:
	--dry-run
	
run:
	index2.js

lint:
	npx eslint