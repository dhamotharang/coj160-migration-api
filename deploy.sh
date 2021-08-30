#!/bin/bash
ssh -i ~/host-key root@139.59.232.82 << EOF > result
  echo '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' | docker login ghcr.io -u midnighttime-cha --password-stdin
  docker pull ghcr.io/dtdevteam/coj-migration-api:latest
  docker stop coj-migrate-api && docker rm coj-migrate-api
  docker run -d -p 3001:3001 --restart=always -v ~/log:/app/_logfile --name coj-migrate-api ghcr.io/dtdevteam/coj-migration-api:latest
  docker system prune -f
EOF
cat result