APPNAME=velzyapp
RG=velzy
PLAN=velzyplan
LOCATION=westus2
SKU=S1

DEPLOY_USER=$(APPNAME)_deploy
DEPLOY_PASSWORD=a-phrase-youll-remember-thats-url-safe

#Note: MUST BE UPPERCASE
RUNTIME=NODE|10.14
GIT_DEPLOY_URL="https://$(DEPLOY_USER):$(DEPLOY_PASSWORD)@$(APPNAME).scm.azurewebsites.net/$(APPNAME).git"

all: logs

rg:
	az group create -n $(RG) -l $(LOCATION)

plan: rg
	az appservice plan create -g $(RG) \
														-n $(PLAN) \
														--sku $(SKU) \
														--is-linux
webapp: plan
	az webapp create -n $(APPNAME) \
										-g $(RG) \
										-p $(PLAN) \
										--runtime "$(RUNTIME)" \
        						--deployment-local-git
logging: webapp
	az webapp log config --application-logging true \
								--web-server-logging filesystem \
								--level information \
								--name $(APPNAME) \
								--resource-group $(RG)

set_deployment:logging
	az webapp deployment user set --user-name $(DEPLOY_USER) --password $(DEPLOY_PASSWORD)
	git remote add azure $(GIT_DEPLOY_URL)

deploy: set_deployment
	git push azure master

open: deploy
	open https://$(APPNAME).azurewebsites.net

logs: open
	az webapp log tail -n $(APPNAME) -g $(RG)

rollback:
	az group delete -n $(RG) -y

.PHONY: logs rollback open webapp rg plan all