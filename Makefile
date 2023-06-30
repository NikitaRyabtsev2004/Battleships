install:
	-g npm @latest
	-f npm 

publish:
	--dry-run
	
run:
	index2.js

lint:
	npx eslint