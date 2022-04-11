import { Component, OnInit } from "@angular/core";
import { Zapatilla } from "../models/zapatillas";

@Component({
    selector: 'zapatillas',
    templateUrl: './zapatillas.component.html'
})

export class ZapatillasComponent implements OnInit{
    public titulo: string = "Componente de Zapatillas"
    public zapatillas: Array<Zapatilla>;

    constructor(){
        this.zapatillas = [
            new Zapatilla('Nike Airmax', 'Nike', 'Blancas', 40, true),
            new Zapatilla('Reebook Clasic', 'Reebok', 'Blanco', 80, true),
            new Zapatilla('Nike Runner MD', 'Nike', 'Negras', 60, true),
            new Zapatilla('Adidas Yezzy', 'Adidas', 'Azul', 180, false)
        ];
    }

    ngOnInit(): void {
        console.log(this.zapatillas);
    }
}