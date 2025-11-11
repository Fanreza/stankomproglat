#!/bin/bash
APP=stankom-web
PORT=5173

docker build -t $APP .
docker stop $APP 2>/dev/null || true
docker rm $APP 2>/dev/null || true
docker run -d \
  --name $APP \
  --env-file .env \
  -p $PORT:$PORT \
  --restart always \
  $APP

echo "✅ Deployed: http://localhost:$PORT"
