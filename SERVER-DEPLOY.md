# veridoc Platform - React

Decentralized Article Credibility Rating Application

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Ubuntu 18.04

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
```

### Installing Fresh Droplet

A step by step guide to install on fresh version of Ubuntu 16.04

####Step 1.0: Generate SSH key pair

```
cd ~/.ssh
ssh-keygen -f veridocnet
cat ~/.ssh/aenet.pub
?? mkdir ~/.ssh
?? chmod 400 ~/.ssh
```

#### SSH Agent

```
eval "$(ssh-agent -s)"

```

* Copy key for later

#### Step 1.1: Create new user - "dorian" on server

```
adduser dorian
usermod -aG sudo dorian
su - dorian
mkdir ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
exit
```

```
addgroup deploy
adduser dorian deploy
mkdir /srv/www/
chown -vR :deploy /srv/www/veridoc-admin
chmod -vR g+w /srv/www/veridoc-admin
ls -ld /srv/www/veridoc-admin
ln -s /srv/www/veridoc-admin  ~/
```

* Paste key from 1.0 here

#### Step 1.2: Set up ssh config

```
sudo nano /etc/ssh/sshd_config
```

Set:

* Port 22
* PasswordAuthentication no
* PubkeyAuthentication yes
* ChallangeResponseAuthentication no
* PermitRootLogin no

```
sudo systemctl reload sshd
sudo ufw allow 22
```

Test Will Fail without firewall:

```
ssh -p 22 -i ~/.ssh/veridocnet dorian@IP-Address
```

#### Step 1.3: Set up ufw (Firewall) rules and delete root password

```
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
sudo passwd -dl root
```

#### Install NPM & NODE_ENV

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install build-essential
```

```
npm config get prefix
npm config set prefix '/usr/local'
sudo mkdir /usr/local/lib/node_modules
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
npm install -g npm
npm root -g
```

## Make Nuclide server
```
npm install -g nuclide
npm list -g nuclide
sudo ufw allow 9090
ps aux | grep nuclide
killall node
```

## Connect with Nuclide

```
netstat -lnt
```

#### Install Node Pre GYP
```
npm install -g node-gyp
npm install -g node-pre-gyp
```

#### Install PM2
```
npm install -g pm2
```

```
pm2 list
```

#### Step 2.0: Update Ubuntu & install Python Library

```
sudo apt-get update
sudo apt-get install python3-pip python3-dev libpq-dev nginx
```

#### Step 2.3: Make project directory tree

```
mkdir ~/veridoc && cd ~/veridoc
```

#### Step Create Key files and add keys

Copy From Storage

```
sudo nano env_var.json
```

##### Create Google Service Keys

###### Firebase Admin SDK

Navigate to Google Cloud Platform APIs & Services - Credentials

Under service account keys click "Manage Service Accounts"

"Create Service Account"

Name: firebase-adminsdk
Role: Project

Check Finish with new key

Copy Key and paste into

```
sudo nano firebase-adminsdk.json
```

On server

###### Gmail Admin SDK

Navigate to Google Cloud Platform APIs & Services - Credentials

Under service account keys click "Manage Service Accounts"

"Create Service Account"

Name: gmail-adminsdk
Role: Project

Check Finish with new key

Check Enable G Suite Domain Wide Delegation: google

Copy Key and paste into


```
sudo nano gmail-adminsdk.json
```


#### Install Virtual Env Wrapper Setup

Check & Upgrade pip python version
```
sudo apt-get install python-pip && pip install --upgrade pip
```
Close and reopen terminal

```
pip3 install --upgrade pip
pip --version
```


Install Virtual Env Wrapper

```
pip3 install virtualenvwrapper --user
rm -rf ~/.cache/pip
```

Change BashRC

```
sudo nano ~/.bashrc
```

Add the following to end of bashrc:

```
export PRIVALGO_CONFIG="/srv/www/veridoc-admin/env_var.json"
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3.6
export WORKON_HOME=$HOME/.virtualenvs
source $HOME/.local/bin/virtualenvwrapper.sh
```

Reset BashRC

```
mkdir ~/.virtualenvs
source ~/.bashrc
```

Check Virtual Env Wrapper

```
ls -l $VIRTUALENVWRAPPER_PYTHON
```

Make Virtual Env

####Step 2.4: Pull git repository and install requirements

Install Git
```
sudo apt-get update
sudo apt-get install git
sudo apt autoremove
```

```
cd /srv/www
git clone https://Harpangell@bitbucket.org/veridoc/veridoc-admin.git
mkvirtualenv veridocnet
cd veridoc-admin
pip3 install -U -r requirements.txt
```


#### Step 1: Install packages

```
cd /srv/www/veridoc-admin/static && npm install
npm run build:production
```

#### Step 2.7: Redis Setup

```
sudo apt-get update
sudo apt-get install build-essential tcl
```

```
cd /tmp \
&& curl -O http://download.redis.io/redis-stable.tar.gz \
&& tar xzvf redis-stable.tar.gz \
&& cd redis-stable \
&& make \
&& make test \
&& sudo make install \
&& sudo mkdir /etc/redis \
&& sudo cp /tmp/redis-stable/redis.conf /etc/redis \
&& sudo nano /etc/redis/redis.conf \
```

Set

* supervised no
* dir /var/lib/redis

```
sudo nano /etc/systemd/system/redis.service
```

```
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=dorian
Group=dorian
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf
ExecStop=/usr/local/bin/redis-cli shutdown
Restart=always

[Install]
WantedBy=multi-user.target
```


```
sudo mkdir /var/lib/redis \
&& sudo chown dorian:dorian /var/lib/redis \
&& sudo chmod 770 /var/lib/redis \
&& sudo mkdir /var/log/redis \
```


Local Development Start/Status/Stop Redis

```
sudo systemctl start redis
sudo systemctl status redis
```

Redis Ctl

```
redis-cli
```

Test Redis

```
ping
```

Quit Ctl

```
quit
```

```
sudo systemctl stop redis
```

Check Redis Logs:

```
sudo touch /var/log/redis/redis.out.log
sudo touch /var/log/redis/redis.err.log
```


####Step 2.6: Supervisor Setup


```
sudo su
apt-get install supervisor
```

```
service supervisor restart
```

```
sudo nano /etc/supervisor/conf.d/veridocnet.conf
```

```
[program:server]
directory=/srv/www/veridoc
command=/home/dorian/.virtualenvs/veridocnet/bin/gunicorn -b 0.0.0.0:8085 --workers=5 wsgi:app
startsecs=10
autostart=false
autorestart=false
stderr_logfile=/var/log/server/server.out.log
stdout_logfile=/var/log/server/server.err.log
user=dorian
group=deploy
environment =
        APP_SETTINGS="server.config.ProductionConfig",

[program:redis]
directory=/etc/redis
command=/usr/local/bin/redis-server /etc/redis/redis.conf
startsecs=10
autostart=true
autorestart=true
stderr_logfile=/var/log/redis/redis.out.log
stdout_logfile=/var/log/redis/redis.err.log
user=dorian
stopasgroup=true

[program:celery]
directory=/srv/www/veridoc
command=/home/dorian/.virtualenvs/veridocnet/bin/celery --app=server.celery worker -B -l info
startsecs=10
autostart=false
autorestart=false
stderr_logfile=/var/log/celery/celery.out.log
stdout_logfile=/var/log/celery/celery.err.log
user=dorian
group=deploy
stopasgroup=true
environment =
        APP_SETTINGS="server.config.ProductionConfig",
```
Create Logs

```
cd /var/log \
&& mkdir server \
&& sudo touch /var/log/server/veridoc-server.out.log \
&& sudo touch /var/log/server/veridoc-server.err.log \
&& mkdir celery \
&& sudo touch /var/log/celery/celery.out.log \
&& sudo touch /var/log/celery/celery.err.log \
```

Supervisor Re-read

```
supervisorctl reread
```

Supervisor Update

```
supervisorctl update
```

Start Supervisor Ctl

```
supervisorctl
restart all
```

Quit Supervisor Ctl

```
quit
```


#### Step Install SSL & Google certs

Create NON CL SSL
```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/harpangell.com.key -out /etc/ssl/harpangell.com.crt
sudo openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048
```

Download SSL from CA (Go-daddy)

On Local

```
scp -P 88 ~/PycharmProjects/veridoc.python.backup/certs/veridoc.io.zip dorian@159.89.154.157:
scp -P 88 ~/PycharmProjects/veridoc.python.backup/certs/veridoc.io.key dorian@159.89.154.157:
ssh -p 88 dorian@159.89.154.157
sudo apt install unzip
unzip veridoc.io.zip
rm veridoc.io.zip
mv gd_bundle-g2-g1.crt intermediate.crt
mv d3cb591fbee74b64.crt veridoc.io.crt
```



```
cd ~
cat veridoc.io.crt intermediate.crt > veridoc.io.chained.crt
sudo mv veridoc.io.chained.crt /etc/ssl/veridoc.io.chained.crt
sudo mv veridoc.io.key /etc/ssl/veridoc.io.key
rm intermediate.crt
rm veridoc.io.crt
sudo mkdir /etc/nginx/ssl \
&& sudo openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048
```

####Step 2.6: Configure Nginx

```
sudo nano /etc/nginx/sites-available/harpangell.com
```

```
##
# Basic Settings
##
server_tokens off;
add_header X-Frame-Options SAMEORIGIN;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "no-referrer";

#
# Redirect all www to non-www
#
server {
    server_name www.iamveridoc.com;
    ssl_certificate /etc/ssl/iamveridoc.com.chained.crt;
    ssl_certificate_key /etc/ssl/iamveridoc.com.key;
    listen *:80;
    listen *:443 ssl;
    listen [::]:80 ipv6only=on;
    listen [::]:443 ssl ipv6only=on;

    return 301 https://iamveridoc.com$request_uri;
}

#
# Redirect all non-encrypted to encrypted
#
server {
    server_name iamveridoc.com;
    listen *:80;
    listen [::]:80;

    return 301 https://iamveridoc.com$request_uri;
}

#
# Main
#
server {
    server_name iamveridoc.com;

    ### SSL
    listen 443 ssl;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/nginx/ssl/dhparam.pem;
    ssl_certificate /etc/ssl/iamveridoc.com.chained.crt;
    ssl_certificate_key /etc/ssl/iamveridoc.com.key;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";

    root /srv/www/veridoc/public;
    index index.html index.htm;

    location / {
      #try_files $uri $uri/ =404;
      /404.html;
		}

    error_page 401 403 404 /404.html;
}

server {
    server_name app.iamveridoc.com;
    listen 443 ssl;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/nginx/ssl/dhparam.pem;
    ssl_certificate /etc/ssl/iamveridoc.com.chained.crt;
    ssl_certificate_key /etc/ssl/iamveridoc.com.key;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    root /srv/www/veridoc/static;
    index index.html index.htm;

    location / {
			proxy_pass http://127.0.0.1:3005;
			proxy_http_version 1.1;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection 'upgrade';
			proxy_set_header Host $host;
			proxy_cache_bypass $http_upgrade;
		}
    error_page 401 403 404 /404.html;
}
```

```
sudo ln -s /etc/nginx/sites-available/veridoc.io /etc/nginx/sites-enabled
```

Test Nginx

```
sudo nginx -t
```

Restart Nginx

```
sudo systemctl restart nginx
```

#### Step 2.7 Change ufw (Firewall) for Nginx

```
sudo ufw allow 80
sudo ufw allow 'Nginx Full'
```


## Make Watchman
```
sudo apt-get install m4 automake libtool pkg-config
sudo apt-get update && sudo apt-get install libssl-dev
git clone https://github.com/facebook/watchman.git
cd watchman
./autogen.sh && ./configure && make
sudo make install
watchman watch /srv/www
```

## Increase iNotifies

```
cat /proc/sys/fs/inotify/max_user_watches
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```
