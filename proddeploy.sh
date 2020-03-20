#!/bin/sh
{
  pm2 delete ae \
  && git pull \
  && cd /srv/www/ae-admin/static \
  && npm install \
  && npm run build:production \
  && pm2 start "/usr/local/bin/npm" --name "ae" -- start
} || {
  git pull \
  && cd /srv/www/ae-admin/static \
  && npm install \
  && npm run build:production \
  && pm2 start "/usr/local/bin/npm" --name "ae" -- start
}
