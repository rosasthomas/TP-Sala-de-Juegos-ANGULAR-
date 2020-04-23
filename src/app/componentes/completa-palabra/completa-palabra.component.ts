import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-completa-palabra',
  templateUrl: './completa-palabra.component.html',
  styleUrls: ['./completa-palabra.component.css']
})
export class CompletaPalabraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.index = null;
  }

   palabras: string[] = [ 'humano','persona','gente','hombre','mujer','bebe','ladrillo', 'espejo',
    'adolescente','adulto', 'adulta','anciano', 'anciana', 'muslo','cabeza','cara',
    'boca','labio','diente','ojo','nariz','barba','bigote','cabello','oreja','cerebro',
    'estomago', 'brazo', 'matrimonio', 'amor', 'padre', 'madre', 'hermano', 'hermana',
    'hijo', 'hija', 'abuelo', 'abuela', 'bisabuelo', 'bisabuela', 'nieto', 'nieta', 'conejo',
    'dragon', 'ciervo', 'rana', 'leon', 'jirafa', 'elefante', 'pajaro', 'gallina',
   'gorrion', 'cuervo', 'aguila'  ]

   letraCorrecta : string;
  index:number;
   contador : number = 0;
   getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

   empezar(){
     $("#empezar").attr("hidden", "true");
     $("#pal, #contador, #ingreso").removeAttr('hidden');
    let pal;
     do{
      pal = this.getRandomInt(0, this.palabras.length);
     }while(pal == this.index)
     this.index = pal;
      let palabraElegida = this.palabras[pal];
      let guion = this.getRandomInt(0, palabraElegida.length);
      let splitPalabra = palabraElegida.split("");
      this.letraCorrecta = splitPalabra[guion]
      splitPalabra[guion] = '_'
      palabraElegida = splitPalabra.join("");
      $("#palabra").text(palabraElegida);
   }

   comprobar(){
    $("#errorCom").attr('hidden', 'true');
     let letra = $("#completa").val();
     if(letra == this.letraCorrecta){
       this.letraCorrecta = null;
       this.contador++;
       console.log(this.contador)
       $("#cont").text(this.contador);
       $("#completa").val('');
       this.empezar();
     }
     else{
       $("#errorCom").removeAttr('hidden');
     }
   }
}
