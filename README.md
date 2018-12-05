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

## Provisionamiento

La documentación referente al provisionamiento a través del uso de `Ansible` puede consultarse [en este enlace](./docs/Provisionamiento/).

MV: 13.80.98.209

### Comprobación del provisionamiento en otra máquina

Hecho por @andreamorgar. La comprobación se puede consultar [aquí](./docs/comprobacion_provision.md).

### Sistema de logs de información y depuración

La documentación referente al uso de `Winston` y sus aplicaciones se puede consultar [aquí](https://github.com/adrianmorente/devtionary/tree/master/docs/Sistema%20de%20logs).
