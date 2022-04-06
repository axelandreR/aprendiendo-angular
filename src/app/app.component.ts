import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Master en JavaScript';
  public mostrar_videojuegos: boolean = true;

  ocultarVideojuegos(value:boolean){
    this.mostrar_videojuegos = value;
  }
}
