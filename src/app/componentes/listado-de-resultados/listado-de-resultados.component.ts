
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 listado:Array<any>=[];


  constructor(private servicio:JuegoServiceService) {
    servicio.traerDB('tateti').subscribe((datos) => {
      for (let jugador of datos) {
        this.listado.push(jugador)
      }
    });
    servicio.traerDB('anagrama').subscribe((datos) => {
      for (let jugador of datos) {
        this.listado.push(jugador)
      }
    });
    servicio.traerDB('ppt').subscribe((datos) => {
      for (let jugador of datos) {
        this.listado.push(jugador)
      }
    });
    servicio.traerDB('adivinaNumero').subscribe((datos) => {
      for (let jugador of datos) {
        this.listado.push(jugador)
      }
    });
    servicio.traerDB('completaPalabra').subscribe((datos) => {
      for (let jugador of datos) {
        this.listado.push(jugador)
      }
    });
    servicio.traerDB('aritmetica').subscribe((datos) => {
      for (let jugador of datos) {
        this.listado.push(jugador)
      }
    });
    
   }

  ngOnInit() {

  }

  ver() {
    
  }

}
