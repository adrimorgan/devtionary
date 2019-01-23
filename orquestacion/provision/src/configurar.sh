#!/bin/sh

# Crear directorios necesarios
mkdir /etc/redis
mkdir /var/redis

# Crear usuario administrador con permisos de gestión
adduser --system --group --no-create-home redis
chown redis:redis /var/redis
chmod 770 /var/redis

# Copiar fichero de configuración obtenido
mv /redis.conf /etc/redis/
