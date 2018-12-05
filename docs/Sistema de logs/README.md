### Sistema de logs

El volcado de información de depuración y errores suele ser uno de los aspectos que nos pasan desapercibidos a la hora de implementar servicios. Sin embargo, sin la existencia de estas fuentes de información prácticamente no podríamos ni utilizar ni aprender lenguajes de programación o aplicaciones cotidianas que usamos a diario como desarrolladores.

Para este servicio que estamos implementando, utilizaremos una herramienta de generación de *logs* llamada [***Winston***](https://www.npmjs.com/package/winston), que parece ser de las más conocidas y estables vista su popularidad tanto en la web de *NPM* como en *GitHub*.

Para aprender a utilizar la herramienta de forma profunda podemos consultar la documentación presente en [su repositorio](https://github.com/winstonjs/winston); aunque para un inicio rápido con el sistema podemos ayudarnos de [este buen tutorial](https://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js/).

---

##### Utilidad

Para sacarle partido a este sistema, en la mayoría de las funciones que ejecute nuestra aplicación utilizaremos alguno de los métodos de la herramienta `Winston`. Por ejemplo, podremos llevar un control de las direcciones IP que acceden a nuestro servicio web; así como llevar un control de los datos que se crean/editan/borran sobre nuestros modelos de datos.

##### Inicio rápido

Para empezar a utilizar la herramienta bastará con instalar mediante `npm` (de la forma ya conocida) la herramienta `winston` e importarla en el código como ya sabemos. Cabe destacar que toda la configuración del servicio de forma interna a nuestra aplicación se realiza muy intuitivamente en forma de JSON, como veremos en los siguientes apartados.

##### Formato de la información

Una vez que hemos importado en el código la librería `'winston'`, podemos utilizar el método `createLogger` para crear un agente que gestione y almacene este tipo de información. Además, permite unos cuantos parámetros muy curiosos e útiles para dotarnos de la mayor flexibilidad de uso.

- Para empezar, mediante variables de entorno podemos definir en la sección `level` el modo de funcionamiento en el que se encuentra la aplicación (normalmente, en desarrollo o en producción).
- En la sección `format`, definimos el formato que va a tener el mensaje de log, tanto en consola como donde queramos almacenarlo. En este caso, definimos que la huella temporal se muestre en forma de `AÑO-MES-DÍA`.
- Por otro lado, con `printf` hacemos que el orden en que se imprime la información sea (huella de tiempo) + (tipo de mensaje) + (mensaje descriptivo). En cuanto al tipo, se tratará de un error, un aviso o una información general.

```js
const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  ...
});
```

##### Ubicación de la información

Por defecto, *Winston* muestra toda la información de *logs* directamente y por omisión en consola, permitiendo añadir descriptores de colores en palabras reservadas como `error`, `warn` e `info`.

Sin embargo, para un uso real de lo que son este tipo de sistemas, aprovecharemos la posibilidad del guardado de esta información en ficheros persistentes; bien con un nombre fijo o bien con diferentes ficheros autogenerados a diario.

Esta derivación de la información la especificamos en la sección `transports`, que funciona como array de JSON y le pasamos dos parámetros: uno para la consola, y otro para el fichero cambiante.

```js
transports: [
  new transports.Console({
    level: 'info',
    format: format.combine(
      format.colorize(),
      format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    )
  }),
  dailyRotateFileTransport
]
```

Si nos fijamos en los parámetros pasados al objeto de consola, vemos que una vez más le podemos cambiar la organización de los datos que se muestran. Además, con `colorize` añadimos descriptores de colores a los distintos tipos de información: verde para `info`, amarillo para `warn` y rojo para `error`.
