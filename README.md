# **[WIP]** ***devtionary*** - *El diccionario por y para desarrolladores*

![AUR](https://img.shields.io/aur/license/yaourt.svg)
![Architecture](https://img.shields.io/badge/arch-microservices-f95f9a.svg)
[![Build Status](https://travis-ci.com/adrianmorente/devtionary.svg?branch=master)](https://travis-ci.com/adrianmorente/devtionary)
[![Coverage Status](https://coveralls.io/repos/github/adrianmorente/devtionary/badge.svg?branch=master)](https://coveralls.io/github/adrianmorente/devtionary?branch=master)
![GitHub issues](https://img.shields.io/github/issues/adrianmorente/devtionary.svg)
![GitHub stars](https://img.shields.io/github/stars/adrianmorente/devtionary.svg?style=social&label=Stars)

---

## ¿Qué es ***devtionary***? :boom:

Se trata de un servicio web que permite a los desarrolladores de software disponer de una plataforma fiable y multiplataforma sobre la que tomar notas y apuntes relacionados con los proyectos que tengan en desarrollo.

Puede entenderse como un diccionario casero donde es el propio usuario quien define las claves que han de clasificarse, junto con el significado más representativo para el mismo.

#### Espera, ¿otra aplicación de notas... :neutral_face:?

Lejos de ser una fuente de información absoluta, está pensada para funcionar como cualquier aplicación de toma de notas ya conocida pero con algunas distinciones importantes:

- Es el propio usuario quien define **qué información es importante**. Si actualmente se encuentra trabajando en un proyecto para el que ha necesitado consultar información en diversos medios (páginas web, libros, etc.) seguro que precisará de alguna plataforma donde alojar esas anotaciones que personalmente le ayudan a entender la tecnología que está utilizando. Además, si deja de utilizar dicha tecnología y en un futuro necesita volver a ella, tendrá disponibles esos apuntes con las bondades y desventajas que consideró en su momento.

- Una aplicación de notas corriente suele usarse para recordar tareas con estado (*finalizado/no finalizado*) y quizás con fechas de terminación, como las aplicaciones [***Tasks*** y ***Keep*** de ***Google***.](https://keep.google.com/). Sin embargo, no suelen tener un mecanismo intuitivo y cómodo de almacenar **información permanente**, con posibilidad de **ordenación** del contenido (por nombre de la clave, fecha de adición, etc.) y **filtrado según categorías**. ***Devtionary*** está pensada para poner solución a esto.

- Para utilizar esta herramienta no necesitas iniciar sesión en una página web que desconocías hasta ahora; bastará con que uses los servicios con los que estás acostumbrado a trabajar y autenticarte con ellos, gracias al uso de [***Auth0***](https://auth0.com/).

## Descripción de las herramientas utilizadas

Para ahondar un poco en todas las herramientas utilizadas por este servicio (lenguajes de programación, motores de bases de datos, sistemas de integración continua y testing) podemos consultar la documentación [en este enlace](./docs/Descripción\ de\ herramientas/).

#### Despliegue estático en Heroku desde Github

Despliegue: https://devtionary.herokuapp.com

### Sistema de logs de información y depuración

La documentación referente al uso de `Winston` y sus aplicaciones se puede consultar [aquí](https://github.com/adrianmorente/devtionary/tree/master/docs/Sistema%20de%20logs).

### Provisionamiento a cloud automático mediante CLI

En las tareas necesarias para satisfacer los requisitos de este apartado pueden encontrarse algunas similitudes con las acciones desempeñadas para la solución del hito anterior (cuya información puede consultarse [en este enlace](./docs/Provisionamiento/) y que versa principalmente sobre la utilización de *Ansible*), dado que opté por utilizar herramientas de línea de comandos tanto para la creación de recursos como de máquinas virtuales, usando ***Azure*** como proveedor [y lógicamente, su herramienta `az` (que viene a ser la antigua `azure-cli` en su versión 2.0) como utilidad de línea de comandos].

Sin embargo, para este nuevo hito iremos más allá, y realizaremos una serie de pasos similar con una nueva máquina virtual, pero haciendo más hincapié en la elección del sistema operativo (realizando medidas de rendimiento mediante ejecución de *benchmarks* si fuese necesario). La documentación referente a este nuevo apartado se puede consultar [aquí](./docs/Provisionamiento%20automático), y la dirección IP obtenida por dicho proveedor es la mostrada a continuación:

MV2: X.X.X.X
