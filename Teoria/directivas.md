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