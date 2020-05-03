import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery'
import { Router } from '@angular/router';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit, OnDestroy {

  contJugados = 0;
  celdas : number[][] = [[0,0,0],[0,0,0],[0,0,0]];
  jugador 
  listadoJugadores
  usuarioLogueado
  constructor(private route:Router, private servicio: JuegoServiceService) { 
    this.usuarioLogueado = localStorage.getItem('usuario')
    servicio.traerDB('tateti').subscribe(datos => {
      this.listadoJugadores = datos
      let flag = false;
      for (let usuario of this.listadoJugadores) {
        if(usuario.nombre == this.usuarioLogueado){
          this.jugador = usuario
          flag = true
          break;
        }
      }
      if(!flag){
        servicio.crearDoc('tateti', this.usuarioLogueado, 'Ta Te Ti')
        this.jugador = {
          gano: 0,
          perdio: 0,
          nombre: this.usuarioLogueado,
          juego: 'Ta Te Ti'
        }
      }
    }, error => console.log(error))
  }

  ngOnInit(): void {

  }

  ngOnDestroy():void{
    this.servicio.update('tateti', this.jugador)
  }

  seleccionarMaquina()
  {
    let i
    let x
    do{
      i = Math.floor(Math.random() * (3-0) + 0);
      x = Math.floor(Math.random() * (3-0) + 0);
    }while(!this.validar(i,x,'o'))
  }

  seleccionarJugador(fila : number, columna : number, jug : string)
  {
    if(this.validar(fila,columna,jug)){
        this.mensajes('Turno de la maquina')
        if(this.validarVictoria() == '¡GANASTE!'){
          this.mensajes('gano')
        }
        else if(this.contJugados < 8)
        {
          this.esperarMaquina();
        }
        else{
          this.mensajes('empate')
        }

    }
    
  }

  retry(){
    this.contJugados =0;
    this.mensajes('Es tu turno')
    for(let i = 0; i < 3 ; i++)
    {
      for(let x = 0; x < 3 ; x++)
      {
         this.celdas[i][x] = 0;
         $(`#cell${i}${x}`).text('');
         $(`#cell${i}${x}`).removeClass('jugador');
         $(`#cell${i}${x}`).removeClass('maquina');
      }
    }
  }

  mensajes(value:string){
    if(value == 'gano'){
      this.jugador.gano++
      $("#tateti").addClass('termino')
      $("#msj").addClass('gano')
      $("#spmsj").text('Muy bien ganaste!')
      setTimeout(() => {
        $("#tateti").removeClass('termino')
        $("#msj").removeClass('gano')
        this.retry()
      }, 3000);
    }
    else if(value == 'perdio'){
      this.jugador.perdio++
      $("#tateti").addClass('termino')
      $("#msj").addClass('perdio')
      $("#spmsj").text('Suerte la proxima')
      setTimeout(() => {
        $("#tateti").removeClass('termino')
        $("#msj").removeClass('perdio')
        this.retry()
      }, 3000);

    }
    else if(value == 'empate'){
      $("#tateti").addClass('termino')
      $("#spmsj").text('Empataron!!')
      setTimeout(() => {
        $("#tateti").removeClass('termino')
        this.retry()
      }, 3000);
    }
    else{
      $("#spmsj").text(value)
    }
  }

  esperarMaquina()
  {
    $("#tateti").addClass("disabled");
    setTimeout(() => {
      this.seleccionarMaquina();
      $("#tateti").removeClass("disabled");
      if(this.validarVictoria() == '¡PERDISTE!'){
        this.mensajes('perdio')
      }
      else{
        this.mensajes('Es tu turno')

      }
    },2500);
  }

  validar(fila, columna, jug) : boolean
  {
    let retorno = false;
 
    if(this.celdas[fila][columna] == 0)
    {
      retorno = true;
      if(jug == 'x')
      {
        $(`#cell${fila}${columna}`).addClass("jugador");
        $(`#cell${fila}${columna}`).text("X");
        this.celdas[fila][columna] = 1;
      }
      else{
        $(`#cell${fila}${columna}`).addClass("maquina");
        $(`#cell${fila}${columna}`).text("O");
        this.celdas[fila][columna] = 2;
      }

      this.contJugados++;
    }

    return retorno;
  }

  validarVictoria() : string
  {
    let retorno = "";

    if(this.celdas[0][0] == 1 && this.celdas[0][1] == 1 && this.celdas[0][2] == 1){
      retorno = "¡GANASTE!";
    }
    else if(this.celdas[1][0] == 1 && this.celdas[1][1] == 1 && this.celdas[1][2] == 1){
      retorno = "¡GANASTE!";
    }
    else if(this.celdas[2][0] == 1 && this.celdas[2][1] == 1 && this.celdas[2][2] == 1){
      retorno = "¡GANASTE!";
    }
    else if(this.celdas[0][0] == 1 && this.celdas[1][0] == 1 && this.celdas[2][0] == 1){
      retorno = "¡GANASTE!";
    }
    else if(this.celdas[0][1] == 1 && this.celdas[1][1] == 1 && this.celdas[2][1] == 1){
      retorno = "¡GANASTE!";
    }
    else if(this.celdas[0][2] == 1 && this.celdas[1][2] == 1 && this.celdas[2][2] == 1){
      retorno = "¡GANASTE!";
    }
    else if(this.celdas[0][0] == 1 && this.celdas[1][1] == 1 && this.celdas[2][2] == 1){
      retorno = "¡GANASTE!";
    }
    else if(this.celdas[0][2] == 1 && this.celdas[1][1] == 1 && this.celdas[2][0] == 1){
      retorno = "¡GANASTE!";
    } //JUGADOR
    else if(this.celdas[0][0] == 2 && this.celdas[0][1] == 2 && this.celdas[0][2] == 2){
      retorno = "¡PERDISTE!";
    }
    else if(this.celdas[1][0] == 2 && this.celdas[1][1] == 2 && this.celdas[1][2] == 2){
      retorno = "¡PERDISTE!";
    }
    else if(this.celdas[2][0] == 2 && this.celdas[2][1] == 2 && this.celdas[2][2] == 2){
      retorno = "¡PERDISTE!";
    }
    else if(this.celdas[0][0] == 2 && this.celdas[1][0] == 2 && this.celdas[2][0] == 2){
      retorno = "¡PERDISTE!";
    }
    else if(this.celdas[0][1] == 2 && this.celdas[1][1] == 2 && this.celdas[2][1] == 2){
      retorno = "¡PERDISTE!";
    }
    else if(this.celdas[0][2] == 2 && this.celdas[1][2] == 2 && this.celdas[2][2] == 2){
      retorno = "¡PERDISTE!";
    }
    else if(this.celdas[0][0] == 2 && this.celdas[1][1] == 2 && this.celdas[2][2] == 2){
      retorno = "¡PERDISTE!";
    }
    else if(this.celdas[0][2] == 2 && this.celdas[1][1] == 2 && this.celdas[2][0] == 2){
      retorno = "¡PERDISTE!";
    }
    
    return retorno;
  }

}
