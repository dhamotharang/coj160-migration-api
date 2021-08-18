FROM node:15.11.0-slim

RUN apt-get update
RUN apt-get install -y alien libaio1

WORKDIR /tmp
RUN apt-get install -y wget
RUN wget -c https://raw.githubusercontent.com/midnighttime-cha/oracle-client11.2/master/oracle-instantclient11.2-basic-11.2.0.4.0-1.x86_64.rpm
# COPY ./client/oracle-instantclient11.2-basic-11.2.0.4.0-1.x86_64.rpm /tmp
RUN alien -i --scripts oracle-instantclient*.rpm
RUN rm -f oracle-instantclient*.rpm
RUN apt-get -y autoremove && apt-get -y clean
RUN rm -rf /tmp/oracle-instantclient*.rpm
ENV LD_LIBRARY_PATH /usr/lib/oracle/11.2/client64/lib/
ENV ORACLE_HOME /usr/lib/oracle/11.2/client64/lib/

RUN mkdir -p /app/files && chown -R node:node /app
WORKDIR /app
COPY . .
RUN yarn install && yarn build

RUN apt-get update && apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# COPY dist ./
USER node
COPY --chown=node:node . .


CMD [ "yarn", "start:prod" ]