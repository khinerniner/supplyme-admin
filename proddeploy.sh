#!/bin/sh
{
  pm2 delete veridoc \
  && git pull \
  && cd /srv/www/veridoc-admin/static \
  && npm install \
  && npm run build:production \
  && pm2 start "/usr/local/bin/npm" --name "veridoc" -- start
} || {
  git pull \
  && cd /srv/www/veridoc-admin/static \
  && npm install \
  && npm run build:production \
  && pm2 start "/usr/local/bin/npm" --name "veridoc" -- start
}
