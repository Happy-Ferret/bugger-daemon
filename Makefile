default: all

MOCHA  = node_modules/.bin/mocha --recursive -u tdd
WACHS  = node_modules/.bin/wachs
GROC   = node_modules/.bin/groc

watch:
	$(WACHS) -o "**/*.js" node bin/bugger-daemon.js

.PHONY : test test-unit test-integration
test: test-unit test-integration
test-unit:
	NODE_ENV=test ${MOCHA} -R spec --recursive test/unit
test-integration:
	NODE_ENV=test ${MOCHA} -R spec --recursive test/integration

.PHONY: release release-patch release-minor release-major

release:
	git push --tags origin HEAD:master
	npm publish
