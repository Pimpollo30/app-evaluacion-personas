import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUri: string = 'http://localhost/API_crud';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http: HttpClient) { }

    //Método para agregar una neuva persona a la base de datos
    agregarPersona(data:any) {
      let formData = new FormData(); //Se crea un FormData que contendrá todos los valores del formulario que el usuario haya escrito
      for ( var key in data ) {
        formData.append(key, data[key]);
      }
      let url = `${this.baseUri}/?accion=create`;
      return this.http.post(url, formData);
    }

    //Método para obtener todos los registros de las personas de la base de datos
    getPersonas() {
      return this.http.get(`${this.baseUri}/`);
    }
    
    //Método para obtener el registro de una persona en específico por medio de su ID
    getPersona(id:string) {
      let url = `${this.baseUri}/?accion=read&id=${id}`;
      return this.http.get(url, {headers: this.headers});
    }
    
    //Método para actualizar la información de una persona en la base de datos por medio de su ID
    updatePersona(id:any,data:any) {
      let url = `${this.baseUri}/?accion=update`;
      let formData = new FormData(); //Se crea un FormData que contendrá todos los valores del formulario que el usuario haya escrito
      for ( var key in data ) {
        formData.append(key, data[key]);
      }
      formData.append("id",id); //Se agrega al FormData el ID del registro a actualizar
      return this.http.post(url, formData);
    }
  
    //Método para eliminar el registro de la persona de la base de datos
    deletePersona(id:any) {
      let url = `${this.baseUri}/?accion=delete&id=${id}`;
      return this.http.get(url, {headers: this.headers});
    }

}
