import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-completa-palabra',
  templateUrl: './completa-palabra.component.html',
  styleUrls: ['./completa-palabra.component.css']
})
export class CompletaPalabraComponent implements OnInit, OnDestroy {

  jugador 
  listadoJugadores
  usuarioLogueado
  constructor(private servicio: JuegoServiceService) { 
    this.usuarioLogueado = localStorage.getItem('usuario')
    servicio.traerDB('completaPalabra').subscribe(datos => {
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
        servicio.crearDoc('completaPalabra', this.usuarioLogueado, 'Completa la palabra')
        this.jugador = {
          gano: 0,
          perdio: 0,
          nombre: this.usuarioLogueado,
          juego: 'Completa la palabra'
        }
      }
    }, error => console.log(error))
  }

  ngOnDestroy():void{
    this.servicio.update('completaPalabra', this.jugador)
  }


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
     $("#completa").focus()
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
       this.jugador.gano++
       this.letraCorrecta = null;
       this.contador++;
       $("#cont").text(this.contador);
       $("#completa").val('');
       this.empezar();
     }
     else{
       this.jugador.perdio++
       $("#errorCom").removeAttr('hidden');
     }
   }
}
