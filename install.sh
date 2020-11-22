#!/bin/bash

set -e

docker build . -t subzero:latest

cp docker.subzero.service /etc/systemd/system/

systemctl daemon-reload

