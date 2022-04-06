# ANGULAR
Es un framework para JavaScript que nos a a ayudar a desarrollar aplicaciones web SPA, es decir, una aplicación que no se necesita recargar la página en ningún momento y que está completamente separada del **backend**. La comunicación con el *Backend* es mediante peticiones AJAX y mediante comunicación asincrona.

En caso de tenerlo instalado debemos hacer lo siguiente:

> Desinstalar angular/cli:  
    - npm uninstall -g @angular/cli

> Borrar cache: 
    - npm cache verify
    - npm cache clear --force

## INSTALACIÓN DE ANGULAR
> npm install -g @angular/cli

**Generar un nuevo proyecto angular**
> ng new "nombre de la carpeta"

> Arrancar el proyecto: ng serve --open (se debe estar dentro de la carpeta creada)

---
## CONCEPTOS TEÓRICOS DE ANGULAR

### **1- Componente**
Un componente al final va a controlar un trozo de pantalla o de la vista. Todo lo que se puede ver en pantalla es controlado y gestionado por este tipo de elementos.
La lógica de un componente dentro de una clase en Angular es que da soporte a una vista interactuando con ella a través de una API con propiedades y métodos.

El componente hace de mediador entre la vista a través de la plantilla y la lógica de la app donde se incluirá el modelo de datos,es decir una especie de controlador.

### **2- Plantillas**
Las plantillas van a definir van a definir la vista de los componentes.

Son htmls y tienen sintaxis especial de Angular. Trabajando con el databinding y las directivas.

### **3- Decoradores y metadatos**
Con los decoradores (patrón de diseño) vamos a configurar dinamicamente atributos/metadatos de las clases y componentes.

Los metadatos van a describir a las clases pero también describen relaciones, por ejemplo si tenemos un componente y una plantilla el metadato ser va a encargar de decirle a Angular que ese componente y esa plantilla van juntos, entre otras muchas cosas.

### **4- Servicios**
Son clases con un objetivo claro, facilita la reutilización, son un tipo de elemento dentro de la arquitectura de Angular y mediante la inyección de dependencias los podemos usar en otro componentes principales.

### **5- Providers**
Son servicios que nos proveen de datos o funcionalidades mediante sus métodos. Existen providers/servicios propios de Angular o creados por nosotros mismos.

### **6- Directivas**
Son funcionalidades aplicables al DOM y a los elementos HTML en las plantillas de un componente. Por ejemplo una directiva puede servir para controlar que un div se muestre o no, recorrer un array en la vista (directivas estructurales, estructuras condicionales y de control) o incluso también para interactuar con el modelo de datos del componente.

Basicamente son nuevos atributos para aplicarlea cualquier cosa en nuestra plantilla/vista.

---
## COMPONENTE
Es una parte de nuestra aplicación. Puedo tener un componente para el header, otro componente para un sidebar, otro para un calendario. Todo en angular está formado por componentes.

> Los componentes se crearán en la carpeta "app", en el archivo app.component.ts

```javascript
    import { Component } from "@angular/core";

    @Component({ //Decorador
        selector: 'app-root',
        templateUrl: ['.app/component.html'] //Vista del componente
        styleUrls: ['.app/component.css']
    })
    export class AppComponent {
        title = 'app';
    }

```

> Los componentes se inicializan en el archivo "app.module.ts"

___
## EJEMPLO DE DEFINIR UNA TEMPLATE EN LINEA
Creamos una carpeta "videojuego", donde colocaremos 2 archivos "videojuego.component.ts" (para los componentes) y el otro "videojuego.component.html"

En el archivo "videojuego.component.ts" creamos el componente:

```javascript
    import { Component } from "@angular/core"; //Indicar el paquete donde estará ubicado el componente

    @Component({ //Decorador (no colocar punto y coma)
        selector: 'videojuego', //nombre de la etiqueta
        template: `
            <h2>Componente de Videojuegos</h2>
            <ul>
                <li>GTA</li>
                <li>Prince of Persia</li>
                <li>Tekken</li>
                <li>Mario</li>   
            </ul>
            `
    })
    export class VideojuegoComponent {
        constructor(){
            console.log("Se ha cargado un componente")
        }
    }
```

Para poder utilizar este componente, vamos al archivo "app.module.ts" e importo la clase "VideojuegoComponent" y luego declararlo en el array de "declarations"

```javascript
    import { VideojuegoComponent } from './videojuego/videojuego.component';

    @NgModule({
        declarations: [
            AppComponent,
            VideojuegoComponent //Componente nuevo
        ],
        imports: [
            BrowserModule,
            AppRoutingModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule { }
```

Para utilizar el componente, solo debemos colocar la nueva etiqueta en "app.component.html"

```html
    <div class="content" role="main">
    <h1>Bienvenido al {{ title }}</h1>
    <p>Vamos a aprender Angular juntos</p>

    <videojuego></videojuego> <!-- Nuevo componente -->
    </div>
```

> **IMPORTANTE:** Lo más recomendable es definir una template en una vista externa.

Para hacer esto llevamos lo que colocamos el archivo "videojuego.component.ts" en la parte de *Template*, a otro archivo llamado "videojuego.component.html". Hacemos los siguientes cambios:

```javascript
    // En videojuego.component.ts
    import { Component } from "@angular/core";

    @Component({
        selector: 'videojuego',
        templateUrl: './videojuego.component.html'
    })

    export class VideojuegoComponent {

        constructor() {
            console.log("Se ha cargado el componente")
        }
    }
```

```html
    <!-- En el nuevo archivo videjuego.component.html -->
    <h2>Componente de Videojuegos</h2>
    <ul>
        <li>GTA</li>
        <li>Prince of Persia</li>
        <li>Tekken</li>
        <li>Mario</li>   
    </ul>
```

---
## PROPIEDADES
Dentro de las clases se pueden colocar propiedades Publicas.

```javascript
    import { Component } from "@angular/core";

    @Component({
        selector: 'videojuego',
        templateUrl: './videojuego.component.html'
    })

    export class VideojuegoComponent {
        public titulo: string;
        public listado: string;

        constructor() {
            this.titulo = "Videojuegos";
            this.listado = "Listado de los juegos más populares";
            console.log("Se ha cargado el componente");
        }
    }
```
En el videojuego.component.html

```html
    <h2>{{titulo}}</h2> <!--Se incrusta la variable creada en el constructor  -->
    <p>{{listado}}</p>
    <ul>
        <li>GTA</li>
        <li>Prince of Persia</li>
        <li>Tekken</li>
        <li>Mario</li>   
    </ul>
```

## MULTIPLES / VARIOS COMPONENTES

Si creamos otros componentes, estos podemos reutilizarlos de la manera que queramos, podemos invocarlos de manera directa en el html principal, o colocarlo dentro de otro componente, para que este componente lo muestre luego. En ambas situaciones va a funcionar el componente.

Ejemplo: el componente "zapatillas" a sido creado como otro componente pero puede utilizarse sin ningún problema en el componente "videojuego"

```html
    <!-- videojuego.component.html -->
    <h2>{{titulo}}</h2>
    <p>{{listado}}</p>
    <ul>
        <li>GTA</li>
        <li>Prince of Persia</li>
        <li>Tekken</li>
        <li>Mario</li>   
    </ul>
    <zapatillas></zapatillas>
```

---
---

## CREAR COMPONENTES DESDE LA CONSOLA
Se recomienda utilizar CMD en Windows
Ingresar a la ruta del proyecto y colocar:

> ng g component (nombre del componente)

Al crearlo de esta manera, el sistema crea automáticamente el import y el declaration en el app.module.ts

## HOOKS / EVENTOS CICLO DE VIDA

> Hooks: Eventos de un componente que se ejecutan en un momento dado del ciclo de vida del componente. Se lanzan dependiendo del estado del componente.

### OnInit

Se implenta en una interfaz de la siguiente manera:

```javascript
    
    import { Component, OnInit } from '@angular/core';

    @Component({
        selector: 'cursos',
        templateUrl: './cursos.component.html',
        styleUrls: ['./cursos.component.css']
    })
    export class CursosComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
```

Este Hook brinda acceso a los siguientes métodos:
- **ngOnInit:** Este es el método que se ejecuta nada más cargar un componente.
```javascript
    ngOnInit(): void {
        }
```
- **ngDoCheck:** este metodo se ejecuta cada vez que hay algún cambio en el código.
> export class VideojuegoComponent implements OnInit, DoCheck{ }

```javascript
    ngDoCheck(): void {
        console.log("DoCheck ejecutado");
    }
```

- **OnDestroy:** este metodo se ejecuta cuando se elimina un componente.
> export class VideojuegoComponent implements OnInit, DoCheck, OnDestroy{ }
```javascript
    ngOnDestroy(): void {
        console.log("OnDestroy ejecutado")
    }
```