#!/bin/sh
{
  pm2 delete supplyme \
  && git pull \
  && cd /srv/www/supplyme-admin/static \
  && npm install \
  && npm run build:production \
  && pm2 start "/usr/local/bin/npm" --name "supplyme" -- start
} || {
  git pull \
  && cd /srv/www/supplyme-admin/static \
  && npm install \
  && npm run build:production \
  && pm2 start "/usr/local/bin/npm" --name "supplyme" -- start
}
