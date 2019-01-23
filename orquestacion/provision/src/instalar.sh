#!/bin/sh

# Copiar fichero de servicio Systemd
mv /redis.service /etc/systemd/system/redis.service

# Activar y arrancar servicio
systemctl enable redis
systemctl start redis
