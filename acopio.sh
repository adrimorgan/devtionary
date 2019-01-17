#!/bin/bash

resourceGroup="recursosHito4-debian"
location="francecentral"
azureImage="Debian"
machineName="maquinaHito4-debian"
adminUser="amorente"
size="Standard_B1s"

# Creación del grupo de recursos en la ubicación elegida
echo "Creando grupo de recursos ${resourceGroup} en ${location}..."
az group create --name $resourceGroup --location $location

# Creación de la máquina virtual sobre los recursos creados
echo "Creando máquina virtual ${machineName} con la imagen ${azureImage}..."
az vm create -n $machineName \
  -g $resourceGroup \
  --image $azureImage \
  --admin-username $adminUser \
  --size $size \
  --generate-ssh-keys
