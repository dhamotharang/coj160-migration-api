# 1 แก้ไขไฟล์ .env
```bash
# .env file
...
API_HOST=http://localhost:3001 # URL API local
API_HOST_PUBLIC=https://coj-api.idevcool.com # URL API Prodcution
API_PORT=3001 # Port ของ API
API_EMAIL=chawalit1987@gmail.com # Email ของ Develper

ORA_HOST=174.138.21.165 # Oracle host
ORA_PORT=1521 # Oracle post
ORA_USERNAME=COJ_DBA # Oracle username
ORA_PASSWORD=CojDBA2019 # Oracle password
ORA_SID=cdb1 # Oracle SID

MYSQL_HOST=119.59.126.193 # MySQL host
MYSQL_PORT=36000 # MySQL port
MYSQL_USERNAME=root # MySQL username
MYSQL_PASSWORD=CojDBA2019 # MySQL password
MYSQL_DATABASE=lbcmic # MySQL database name

PG_HOST='178.128.21.17' # PosgreSQL host
PG_PORT=5432 # PosgreSQL port
PG_USERNAME=coj # PosgreSQL username
PG_PASSWORD=tawvo7p390obcot2 # PosgreSQL password
PG_DATABASE=coj # PosgreSQL database
PG_SCHEMA=app # PosgreSQL schema
```


# 2. ขั้นตอนการรัน  Application บน Local

## สิ่งที่ต้องติดตั้ง
1. nodejs && NPM
2. yarn

## เริ่มต้นพิมพ์คำสั่งต่อไปนี้
```bash
yarn add global @nestjs/cli
yarn install
yarn start:dev
```


# 3. ขั้นตอนการรัน  Application บน Docker

## สิ่งที่ต้องติดตั้ง
1. nodejs && NPM
2. yarn
3. Docker

## เริ่มต้นพิมพ์คำสั่งต่อไปนี้
```bash
yarn install
yarn build
docker build -t coj-migrate-api:latest . # ทำการ Build image ของ  Docker
docker stop coj-migrate-api && docker rm coj-migrate-api # ทำการหยุดการทำงาน และลบ container ทิ้ง กรณีเคยรัน Docker เดิม
docker run -d -p 3001:3001 --restart=always -v ~/log:/app/_logfile --name coj-migrate-api coj-migrate-api:latest # คำสั่งรัน Docker
```