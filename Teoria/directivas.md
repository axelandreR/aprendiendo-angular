# DIRECTIVAS
Son pequeñas funcionalidades que tendremos en una vista o una plantilla. Una directiva sería la etiqueta de un componente, hay directivas para hacer estructuras de control, para hacer condicionales y bucles, para hacer eventos, databinding, etc.

## **ngIF**
Directiva estructural que nos permite utilizar condicionales en la parte de a vista.

Haremos que cuando el precio de una zapatilla sea menor a 80€, se marque en verde una etiqueta que diga oferta.

```html
    <!-- Con esta directiva aparecerá la palabra !EN OFERTA¡ en todos los productos que tengan un precio menor a 80 -->
    <h2>{{titulo}}</h2>
    <ul>
        <li *ngFor="let deportiva of zapatillas">{{deportiva.nombre}} - <strong>{{deportiva.precio}}€</strong>
            <span *ngIf="deportiva.precio < 80"
            [style.background]="deportiva.precio < 80 ? 'green': 'transparent'"
            [style.color]="deportiva.precio < 80 ? 'white': 'black'"
            > !EN OFERTA¡ </span>
            <!-- El style.background se cumplirá cuando el precio de la zapatilla sea menor a 80, en caso contrario será transparente -->
        </li>
        
    </ul>
```

## ngFor
Es utilizado para recorrer un Array y mostrarlo en las vistas.

Crear un nuevo array con solo las marcas de los productos
```javascript
    // zapatillas.component.ts
    import { Component, OnInit } from "@angular/core";
    import { Zapatilla } from "../models/zapatilla";

    @Component({
        selector: 'zapatillas',
        templateUrl: './zapatillas.component.html'
    })

    export class ZapatillasComponent implements OnInit{
        public titulo: string = "Componente de Zapatillas"
        public zapatillas: Array<Zapatilla>;
        public marcas: String[]; //1- Declaro el array donde se almacenará
        constructor(){
            this.marcas = new Array; //2- Inicializo el nuevo array
            this.zapatillas = [
                new Zapatilla('Nike Airmax', 'Nike', 'Blancas', 40, true),
                new Zapatilla('Reebook Clasic', 'Reebok', 'Blanco', 80, true),
                new Zapatilla('Nike Runner MD', 'Nike', 'Negras', 60, true),
                new Zapatilla('Reebook Spartan', 'Reebok', 'Negras', 180, false),
                new Zapatilla('Adidas Yezzy', 'Adidas', 'Azul', 180, false)
            ];
        }

        ngOnInit(): void {
            console.log(this.zapatillas);
            this.getMarcas(); 
            // 4- Invoco a la función getMarcas
        }

        getMarcas(){
            // 3- En una función a través de un forEach recorro el array zapatilla y saco todas la información dentro de la propiedad "marca", con el indexOf valido que no esten repetidas las marcas y con el push ingreso los valores al Array Marcas
            this.zapatillas.forEach((zapatilla, index) =>{
                if(this.marcas.indexOf(zapatilla.marca)< 0){
                    this.marcas.push(zapatilla.marca);
                }
            });
            console.log(this.marcas);
        }
    }

```

Utilizando el ngFor, mostraremos en la vista el Array Marcas

```html
    <ul>
        <li *ngFor="let marca of marcas; let indice = index">{{indice + "-"+marca}}</li>
    </ul>
```
> **Aplicar condicionales**
```html
    <span [ngStyle]="{
        'text-decoration': !deportiva.stock ? 'line-through' : 'none'
    }"> <!-- Condicional: si deportiva.stock es false, se aplicará el tachado sobre el producto, en caso que sea verdadero no pasará nada -->
        {{deportiva.nombre}} - <strong>{{deportiva.precio}}€</strong>
    </span>
```

## ngSwitch
Evaluará una variable o una propiedad y va a realizar una serie de casos dependiendo del valor del factor a evaluar.

Por ejemplo:
> Evaluaremos la variable 'color' del archivo "zapatillas.component.ts"

```html
<!-- En 'zapatillas.component.html' colocamos la directiva ngSwitch -->
    <p>El color de la mayoria de nuestras zapatillas es:</p>
    <ul [ngSwitch]="color">
        <li *ngSwitchCase="'yellow'"> El color predominante es el <span [ngStyle]="{'background': color}"> amarillo </span></li>
        <li *ngSwitchCase="'red'"> El color predominante es el <span [ngStyle]="{'background': color}">rojo</span></li>
        <li *ngSwitchCase="'blue'"> El color predominante es el <span [ngStyle]="{'background': color}">azul</span></li>
        <li *ngSwitchCase="'orange'"> El color predominante es el <span [ngStyle]="{'background': color}">naranja</span></li>
    </ul>

    <!-- [ngStyle] es una directiva que permite ingresar propiedades CSS como si fueran objetos json -->
```
Dependiendo del valor de *color* se efectuará cualquiera de las opciones.

---
# **TWO WAY DATA-BINDING Y EVENTO CLICK**
Hasta ahora hemos utilizado *Binding* por interpolación, obtener información de un archivo que tenemos guardado dentro de alguna carpeta. Con *TWO WAY DATA-BINDING* buscaremos agregar marcas de zapatillas.

## ¿Qué necesitamos para utilizar el **TWO WAY DATA-BINDING**?

> **IMPORTANTE:** Debemos agregar en el archivo "app.module.ts": 
> - import {FormsModule} from '@angular/forms';
> - Y luego en el array de los imports agregar *FormsModule*

Lo mencionado anteriormente nos permitirá utilizar la Directiva [(ngModel)] en los componentes.

En el archivo zapatilla.component.ts crearemos la propiedad publica mi_marca y la inicializaremos en el constructor:
> public mi_marca: string;
> constructor(){
>   this.mi_marca = 'elemento';
> }

```html
    <!--  -->
    <p>Añadir marca:</p>
    <p>
    <input type="text" [(ngModel)]="mi_marca"/>
    <button (click)="getMarca()">Mostrar Marca</button>
    </p>
    <p>{{mi_marca}}</p>
```

Utilizando un imput de tipo texto accederemos a través de la directiva [(ngModel)] a la propiedad 'mi_marca', y nos dará el poder de modificarla.

Podemos notar que al invocar la propiedad para que se muestre en la vista, podemos ver que lo que se escribe en el input se refleja en la vista casi en tiempo real.

## Agregar una nueva marca

En "zapatillas.component.ts" agregamos el método:

``` javascript 
    addMarca(){
        this.marcas.push(this.mi_marca);
    }
```

En "zapatilla.component.html" agregamos el boton:

```html
    <button (click)="addMarca()">Añadir Marca</button>
```

## EVENTO CLICK
Permite ejecutar un método al dar click en algún elemento.

Para ejemplificar este evento, haremos el ejercicio de borrar el elemento de un array.

```html
    <ul>
        <li *ngFor="let marca of marcas; let indice = index">{{indice + "-"+marca}}
            <button (click)="borrarMarca(indice)">Borrar</button>
        </li>
        
    </ul>
```

```javascript
    borrarMarca(index : number){
        // delete this.marcas[index];
        this.marcas.splice(index,1);
    }
```

## EVENTO BLUR Y KEYUP

### BLUR
Evento que se activa cuando el cursor sale del componente.

En "zapatilla.componente.html" colocamos:

> <input type="text" [(ngModel)]="mi_marca" (keyup)="onBlur()"/>

Y creamos el método "onBlur" en "zapatillas.component.ts":

```javascript
    onBlur(){
        console.log("Has salido del input");
    }
```

Con keyup podemos capturar la acción sobre una tecla y ejecutar algún método.

```html
    <input type="text" [(ngModel)]="mi_marca" (keyup.enter)="mostrarPalabra()"/>
    // Capturará la acción sobre la tecla enter.
```

## NGCLASS EN ATRIBUTOS
Nos permite asignarle a un elemento una clase cuando se cumpla una condición. Hay 2 formas de utilizar el ngClass

1. Como atributo:
```html
    <!-- Si el precio es >=80, se pondrá un estilo difirente al precio. -->
    <strong [class.altoPrecio]="deportiva.precio>= 80">{{deportiva.precio}}€</strong>
```

Para ello debemos conectar en el "index.html" principal a lo hoja de estilo css correspondiente. Pero para que la conexión sea correcta, debemos agregar la ruta de la hoja de estilo en el archivo "angular.json" en el array de "styles" y reiniciar el compilador.

```
    "styles": [
    "src/styles.css",
    "src/assets/styles.css"
    ],
```

2- Como Directiva
La ventaja de colocar el ngClass como directiva es que se pueden colocar los condicionales directamente a cada una de las clases.

```html
    <strong 
        [class.altoPrecio]="deportiva.precio>= 80"
        [ngClass]="{
            'fondoRojo': deportiva.precio > 100,
            'subrayado': deportiva.marca == 'Nike'
        }"
    >{{deportiva.precio}}€</strong>

```

## **PAGINAS Y RUTAS EN ANGULAR**
### Configurar el Routing de Angular
Buscaremos configurar el Routing de angular para conseguir una serie de rutas para cada uno de los componentes y hacer diferentes páginas en el proyecto.

Podemos hacer que un componente no sea solo un trozo de la pantalla o que tenga una funcionalidad pequeña, sino que podemos hacer que el componente sea una página web en sí.

>> 1er Paso: En el index.html debe estar presente la etiqueta: 
```html
    <base href="/">
```