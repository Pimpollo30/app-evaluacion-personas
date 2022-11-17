import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-listar-personas',
  templateUrl: './listar-personas.component.html',
  styleUrls: ['./listar-personas.component.css']
})
export class ListarPersonasComponent implements OnInit {

  personas:any = []; //Arreglo que contendrá los registros de la base de datos
  sexos:any = [{id:0,valor:'Hombre'} ,{id:1,valor:'Mujer'}]; //Arreglo que contiene los tipos de sexo que contendrá el select del campo 'Sexo'
  estatuses:any = [{id:0,valor:'Activo'},{id:1,valor:'Inactivo'}]; //Arreglo que contiene los tipos de estatus que contendrá el select del campo 'Estatus'
  personas_tipo:any = [{id:0,valor:'Usuario Normal'},{id:1,valor:'Administrador'}]; //Arreglo que contiene los tipos de persona que contendrá el select del campo 'Persona Tipo'

  
  constructor(private personaService:PersonaService) {
    this.getPersonas();
  }

  ngOnInit(): void {
  }


  //Método para obtener todos los los registros de las personas de la base de datos
  getPersonas() {
    this.personaService.getPersonas().subscribe((data:any) => {
      this.personas = data;
    });
  }

    //Método para eliminar una persona de la base de datos
    eliminarPersona(persona:any, index:any) {
      if (window.confirm("¿Estás seguro que lo deseas eliminar?")) {
        this.personaService.deletePersona(persona.Id).subscribe((data:any) => {
          this.personas.splice(index,1);
        });
      }
    }

}
