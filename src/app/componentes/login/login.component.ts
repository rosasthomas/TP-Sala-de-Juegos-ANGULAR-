import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Subscription} from "rxjs";
import { timer } from "rxjs";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  usuario = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  myForm:FormGroup
  usuarios: Observable<any[]>;
  lista:any[]

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

      this.usuarios = firestore.collection('usuarios').valueChanges();
      this.usuarios.subscribe(usuarios => this.lista = usuarios, error => console.log(error))
  

      this.myForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
  }

  ngOnInit() {
  }

  Entrar() {
    let flag = false;
    for (let usuario of this.lista){
      if(usuario.nombre == this.usuario && usuario.clave == this.clave){
        flag=true;
        localStorage.setItem('usuario', usuario.nombre)
        this.router.navigate(['/Principal'])
        break;
      }
    }
    if (!flag) {  
      this.logeando=true;
      this.progresoMensaje="esperando..."; 

      this.progreso=0;
      this.ProgresoDeAncho="0%";
        $("#avatar").attr("hidden", true);
        $("#errorUser").removeAttr("hidden");
    }
  }

  saveData(){
    $("#avatar").removeAttr("hidden");
    $("#errorUser").attr("hidden", true);
    this.usuario = this.myForm.value.email;
    this.clave = this.myForm.value.password;
    this.MoverBarraDeProgreso()
  }

  MoverBarraDeProgreso() {
    
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="NSA spy..."; 
    let timers = timer(200, 50);
    this.subscription = timers.subscribe(t => {
      console.log("inicio");
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje="Verificando ADN..."; 
          break;
        case 30:
          this.clase="progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje="Adjustando encriptación.."; 
          break;
          case 60:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando Info del dispositivo..";
          break;
          case 75:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Recompilando claves facebook, gmail, chats..";
          break;
          case 85:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          this.progresoMensaje="Instalando KeyLogger..";
          break;
          
        case 100:
          console.log("final");
          this.subscription.unsubscribe();
          this.Entrar();
          break;
      }     
    });
    //this.logeando=true;
  }

}