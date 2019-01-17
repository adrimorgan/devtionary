## Provisionamiento a cloud automático mediante CLI - Justificaciones según medidas

#### Elección de ubicación física del centro de datos

Como podemos ver en el archivo de [Repaso del hito anterior](./Repaso.md), la localización física elegida para ubicar nuestros recursos virtuales tiene lugar en *Francia Central*, por los motivos allí expuestos. Dicho esto, elegiremos un sistema operativo disponible en dicho centro de datos con los comandos de consulta también mencionados en dicho documento.

#### Elección del sistema operativo para virtualización

Utilizando el script de provisionamiento CLI documentado [aquí](./Acopio.md), se habrán comparado las siguientes imágenes de sistema operativo:

| Nombre        | Proveedor | *Alias URN* | Versión   |
|---------------|-----------|-------------|-----------|
| Ubuntu Server | Canonical | `UbuntuLTS` | 16.04 LTS |
| CentOS        | OpenLogic | `CentOS`    | 7.5       |
| Debian        | Credativ  | `Debian`    | 8         |

La toma de medidas de rendimiento se han realizado con la herramienta [***httperf***](https://github.com/httperf/httperf), que genera una carga de solicitudes mediante HTTP determinada para evaluar el rendimiento del servidor contra el que se ejecuta.

Para preparar estas máquinas para ser evaluadas, será necesario realizar los siguientes pasos:

- Crear las distintas máquinas con el script provisto, modificando los valores según los aliases de URN mostrados en la tabla de arriba.
- Provisionar manualmente las máquinas utilizando [el playbook de *Ansible* creado en el hito anterior](https://github.com/adrianmorente/devtionary/tree/master/provision/playbook.yml), modificando los parámetros necesarios como ya explicamos (nombre de la máquina e IP, principalmente).
- Ejecutar manualmente (con `pm2 start src/app.js`) el servicio en cada una de las máquinas, accediendo por SSH.
- Lanzar la herramienta `httperf` sobre cada una de las distintas máquinas.

Cabe destacar que **el tamaño de instancia** elegido (de entre los posibles [aquí presentes](https://azure.microsoft.com/es-es/pricing/details/virtual-machines/linux/) y contrastado con la comparación de precios de [esta web](https://azureprice.net/?region=francecentral)) ha sido el más básico, ***S1 de la Serie B***, dado que nos disponemos a ejecutar un servidor que apenas recibirá consultas ni manejará bases de datos de gran envergadura, por lo que será primordial ahorrar en crédito de `Azure` (que, por si no lo recordamos, es el proveedor que venimos usando hasta ahora).

Volviendo a las mediciones antes comentadas, el comando que lanzaría las consultas HTTP de las que obtener resultados podría ser el siguiente (visto [en la documentación del propio repositorio de `httperf`](https://github.com/httperf/httperf)):

```
httperf --server X.X.X.X --port YYYY --num-conns Z --rate H
```

- *X.X.X.X* se corresponde con la IP o el nombre de dominio del servidor a evaluar, en mi caso será la IP de cada una de las 4 máquinas.
- *YYYY* se sustituye por el puerto a través del cual se realizarán las conexiones con dicho servidor.
- *Z* será el número total de solicitudes HTTP que se realizarán (utilizaré 200, en mi caso).
- *H* se corresponde con el número de solicitudes que se inician por segundo.

Una vez creadas las máquinas, utilizando el archivo `ansible_hosts` podemos provisionarlas con una sola ejecución de *Ansible* (como hacíamos en [el hito 3](../Provisionamiento), añadiendo tantas líneas como máquinas tengamos). Sin embargo, mi script de provisionamiento solo sirve para sistemas cuyo gestor de paquetes sea `apt` (`Debian` y `Ubuntu`), mientras que en `CentOS` (que utiliza `yum`) habré realizado la instalación y provisionamiento de forma manual mediante SSH (aunque también se podría haber creado un script de provisionamiento dedicado, dividiendo en el fichero `ansible_hosts` las distintas máquinas según el gestor de paquetes utilizado).

Vamos a basar nuestra medición en los parámetros ***Reply time*** y ***Connection time***, que se corresponden con el tiempo que tarda en responder la máquina a cada solicitud (expresado en milisegundos) y el tiempo necesario para realizar cada nueva conexión, respectivamente. Los resultados obtenidos son los siguientes:

##### Ubuntu Server

```
Connection time [ms]: connect 118.9
Reply time [ms]: response 99.1 transfer 0.0
```

##### CentOS

```
Connection time [ms]: connect 86.4
Reply time [ms]: response 84.1 transfer 0.0
```

##### Debian

```
Connection time [ms]: connect 63.2
Reply time [ms]: response 65.7 transfer 0.0
```

Dado que estamos midiendo retardos en tiempo de conexión y de respuesta, **cuanto menos, mejor**; así que viendo los valores obtenidos optaré por utilizar `Debian` como sistema operativo para alojar mi servicio en la máquina virtual definitiva:

MV2: 20.188.38.56
