import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class JuegoServiceService {

  constructor(private firestore: AngularFirestore){

  }

  traerDB(value:string){
    return this.firestore.collection(value).valueChanges();;
  }

  crearDoc(db:string, nombre:string, juego:string){
    this.firestore.collection(db).doc(nombre).set(
      {
        gano: 0,
        perdio: 0,
        nombre: nombre,
        juego: juego
      }
    )
  }

  update(db:string, jugador){
    this.firestore.collection(db).doc(jugador.nombre).update(jugador)
  }
}
