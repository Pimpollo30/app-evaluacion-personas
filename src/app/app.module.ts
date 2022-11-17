import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarPersonaComponent } from './pages/agregar-persona/agregar-persona.component';
import { EditarPersonaComponent } from './pages/editar-persona/editar-persona.component';
import { ListarPersonasComponent } from './pages/listar-personas/listar-personas.component';
import { HeaderComponent } from './pages/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    AgregarPersonaComponent,
    EditarPersonaComponent,
    ListarPersonasComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
