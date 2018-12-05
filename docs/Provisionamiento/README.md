## Provisionamiento

Como sabemos, consiste en hacer lo necesario para que nuestro microservicio pueda ejecutarse en una o más instancias de servidores web (generalmente, en forma de máquinas virtuales sobre cualquier plataforma cloud como *Azure*, *AWS* u *OpenStack*). Para llegar a esto, en la máquina final deberán cumplirse diversos factores:

1. Deberá disponer de un sistema operativo apto para la utilidad que buscamos. Para esto nos bastará con instalar alguna de las distribuciones *GNU/Linux* más comunes para este fin.
1. Deberá estar ***git*** instalado en dicho sistema operativo (a través del gestor de paquetes, generalmente *apt* o *yum*), ya que gran parte de los programas pueden ser instalados a partir de ahí; además de que será la herramienta necesaria para clonar el repositorio con el código que se ha de desplegar.
1. Las dependencias del microservicio (dictadas por el lenguaje de programación utilizado) deberán ser instaladas en la máquina. Por ejemplo, para un servicio web programado con *NodeJS*, será de imperativa necesidad disponer de *NPM* así como de las dependencias estipuladas por el `package.json` proporcionado por el proyecto; o por el fichero `requirements.txt` en caso de utilizar *Python* como lenguaje de programación.
1. Finalmente, **el código** del servicio que se desea desplegar (clonado mediante *git* y con sus dependencias instaladas con herramientas similares a las antes mencionadas).

#### Sistema operativo

Dentro del catálogo de sistemas operativos disponibles para servidores web nos encontramos con *Debian*, *CentOS* y *Ubuntu Server* principalmente (aunque existen muchos otros). En cuanto a términos de rendimiento apenas existen diferencias si se utilizan los mismos servicios sobre ellos, por lo que la justificación de dicha elección se basará en otros aspectos.

En nuestro caso, nos quedaremos con Ubuntu Server por los siguientes motivos:
- Goza de una comunidad de usuarios enorme, con las ventajas que ello comporta en cuanto a testeo y documentación.
- Recibe actualizaciones de forma mucho más rápida que rivales como CentOS, que aunque puede verse como un aspecto de inestabilidad, permite disfrutar antes de las novedades implementadas por la comunidad de *GNU/Linux*.
- Por familiaridad con el uso del sistema operativo y `apt`, su gestor de paquetes.

Si intentamos remitirnos a alguna fuente que nos oriente hacia una decisión final, todas plantean las características antes explicadas y optan por que el aspecto más importante es la experiencia que tenga el usuario con cada uno (como vemos en los ejemplos [1](https://www.futurehosting.com/blog/what-is-the-difference-between-centos-and-ubuntu-server/) y [2](https://www.hostinger.com/tutorials/centos-vs-ubuntu)).

#### Provisionando con Ansible

Una **herramienta de provisionamiento** como *Rex*, *Puppet* o *Ansible* (entre otras) se encargará de satisfacer los requisitos enumerados en cada una de las instancias que deseemos. En este caso, utilizaremos [`Ansible`](https://www.ansible.com/) por las siguientes razones:

- Al ser una herramienta más moderna que sus "rivales", intenta proveer una interfaz de provisionamiento y orquestación más sencilla que el resto, con las ventajas que ello comporta al desarrollador; aliviando la dificultad de esta parte del desarrollo.
- Está programada en *Python* y depende de dicho lenguaje, que por suerte a día de hoy ya viene instalado en prácticamente cualquier sistema operativo moderno.
- La instalación y primera ejecución son sencillas; y dispone de una documentación rica con secciones dedicadas para las principales plataformas cloud.

###### Receta de provisionamiento *(playbook)*

Para satisfacer los requisitos antes mencionados, el *playbook* correspondiente deberá realizar las siguientes tareas:

1. Instalar `git`, `curl`, `nodejs` y `pm2`.
1. Descargar el código de este repositorio en la máquina virtual.
1. Instalar las dependencias del proyecto para poder ejecutarlo.

La configuración de Ansible de dicho procedimiento se realiza en el archivo [provision/playbook.yml](./provision/playbook.yml); que a su vez se ayuda de otros dos ficheros presentes en el mismo directorio `provision`:

- [`ansible.cfg`](./provision/ansible.cfg) que contiene un parámetro para que el cliente SSH de nuestra máquina no pida autorización al conectar a una nueva máquina desconocida además de la ruta a los hosts a tener en cuenta por el cliente de Ansible.
- [`ansible_hosts`](./provision/ansible_hosts) por otro lado permite agrupar los diferentes hosts que manejemos, especificando su IP pública, el puerto SSH de conexión y la clave pública de nuestra máquina a instalar allí (para poder realizar labores de administración sin contraseña). Inicialmente solo dispondremos de uno en Azure, como comentamos en el siguiente apartado.

Una vez realizado correctamente este provisionamiento, la máquina virtual estará preparada para desplegar nuestro servicio; cosa que temporalmente se hará de forma manual accediendo por SSH, entrando en el directorio correspondiente y ejecutando la orden `sudo npm start`.

### Creando recursos en Azure

Además de la herramienta de provisionamiento que vamos a usar, necesitamos saber **dónde vamos a desplegar el servicio**, que será sobre *Azure* en una instancia de las obtenidas de forma gratuita a través de la Universidad. Este es uno de los principales motivos por los que elegimos la plataforma de *Microsoft*, dado que a pesar de intentar obtener otra instancia gratuita en *AWS* de *Amazon*, por demoras del servicio no ha sido posible.

Para empezar, habremos de instalar de forma local en nuestro ordenador el cliente de línea de comandos de Azure, para evitarnos lidiar con la interfaz web y ser más productivos en la tarea de crear y gestionar recursos. Para ello, podemos seguir la guía [provista por Microsoft](https://docs.microsoft.com/es-es/cli/azure/?view=azure-cli-latest), que nos brindará los pasos sencillos para instalar el cliente (generalmente desde los repositorios de nuestro sistema operativo) y nos enumerará los diferentes pasos para comenzar a utilizar el servicio.

Para dotar de la infraestructura necesaria a nuestra máquina virtual, deberemos satisfacer algunos requisitos como la creación de recursos y máquina(s) virtual(es) (podemos ayudarnos de la documentación provista por Microsoft [aquí](https://docs.microsoft.com/es-es/azure/virtual-machines/scripts/virtual-machines-linux-cli-sample-create-vm-quick-create?toc=%2fcli%2fazure%2ftoc.json#sample-script)):

- Beneficiarnos de un grupo de recursos virtuales (utilizando para ello el crédito antes mencionado). Para ello ejecutamos el siguiente comando donde indicamos el nombre que tendrá el grupo así como la localización del servidor donde instalaremos nuestra instancia:

<p align="center"><img alt="Comando de creación de un grupo de recursos virtuales en Azure" width="480px" src="../img/azure-create-group.png" /></p>

- Crear una máquina virtual aprovechando los recursos creados previamente. Dicha creación se lleva a cabo ejecutando el siguiente comando, indicando el nombre de la máquina, el grupo recién mencionado, la imagen de sistema operativo a utilizar y el nombre del usuario administrador. Además, pedimos (por favor, claro) a Azure que genere una clave SSH para el usuario especificado.

<p align="center"><img alt="Comando de creación de un grupo de recursos virtuales en Azure" width="300px" src="../img/azure-create-vm.png" /></p>

- Habilitar el puerto HTTP a través del cual llegarán las solicitudes a nuestro servicio web (80). Cuando dotemos de seguridad al microservicio obligando al acceso mediante el protocolo HTTPS, utilizaremos el puerto 443.

<p align="center"><img alt="Comando de apertura del puerto 80 para HTTP" width="480px" src="../img/azure-open-port.png" /></p>

Si queremos asegurarnos de que la máquina se ha creado con todos los parámetros especificados, así como revisar algunos parámetros de configuración por defecto, podemos ejecutar el comando `az vm list`, el cual lista las máquinas virtuales existentes haciendo una descripción a fondo en formato JSON por defecto, o en YML si así lo queremos (usando el flag `--output yaml`).

Además, para obtener parámetros como la dirección IP pública asociada a nuestra máquina, Azure CLI dispone de comandos como `az vm list-ip-addresses` a través del cual podremos obtenerla. Hecho esto, con el usuario creado como administrador, podremos realizar labores de administración mediante SSH con el comando `ssh usuario@ip`. En mi caso, la IP pública correspondiente al despliegue en Azure es la siguiente:

MV: 13.80.98.209
