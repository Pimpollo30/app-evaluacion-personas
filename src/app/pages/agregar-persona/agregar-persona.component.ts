import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-agregar-persona',
  templateUrl: './agregar-persona.component.html',
  styleUrls: ['./agregar-persona.component.css']
})
export class AgregarPersonaComponent implements OnInit {
  
  personaForm: FormGroup = new FormGroup({}); //Esta variable nos permitirá agrupar los elementos del formulario dentro de una forma
  enviado = false; //Esta variable se utiliza para saber si el formulario se ha enviado
  
  sexos:any = [{id:0,valor:'Hombre'} ,{id:1,valor:'Mujer'}]; //Arreglo que contiene los tipos de sexo que contendrá el select del campo 'Sexo'
  estatuses:any = [{id:0,valor:'Activo'},{id:1,valor:'Inactivo'}]; //Arreglo que contiene los tipos de estatus que contendrá el select del campo 'Estatus'
  personas_tipo:any = [{id:0,valor:'Usuario Normal'},{id:1,valor:'Administrador'}]; //Arreglo que contiene los tipos de persona que contendrá el select del campo 'Persona Tipo'
  
  constructor(
    public formBuilder:FormBuilder,  //Este FormBuilder nos permitirá construir un formulario en base al FormGroup 'personaForm'
    private router:Router,  //Este Router nos permitirá la navegación entre páginas dentro de Angular
    private ngZone:NgZone,  //Este NgZone nos permitirá la ejecución de tareas asíncronas
    private personaService: PersonaService //Se declara nuestro servicio que nos permitirá acceder a los métodos que nos permitirá consumir nuestra API o backend
    ) { }
    
    ngOnInit(): void {
      this.mainForm();
    }
    
    mainForm() { //Este método realiza la construcción del formulario para establecer los valores predeterminados y sus respectivas validaciones
      this.personaForm = this.formBuilder.group({
        nombre: ['',[Validators.required]],
        ape_pat: ['',[Validators.required]],
        ape_mat: [''],
        rfc: ['',[Validators.required]],
        curp: ['',[Validators.required]],
        fec_nac: [''],
        estatus_id: ['',[Validators.required]],
        sexo_id: [''],
        persona_tipo_id: ['',[Validators.required]],
        avatar: [''],
      });
    }
    
    get myForm() { //Getter que permite acceder al FormControl
      return this.personaForm.controls;
    }
    
    //Actualizar el estatus del select
    actualizarEstatus(d:string) {
      this.personaForm.get('estatus_id')?.setValue(d,{
        onlySelf:true,
      });
    }
    
    //Actualizar el sexo del select
    actualizarSexo(d:string) {
      this.personaForm.get('sexo_id')?.setValue(d,{
        onlySelf:true,
      });
    }
    
    //Actualizar el tipo de persona del select
    actualizarPersonaTipo(d:string) {
      this.personaForm.get('persona_tipo_id')?.setValue(d,{
        onlySelf:true,
      });
    }
    
    //Método que se ejecuta cuando se envía el formulario
    onSubmit() {
      this.enviado = true;
      if (!this.personaForm.valid) {
        return false;
      }else {
        return this.personaService.agregarPersona(this.personaForm.value).subscribe({ //Se invoca el método 'agregarPersona' del servicio que agregará los datos a la base de datos
          complete: () => {
            this.ngZone.run(() => this.router.navigateByUrl('/listar-personas')); //Se redirige a la página que muestra el listado de las personas
          },
          error: (e) => {
            console.log(e);
          }
        });
      }
    }
  }
  