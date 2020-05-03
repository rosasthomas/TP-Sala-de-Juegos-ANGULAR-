import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:Array<any>=[]
    constructor(private servicio:JuegoServiceService) {
      servicio.traerDB('anagrama').subscribe((datos) => {
        for (let jugador of datos) {
          this.listado.push(jugador)
        }
      });
      servicio.traerDB('tateti').subscribe((datos) => {
        let lista:any = datos
        for (let jugador of lista) {
          let flag= false;
          for (let usuario of this.listado) {
            if(usuario.nombre == jugador.nombre){
              usuario.gano+= jugador.gano;
              usuario.perdio+= jugador.perdio
              flag = true
              break;
            }
            
          }
          if(!flag){
            this.listado.push(jugador)
          }
        }
      });
      servicio.traerDB('ppt').subscribe((datos) => {
        let lista:any = datos
        for (let jugador of lista) {
          let flag= false;
          for (let usuario of this.listado) {
            if(usuario.nombre == jugador.nombre){
              usuario.gano+= jugador.gano;
              usuario.perdio+= jugador.perdio
              flag = true
              break;
            }
            
          }
          if(!flag){
            this.listado.push(jugador)
          }
        }
      });
      servicio.traerDB('adivinaNumero').subscribe((datos) => {
        let lista:any = datos
        for (let jugador of lista) {
          let flag= false;
          for (let usuario of this.listado) {
            if(usuario.nombre == jugador.nombre){
              usuario.gano+= jugador.gano;
              usuario.perdio+= jugador.perdio
              flag = true
              break;
            }
            
          }
          if(!flag){
            this.listado.push(jugador)
          }
        }
      });
      servicio.traerDB('completaPalabra').subscribe((datos) => {
        let lista:any = datos
        for (let jugador of lista) {
          let flag= false;
          for (let usuario of this.listado) {
            if(usuario.nombre == jugador.nombre){
              usuario.gano+= jugador.gano;
              usuario.perdio+= jugador.perdio
              flag = true
              break;
            }
            
          }
          if(!flag){
            this.listado.push(jugador)
          }
        }
      });
      servicio.traerDB('aritmetica').subscribe((datos) => {
        let lista:any = datos
        for (let jugador of lista) {
          let flag= false;
          for (let usuario of this.listado) {
            if(usuario.nombre == jugador.nombre){
              usuario.gano+= jugador.gano;
              usuario.perdio+= jugador.perdio
              flag = true
              break;
            }
            
          }
          if(!flag){
            this.listado.push(jugador)
          }
        }
      });
    }
    


  ngOnInit() {
  }

}
