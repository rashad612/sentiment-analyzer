# Sentiment Analyzer

## Description

This is an API application that analyzes the sentiment of a given text. It uses 
Google Cloud Natural Language API internally and is built on the 
[Nest](https://github.com/nestjs/nest) framework.


## Setup and running

### Prerequisites

  * node 22.12.0+
  * PostgreSQL
  * Docker (optional).
  * Make sure you machine is authenticated to Google Cloud Platform, or you
    have the Service Account key auth JSON file for your GCP project.
    https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/keys/create

### Preparing `.env` File

Copy the environment file template as `.env` file.

```bash
$ cp .env.example .env
```

Modify the environment variables in the `.env` file, for example:

```bash
PORT=9090
DATABASE_HOST=0.0.0.0
DATABASE_PORT=5432
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=analysis
DATABASE_SYNC=true
GCP_AUTH_FILE='./vendor/auth.json'
```

`DATABASE_*` variables are connection parameters from PostgreSQL server. If you
are using Docker Compose, these parameters will be created in the database 
container.

If you are using Docker Compose, the variable `PORT` will work only with the 
following values: `9090` or `3000`.

`GCP_AUTH_FILE=` will point to the Service Account key file. This variable can 
be omitted if Docker or your local machine is already authenticated to GCP.

### Running using Docker Compose

Service definition is located in the `docker-compose.yml` file.
After preparing the env file, make sure you have the variable `DATABASE_HOST`
as follows:

```bash
...
DATABASE_HOST=postgres
...
```

Then simply run:

```bash
$ docker compose up -d
```

### Running locally

Make sure you have the env file updated and database connection parameters are
set.

Install dependencies:

```bash
$ npm install
```

Compile and run the project:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running tests


Unit tests:

```bash
# unit tests
$ npm run test
```

End-to-End tests:

It's best to prepare a test database for e2e tests using 
[our init file](test/db/init.sql). We recommend using Docker for simplicity,
make sure `.env` file and `-e` parameters match:

```bash
# This will create a test DB connnection and initialize DB from `init.sql`
docker run -d \
-e POSTGRES_USER=root \
-e POSTGRES_PASSWORD=root \
-e POSTGRES_DB=sents \
-v $(pwd)/test/db:/docker-entrypoint-initdb.d \
-p 5432:5432 postgres
```

Then run:

```bash
# e2e tests
$ npm run test:e2e
```

## Using the API

Upon a successful run, you should get the following output when requesting the 
service base URL:

```
API is up and running!
```

API documentation can be viewed using a browser at:

```
[base-url]/api-docs
```

First, you need to create a user. For example, creating a user named: `test-user`.

```
POST [base-url]/user/create
Body:
{"username": "test-user"}
```

Analyze a text sentiment and save it to a specific user. For example, analyze the
sentiment of the text: `I'm happy` for user: `test-user`:

```
POST [base-url]/sentiment/analyze
Body:
{
	"username": "test-user",
	"text": "I'm happy"
}
```

If user already exists, you should get an output similar to this one:

```json
{
	"text": "I'm happy",
	"score": 0.8999999761581421,
	"magnitude": 0.8999999761581421
}
```

Where `text` is the originally sent one. `score` and `magnitude` are the 
calculated metrics returned from Google Natural Language APIs.

To view the history of user's analyzed texts:
For example, showing a list of `test-user` sentiment text past analysis:

```
GET [base-url]/user/test-user/sentiments
```

Will give something like this, or an empty array if user has no history:

```json
[
	{
		"text": "I'm happy",
		"score": "0.8999999761581421",
		"magnitude": "0.8999999761581421"
	},
	{
		"text": "I'm sad",
		"score": "-0.8999999761581421",
		"magnitude": "0.8999999761581421"
	}
]
```


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
