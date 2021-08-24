```bash
docker build -t ghcr.io/dtdevteam/coj-migration-api:latest .

echo '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' | docker login ghcr.io -u midnighttime-cha --password-stdin

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

## Webhook
`https://kaikannook:116ce83533287a05f91d9f8156b6fcffcb@jenkins.kaikannook.com/job/COJ-Migration/job/migrate-api/build?token=Lmdja028ajsdlSdKmdfmdsf92`




