#!/bin/bash
ssh -i ~/host-key root@139.59.232.82 << EOF > result
  echo 'cc03d5c7759df0740ff85ffc1dd7410081da10ae' | docker login ghcr.io -u midnighttime-cha --password-stdin
  docker stop coj-migrate-api && docker rm coj-migrate-api
  docker run -d -p 3001:3000 --restart=always -v ~/log:/app/_logfile --name coj-migrate-api ghcr.io/dtdevteam/coj-migration-api:latest
EOF
cat result
