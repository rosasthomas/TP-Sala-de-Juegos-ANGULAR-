import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as $ from 'jquery'
import { Jugador } from '../../clases/jugador';
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  usuarios:any;

  constructor( firesdb: AngularFirestore, public route:Router) {
    this.usuarios = firesdb.collection('usuarios');

   }

   item:any = { nombre:'', clave:''}
  ngOnInit() {
  }

  agregar(){
    $("#error").attr('hidden', true);
    $("#avatar").removeAttr('hidden');
    this.item.nombre = $("#usuario").val();
    this.item.clave = $("#passw").val()
    let secPass = $("#secPass").val()
    if(this.item.clave == secPass){
      this.usuarios.add(this.item)
      this.route.navigate(['/Principal'])
    }
    else{
      $("#avatar").attr('hidden', true);
      $("#error").removeAttr('hidden');
    }
  }

}
