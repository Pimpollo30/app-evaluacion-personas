import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {


  editForm: FormGroup = new FormGroup({}); //Esta variable nos permitirá agrupar los elementos del formulario dentro de una forma
  enviado = false;  //Esta variable se utiliza para saber si el formulario se ha enviado

  sexos:any = [{id:0,valor:'Hombre'} ,{id:1,valor:'Mujer'}]; //Arreglo que contiene los tipos de sexo que contendrá el select del campo 'Sexo'
  estatuses:any = [{id:0,valor:'Activo'},{id:1,valor:'Inactivo'}]; //Arreglo que contiene los tipos de estatus que contendrá el select del campo 'Estatus'
  personas_tipo:any = [{id:0,valor:'Usuario Normal'},{id:1,valor:'Administrador'}]; //Arreglo que contiene los tipos de persona que contendrá el select del campo 'Persona Tipo'

  constructor(
    public formBuilder:FormBuilder,  //Este FormBuilder nos permitirá construir un formulario en base al FormGroup 'personaForm'
    private router:Router,  //Este Router nos permitirá la navegación entre páginas dentro de Angular
    private ngZone:NgZone,  //Este NgZone nos permitirá la ejecución de tareas asíncronas
    private personaService: PersonaService, //Se declara nuestro servicio que nos permitirá acceder a los métodos que nos permitirá consumir nuestra API o backend
    private actRoute: ActivatedRoute // Este ActivatedRoute nos permitirá recueprar la información sobre la ruta y sus parámetros enviados
  ) { }

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPersona(id);
  }

  mainForm() { //Este método realiza la construcción del formulario para establecer los valores predeterminados y sus respectivas validaciones
    this.editForm = this.formBuilder.group({
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
    return this.editForm.controls;
  }


  getPersona(id:any) { //Método que permite obtener los datos del registro a editar a fin de colocarlos dentro del fomrulario
    this.personaService.getPersona(id).subscribe((data:any) => {
      this.editForm.setValue({
        nombre:  data['Nombre'],
        ape_pat:  data['Ape_Pat'],
        ape_mat:  data['Ape_Mat'],
        rfc:  data['RFC'],
        curp:  data['CURP'],
        fec_nac:  data['Fecha_Nacimiento'],
        estatus_id:  data['Estatus_Id'],
        sexo_id:  data['Sexo_Id'] == null ? '' : data['Sexo_Id'],
        persona_tipo_id:  data['Persona_Tipo_Id'],
        avatar:  data['Avatar'],
      })
    })
  }
//Actualizar el estatus del select
actualizarEstatus(d:string) {
  this.editForm.get('estatus_id')?.setValue(d,{
    onlySelf:true,
  });
}

//Actualizar el sexo del select
actualizarSexo(d:string) {
  this.editForm.get('sexo_id')?.setValue(d,{
    onlySelf:true,
  });
}

//Actualizar el tipo de persona del select
actualizarPersonaTipo(d:string) {
  this.editForm.get('persona_tipo_id')?.setValue(d,{
    onlySelf:true,
  });
}

  //Método que se ejecuta cuando el usuario envía el formulario
  onSubmit() {
    this.enviado = true;
    if (!this.editForm.valid) {
      return false;
    }else {
      if (window.confirm('¿Estás seguro que deseas modificar?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.personaService.updatePersona(id,this.editForm.value).subscribe({ //Se invoca el método 'updatePersona' del servicio que actualizará los datos a la base de datos
          complete: () => {
            this.router.navigateByUrl('/listar-personas'); //Se redirige a la página que muestra el listado de las personas
          },
          error: (e) => {
            console.log(e);
          }
        });
      }
    }
    return true;
  }

}
