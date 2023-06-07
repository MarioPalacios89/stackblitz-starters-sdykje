import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAfpComponent } from './modals/modal-afp/modal-afp.component';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalHaberDescuentoComponent } from './modals/modal-haber-descuento/modal-haber-descuento.component';
import { ModalClasificadorGastoComponent } from './modals/modal-clasificador-gasto/modal-clasificador-gasto.component';
import { ModalBancoComponent } from './modals/modal-banco/modal-banco.component';



@NgModule({
  declarations: [
    ModalAfpComponent,
    ModalHaberDescuentoComponent,
    ModalClasificadorGastoComponent,
    ModalBancoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class ComponentsModule { }
