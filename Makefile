
all: build test

build:
	./node_modules/.bin/traceur --modules commonjs --dir lib/ es5/lib/ 
	./node_modules/.bin/traceur --modules commonjs --dir test/ es5/test/

test: build
	@NODE_ENV=test ./node_modules/.bin/mocha es5/test;

.PHONY: test
