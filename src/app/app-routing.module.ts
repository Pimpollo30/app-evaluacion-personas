import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPersonaComponent } from './pages/agregar-persona/agregar-persona.component';
import { EditarPersonaComponent } from './pages/editar-persona/editar-persona.component';
import { ListarPersonasComponent } from './pages/listar-personas/listar-personas.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'listar-personas' },
  { path: 'agregar-persona', component: AgregarPersonaComponent},
  { path: 'listar-personas', component: ListarPersonasComponent},
  { path: 'editar-persona/:id', component: EditarPersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
