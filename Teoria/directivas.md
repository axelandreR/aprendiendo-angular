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