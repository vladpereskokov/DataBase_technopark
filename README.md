## Data Base Technopark

[![Build Status](https://travis-ci.org/vladpereskokov/db_technopark.svg?branch=master)](https://travis-ci.org/vladpereskokov/db_technopark)

## Api

Документацию можно читать как собственно в файле swagger.yml, так и через Swagger UI 
(там же есть возможность поиграться с запросами): [API](https://tech-db-forum.bozaro.ru/)

## Install

```sh
npm install
```

```sh
npm run webpack-prod
```

```sh
npm start
```

## Docker start

 * http
 * 5000 port

Containers start:

```
docker build -t [USERNAME] https://github.com/username/rep.git
docker run -p 5000:5000 --name [CONTAINER_NAME] -t [USERNAME]
```

## Testing

### Functional:

```
./test_program func -u http://localhost:5000/api -r report.html
```

Keys:

Key                                   | Description
---                                   | ---
-h, --help                            | Help is help
-u, --url[=http://localhost:5000/api] | Url of application
-k, --keep                            | Continue after first fail
-t, --tests[=.*]                      | RegExp for tests
-r, --report[=report.html]            | Report filename


### HighLoad:

#### Fill Data

```
./test_program fill --url=http://localhost:5000/api

```

#### Testing

```
./test_program perf --url=http://localhost:5000/api

```

## Development stack

- Nodejs
- Koa2
- Webpack
- PgPromise
