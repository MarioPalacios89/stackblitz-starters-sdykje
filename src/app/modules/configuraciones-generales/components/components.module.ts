import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MaterialModule } from 'app/material/material.module';
import { ModalGestionarCronogramaAnualComponent } from './modals/modal-gestionar-cronograma-anual/modal-gestionar-cronograma-anual.component';
import { ModalGestionarCronogramaPlanillaComponent } from './modals/modal-gestionar-cronograma-planilla/modal-gestionar-cronograma-planilla.component';
import { ModalParametrosPlanillaComponent } from './modals/modal-parametros-planilla/modal-parametros-planilla.component';



@NgModule({
  declarations: [
    ModalGestionarCronogramaAnualComponent,
    ModalGestionarCronogramaPlanillaComponent,
    ModalParametrosPlanillaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MomentDateModule
  ]
})
export class ComponentsModule { }
