import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestroModule } from './maestro/maestro.module';
import { ProcesoCompensacionModule } from './proceso-compensacion/proceso-compensacion.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaestroModule,
    ProcesoCompensacionModule
  ],
  providers: []
})
export class ServicesModule { }
