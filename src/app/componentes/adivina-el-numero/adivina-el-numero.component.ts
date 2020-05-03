
import { Component, OnInit ,Input,Output,EventEmitter, OnDestroy} from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina'
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit, OnDestroy {
 @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;
  jugador 
  listadoJugadores
  usuarioLogueado

  constructor(private servicio: JuegoServiceService) { 
    this.nuevoJuego = new JuegoAdivina();
    console.info("numero Secreto:",this.nuevoJuego.numeroSecreto);  
    this.ocultarVerificar=false;

    this.usuarioLogueado = localStorage.getItem('usuario')
    servicio.traerDB('adivinaNumero').subscribe(datos => {
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
        servicio.crearDoc('adivinaNumero', this.usuarioLogueado, 'Adivina el numero')
        this.jugador = {
          gano: 0,
          perdio: 0,
          nombre: this.usuarioLogueado,
          juego: 'Adivina el numero'
        }
      }
    }, error => console.log(error))
  }

  ngOnDestroy():void{
    this.servicio.update('adivinaNumero', this.jugador)
  }

  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador=0;
  }
  verificar()
  {
    this.contador++;
    this.ocultarVerificar=true;
    console.info("numero Secreto:",this.nuevoJuego.gano);  
    if (this.nuevoJuego.verificar()){
      
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje("Sos un Genio",true);
      this.nuevoJuego.numeroSecreto=0;

    }else{

      let mensaje:string;
      switch (this.contador) {
        case 1:
          mensaje=" - No, intento fallido, animo";
          break;
          case 2:
          mensaje=" - No, te estaras acercando???";
          break;
          case 3:
          mensaje=" - No es, yo crei que la tercera era la vencida.";
          break;
          case 4:
          mensaje=" - No era el  "+this.nuevoJuego.numeroIngresado;
          break;
          case 5:
          mensaje=" intentos y nada.";
          break;
          case 6:
          mensaje=" - Afortunado en el amor";
          break;
      
        default:
            mensaje="Ya le erraste "+ this.contador+" veces";
          break;
      }
      this.MostarMensaje(this.contador+" "+mensaje+". AYUDA : "+this.nuevoJuego.retornarAyuda());
     

    }
    console.info("numero Secreto:",this.nuevoJuego.gano);  
  }  

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        this.jugador.gano++
        x.className = "show Ganador";
      }else{
        this.jugador.perdio++
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar=false;
     }, 4000);
    console.info("objeto",x);
  
   }  
  ngOnInit() {
  }

}
