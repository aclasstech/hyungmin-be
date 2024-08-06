#!/bin/bash

echo "Setup environment"
set -a
. .env
set +a

echo "Running yarn"
yarn

echo "Starting Docker Compose"
docker compose -f docker-compose.yml up -d --build

echo "Starting development server"
yarn start:dev
