import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery'
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit, OnDestroy {

  listaPalabras:string[] = ['habian','usted','estados','hizo','nadie','paises','horas','posible','tarde','ley','importante',       
                       'guerra','desarrollo','proceso','realidad','sentido','lado','cambio','mano','eran','estar','numero',
                       'sociedad','unas','centro','padre','gente','final','relacion','cuerpo','obra','incluso','ultimo', 
                       'madre','modo','problemas','cinco','carlos','hombres','informacion','ojos','muerte','nombre',    
                       'algunas','publico','mujeres','siglo','todavia','meses','esos','nosotros','hora','muchas','pueblo', 
                       'alguna','problema','derecho','verdad','maria','unidos','podria','seria','junto','cabeza', 'aquel',
                       'luis','cuanto','tierra','equipo','segundo','director','dicho','cierto','casos','manos','nivel','podia',
                       'familia','largo','partir','falta','llegar','propio'];
  palabraCorrecta:string
  contador = 0
  jugador 
  listadoJugadores
  usuarioLogueado

  constructor(private servicio: JuegoServiceService) {
    this.usuarioLogueado = localStorage.getItem('usuario')
    servicio.traerDB('anagrama').subscribe(datos => {
      this.listadoJugadores = datos
      let flag = false;
      for (let usuario of this.listadoJugadores) {
        if(usuario.nombre == this.usuarioLogueado){
          this.jugador = usuario
          flag = true
          break;
        }
      }
      if(!flag){console.log('asd')
        servicio.crearDoc('anagrama', this.usuarioLogueado, 'Anagrama')
        this.jugador = {
          gano: 0,
          perdio: 0,
          nombre: this.usuarioLogueado,
          juego: 'Anagrama'
        }
      }
    }, error => console.log(error))
   }

  ngOnInit() {
  }

  ngOnDestroy():void{
    this.servicio.update('anagrama', this.jugador)
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  desordenarPalabra()
  {
    let palabra = this.listaPalabras[this.getRandomInt(0,83)],resultado = "";
    let zz,azar;
    this.palabraCorrecta = palabra;
    for (zz=palabra.length ;zz>=1;zz--){
        azar = (Math.random()* zz + 1) ;
        resultado = resultado + palabra.substring(azar-1,azar);
        palabra =  palabra.substring(0,azar-1)+palabra.substring(azar,zz);
    }
    
    return resultado;
  }

  empezar(){
    $("#empezar").attr("hidden", "true");
    $("#pal, #contador, #ingreso").removeAttr('hidden');
    $("#completa").focus()
    let juego = this.desordenarPalabra()
    $("#palabra").text(juego);
  }

  comprobar(){
    $("#errorCom").attr('hidden', 'true');
     let letra = $("#completa").val();
     if(letra == this.palabraCorrecta ){
       this.jugador.gano++
       this.palabraCorrecta  = null;
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

