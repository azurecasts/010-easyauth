APPNAME=velzyapp
RG=velzy

web:
	DEBUG=010:* nodemon ./bin/www

sense:
	open https://$(APPNAME).scm.azurewebsites.net

logs:
	az webapp log tail -n $(APPNAME) -g $(RG) --verbose

restart:
	az webapp stop -g $(RG) -n $(APPNAME)
	az webapp start -g $(RG) -n $(APPNAME)

deploy:
	git commit -am "Deployment $(shell date)"
	git push azure master