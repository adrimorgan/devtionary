# **[WIP]** ***devtionary*** - *El diccionario por y para desarrolladores*

![AUR](https://img.shields.io/aur/license/yaourt.svg)
![Architecture](https://img.shields.io/badge/arch-microservices-f95f9a.svg)
![GitHub issues](https://img.shields.io/github/issues/adrianmorente/devtionary.svg)
![GitHub stars](https://img.shields.io/github/stars/adrianmorente/devtionary.svg?style=social&label=Stars)

## 1. ¿Qué es ***devtionary***? :boom:

Se trata de un servicio web que permite a los desarrolladores de software disponer de una plataforma fiable y multiplataforma sobre la que tomar notas y apuntes relacionados con los proyectos que tengan en desarrollo.

Puede entenderse como un diccionario casero donde es el propio usuario quien define las claves que han de clasificarse, junto con el significado más representativo para el mismo.

#### Espera, ¿otra aplicación de notas... :neutral_face:?

Lejos de ser una fuente de información absoluta, está pensada para funcionar como cualquier aplicación de toma de notas ya conocida pero con algunas distinciones importantes:

- Es el propio usuario quien define **qué información es importante**. Si actualmente se encuentra trabajando en un proyecto para el que ha necesitado consultar información en diversos medios (páginas web, libros, etc.) seguro que precisará de alguna plataforma donde alojar esas anotaciones que personalmente le ayudan a entender la tecnología que está utilizando. Además, si deja de utilizar dicha tecnología y en un futuro necesita volver a ella, tendrá disponibles esos apuntes con las bondades y desventajas que consideró en su momento.

- Una aplicación de notas corriente suele usarse para recordar tareas con estado (*finalizado/no finalizado*) y quizás con fechas de terminación, como las aplicaciones [***Tasks*** y ***Keep*** de ***Google***.](https://keep.google.com/). Sin embargo, no suelen tener un mecanismo intuitivo y cómodo de almacenar **información permanente**, con posibilidad de **ordenación** del contenido (por nombre de la clave, fecha de adición, etc.) y **filtrado según categorías**. ***Devtionary*** está pensada para poner solución a esto.

- Para utilizar esta herramienta no necesitas iniciar sesión en una página web que desconocías hasta ahora; bastará con que uses los servicios con los que estás acostumbrado a trabajar y autenticarte con ellos, gracias al uso de [***Auth0***](https://auth0.com/).

### Implementación, *testing* y despliegue :rocket:

- Desde el punto de vista de las **arquitecturas de microservicios**, aprovecharemos las bondades de la *programación políglota* (con los distintos componentes en diferentes lenguajes) para implementar este servicio con el lenguaje [***Perl6***](https://perl6.org/). En un futuro, la interfaz de usuario abastecida por este usuario podría programarse perfectamente en cualquier otro lenguaje como *JavaScript* y derivados.

- Como todo sistema software moderno, el código habrá de ser testeado y superará un mecanismo de integración continua antes de aceptar nueva inclusión de código en el repositorio. Esta integración podrá hacerse con herramientas como [***Travis-CI***](https://travis-ci.com).

- El código testeado, una vez incluido en el repositorio, se volcará automáticamente en una imagen de contenedor ***Docker*** para facilitar el despliegue automatizado y fácilmente instanciable en diferentes réplicas del servicio web.

- [**Por decidir**] En cuanto a plataforma de despliegue, se podrá optar por *Heroku*, *Firebase*, *Google App Engine* y/o similares.
