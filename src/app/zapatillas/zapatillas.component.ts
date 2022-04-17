import { Component, OnInit } from "@angular/core";
import { Zapatilla } from "../models/zapatilla";

@Component({
    selector: 'zapatillas',
    templateUrl: './zapatillas.component.html'
})

export class ZapatillasComponent implements OnInit{
    public titulo: string = "Componente de Zapatillas"
    public zapatillas: Array<Zapatilla>;
    public marcas: String[];
    public color: string;
    public mi_marca: string;

    constructor(){
        this.mi_marca = 'Fila';
        this.color = 'blue';
        this.marcas = new Array;
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
    }

    getMarcas(){
        
        this.zapatillas.forEach((zapatilla, index) =>{
            if(this.marcas.indexOf(zapatilla.marca)< 0){
                this.marcas.push(zapatilla.marca);
            }
        });
        console.log(this.marcas);
    }

    getMarca(){
        alert(this.mi_marca);
    }

    addMarca(){
        this.marcas.push(this.mi_marca);
    }

    borrarMarca(index : number){
        // delete this.marcas[index];
        this.marcas.splice(index,1);
    }

    onBlur(){
        console.log("Has salido del input");
    }

    mostrarPalabra(){
        alert(this.mi_marca);
    }
}