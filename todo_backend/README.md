## Script to run the docker container

``docker run --name my-postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -p 5433:5432 \
  -v my-postgres-data:/var/lib/postgresql/data \
  --restart=always \
  -d postgres:16
``
