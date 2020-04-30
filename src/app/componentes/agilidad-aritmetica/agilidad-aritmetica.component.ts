import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import * as $ from 'jquery'
import {Subscription} from "rxjs";
import { timer } from "rxjs";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  private subscription: Subscription;
  ngOnInit() {
  }
   constructor() {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  CrearCuenta(){
    let numeroUno = this.getRandomInt(1,100)
    let numeroDos = this.getRandomInt(1,100)
    let operador = this.getRandomInt(1,4)
    let operadorString
    let resultado
    switch(operador){
      case 1:
        operadorString = '+'
        resultado = numeroUno + numeroDos
      break;
      case 2:
        operadorString = '-'
        resultado = numeroUno - numeroDos
      break;
      case 3:
        operadorString = '*'
        resultado = numeroUno * numeroDos
      break;
      case 4:
        operadorString = '/'
        resultado = numeroUno / numeroDos
      break;
    }
    let retorno = {uno: numeroUno, dos: numeroDos, operador: operadorString, resul: resultado}
    return retorno
  }

  NuevoJuego() {
    $("#respuesta").val('')
    $("#gano").attr('hidden', true)
    $("#perdio").attr('hidden', true)
    $("#respuesta").focus()

    this.nuevoJuego.gano = false
    let cuenta = this.CrearCuenta()
    this.ocultarVerificar=false;
    $("#uno").text(cuenta.uno)
    $("#dos").text(cuenta.dos)
    $("#op").text(cuenta.operador)

    this.repetidor = setInterval(()=>{ 

      this.Tiempo--;
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar(cuenta.resul);
        this.ocultarVerificar=true;
        this.Tiempo=5;
      }
      }, 900);

  }
  verificar(value)
  {
    this.ocultarVerificar=false;
    let respuesta = $("#respuesta").val()
    if(respuesta == value){
      $("#gano").removeAttr('hidden')
    }
    else{
      $("#perdio").removeAttr('hidden')
    }
  }

}