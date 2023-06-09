import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleCalculoPlanillaComponent } from './modals/calculo-planilla/detalle-calculo-planilla/detalle-calculo-planilla.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { DetalleServidorPublicoComponent } from './modals/servidor-publico/detalle-servidor-publico/detalle-servidor-publico.component';
import { AperturaPeriodoComponent } from './modals/apertura-periodo/apertura-periodo/apertura-periodo.component';



@NgModule({
  declarations: [
    DetalleCalculoPlanillaComponent,
    DetalleServidorPublicoComponent,
    AperturaPeriodoComponent
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
