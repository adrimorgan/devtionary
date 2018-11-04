## ¿Qué es ***devtionary***? :boom:

Se trata de un servicio web que permite a los desarrolladores de software disponer de una plataforma fiable y multiplataforma sobre la que tomar notas y apuntes relacionados con los proyectos que tengan en desarrollo.

Puede entenderse como un diccionario casero donde es el propio usuario quien define las claves que han de clasificarse, junto con el significado más representativo para el mismo.

#### Espera, ¿otra aplicación de notas... :neutral_face:?

Lejos de ser una fuente de información absoluta, está pensada para funcionar como cualquier aplicación de toma de notas ya conocida pero con algunas distinciones importantes:

- Es el propio usuario quien define **qué información es importante**. Si actualmente se encuentra trabajando en un proyecto para el que ha necesitado consultar información en diversos medios (páginas web, libros, etc.) seguro que precisará de alguna plataforma donde alojar esas anotaciones que personalmente le ayudan a entender la tecnología que está utilizando. Además, si deja de utilizar dicha tecnología y en un futuro necesita volver a ella, tendrá disponibles esos apuntes con las bondades y desventajas que consideró en su momento.

- Una aplicación de notas corriente suele usarse para recordar tareas con estado (*finalizado/no finalizado*) y quizás con fechas de terminación, como las aplicaciones [***Tasks*** y ***Keep*** de ***Google***.](https://keep.google.com/). Sin embargo, no suelen tener un mecanismo intuitivo y cómodo de almacenar **información permanente**, con posibilidad de **ordenación** del contenido (por nombre de la clave, fecha de adición, etc.) y **filtrado según categorías**. ***Devtionary*** está pensada para poner solución a esto.

- Para utilizar esta herramienta no necesitas iniciar sesión en una página web que desconocías hasta ahora; bastará con que uses los servicios con los que estás acostumbrado a trabajar y autenticarte con ellos, gracias al uso de [***Auth0***](https://auth0.com/).

### Implementación, *testing* y despliegue :rocket:

##### Lenguaje utilizado

- Desde el punto de vista de las **arquitecturas de microservicios**, aprovecharemos las bondades de la *programación políglota* (con los distintos componentes en diferentes lenguajes) para implementar este servicio con el lenguaje **`Node`** (basado en `JavaScript`), dado que ya he trabajado con él y me permitirá centrarme en los contenidos de la asignatura de *Cloud Computing* sin perder tanto tiempo en aprender otras cosas paralelas. En un futuro, la interfaz de usuario abastecida por este usuario podría programarse perfectamente en cualquier otro lenguaje como *JavaScript* y derivados.

- Una vez elegido el lenguaje de programación, agradeceremos el uso de algún *framework* web que nos ayude en la implementación de este tipo de servicios. Dada la sencillez de uso que comporta y el amplio rango de usuarios que posee, utilizaremos [***Express***](https://expressjs.com/es/).

##### Persistencia de datos

- En cuanto al almacenamiento persistente de datos, preferentemente optaremos por una base de datos de tipo no-relacional (*NoSQL*), cuya estructura es más conveniente para proyectos donde la estructura no es definitiva al 100% o las relaciones no llegan a estar perfectamente definidas dada la posibilidad de cambios en los modelos. Para este proyecto, por facilidad de uso y por experiencia con la herramienta, usaremos [***MongoDB***](https://www.mongodb.com/).

Gracias al uso de `Node` acompañado del gestor ***`NPM`*** dispondremos de un módulo llamado también `MongoDB` que nos permitirá interactuar con la base de datos de forma sencilla y directa (como vemos en [este enlace](https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp)).

##### Provisionamiento

Por su uso tan extendido y por ser de las herramientas más modernas en este ámbito, utilizaremos [`Ansible`](https://www.ansible.com/) para el provisionamiento de las máquinas virtuales donde se alojarán los fuentes del servicio que será ofrecido finalmente.

##### Integración continua y *testing*

- Como todo sistema software moderno, el código habrá de ser testeado y superará un mecanismo de integración continua antes de aceptar nueva inclusión de código en el repositorio. Esta integración podrá hacerse con herramientas como [***Travis-CI***](https://travis-ci.com).

- Adicionalmente, para mejorar la calidad del software (así como el aspecto de nuestro repositorio, por qué no), podremos utilizar servicios de control del testeo como [Coveralls](https://coveralls.io/) o similares. Se tratan de servicios que calculan (entiendo que de forma aproximada) el porcentaje del código que está completamente testeado.

##### Despliegue

- El código testeado, una vez incluido en el repositorio, se volcará automáticamente en una imagen de contenedor ***Docker*** para facilitar el despliegue automatizado y fácilmente instanciable en diferentes réplicas del servicio web.

- En cuanto a plataforma de despliegue, se podría optar por *Heroku*, *Firebase*, *Google App Engine* y/o similares. Sin embargo, por cercanía y por la exclusividad que ofrece para imágenes *Docker* y para servicios implementados en *Node*, me decantaré por utilizar [zeit.co](zeit.co), junto con su cómoda herramienta [`now`](https://zeit.co/docs/getting-started/introduction-to-now) desde línea de comandos en Linux.
