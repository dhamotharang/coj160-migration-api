```bash
docker build -t ghcr.io/dtdevteam/coj-migration-api:latest .

echo 'cc03d5c7759df0740ff85ffc1dd7410081da10ae' | docker login ghcr.io -u midnighttime-cha --password-stdin

docker push ghcr.io/dtdevteam/coj-migration-api:latest

docker stop coj-migrate-api
docker rm coj-migrate-api

docker run -d \
-p 3001:3000 \
--restart=always \
-v ~/log:/app/_logfile \
--name coj-migrate-api \
ghcr.io/dtdevteam/coj-migration-api:latest
```