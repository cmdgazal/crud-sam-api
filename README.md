# crud-sam-api

A simple crud application using aws lamda


## Requirements

* SAM CLI
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)

## Setup process

### Installing dependencies

In this example we use `npm` but you can use `yarn` if you prefer to manage NodeJS dependencies:

```bash
cd crud-sam-api
npm install
```

### Local development

**Invoking function locally through local API Gateway**

```bash
sam local start-api
```
