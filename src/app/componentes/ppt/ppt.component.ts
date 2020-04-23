import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PPTComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  eleccion(value:string){
    $("#subtitulo, #elegir").attr('hidden', true);
    $("#versus").removeAttr('hidden');
    let srcVos;
    switch (value) {
      case 'piedra':
        srcVos = "../../../assets/icons/icons8-hand-rock-100.png";
        break;
      case 'papel':
        srcVos = "../../../assets/icons/icons8-hand-100.png";
        break;
      case 'tijera':
        srcVos = "../../../assets/icons/icons8-hand-scissors-100.png";
        break;
    }
    $("#fotoVos").attr('src', srcVos);
    let cpu = this.getRandomInt(1,4);
    let src;
    switch (cpu) {
      case 1:
        src = "../../../assets/icons/icons8-hand-rock-100.png";
        break;
      case 2:
        src = "../../../assets/icons/icons8-hand-100.png";
        break;
      case 3:
        src = "../../../assets/icons/icons8-hand-scissors-100.png";
        break;
    }
    $("#foto").attr('src', src);

    let resul = 'empate';
    if(value == 'piedra' && cpu == 2){
      resul = 'perdiste';
    }
    else if(value == 'piedra' && cpu == 3){
      resul = 'ganaste';
    }
    else if(value == 'papel' && cpu == 3){
      resul = 'perdiste';
    }
    else if(value == 'papel' && cpu == 1){
      resul = 'ganaste';
    }
    else if(value == 'tijera' && cpu == 1){
      resul = 'perdiste';
    }
    else if(value == 'tijera' && cpu == 2){
      resul = 'ganaste';
    }

    setTimeout(() => {
      $("#spin").attr("hidden", true);
      $("#foto").removeAttr('hidden');
      if(resul == 'ganaste'){
        $("#win").removeAttr('hidden');
      }
      else if(resul == 'perdiste'){
        $("#loss").removeAttr('hidden');
      }
      else if(resul == 'empate'){
        $("#draw").removeAttr('hidden');
      }
      setTimeout(() => {
        $("#versus, #win, #loss, #draw, #foto").attr('hidden', true);
        $("#subtitulo, #elegir, #spin").removeAttr('hidden');
      }, 4000);
    }, 2000);
  }
}
