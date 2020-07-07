npm install

./node_modules/.bin/jest --runInBand --coverage --config ./test/jest-e2e.json

export VERSION=$(cat package.json | grep version | head -1 | awk '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')

sonar-scanner -Dsonar.projectKey=vd-server-api -Dsonar.language=ts -Dsonar.sources=src -Dsonar.exclusions=src/config/**,src/decorator/**,src/transaction/dto/**,src/authorizer/dto/**,src/authorizerPaymentForm/dto/**,src/Branch/dto/**,src/customer/dto/**,src/transactionHistory/dto/**,src/filter/**,src/transactionHistory/transaction-history.entity.ts,src/authorizerPaymentForm/authorizer-payment-form.entity.ts,src/authorizer/authorizer.entity.ts,src/transaction/transaction.entity.ts,src/Branch/branch.entity.ts,src/main.ts,src/app.module.ts,src/logger/**,src/health/**,  -Dsonar.host.url=https://sonarqube.luizalabs.com -Dsonar.login=$SONAR_TOKEN -Dsonar.projectVersion="$VERSION-$CI_COMMIT_SHORT_SHA" -Dsonar.typescript.lcov.reportPaths=$(pwd)/coverage/lcov.info
