#!/bin/bash
source .env

ssh -p $DEPLOY_PORT $DEPLOY_URL "
  cd $DEPLOY_FOLDER &&
  git reset --hard origin/master &&
  git pull &&
  sudo -S npm ci &&
  sudo -S npm run build
"
