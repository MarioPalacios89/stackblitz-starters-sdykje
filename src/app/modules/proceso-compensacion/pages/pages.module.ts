import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { ComponentsModule } from '../components/components.module';
import {ProcesoServidorPublicoComponent} from './servidor-publico/proceso-servidor-publico.component';
import { ProcesoCalculoPlanillaComponent } from './calculo-planilla/proceso-calculo-planilla.component';
import { ProcesoAperturaPeriodoComponent } from './apertura-periodo/proceso-apertura-periodo.component'

const routes: Routes = [
    {
        path: "",
        component: ProcesoServidorPublicoComponent,
    },
    {
        path: "servidor-publico",
        component: ProcesoServidorPublicoComponent,
    },
    {
        path: "calculo-planilla",
        component: ProcesoCalculoPlanillaComponent,
    },
       {
        path: "apertura-periodo",
        component: ProcesoAperturaPeriodoComponent,
    }
];

@NgModule({
  declarations: [ProcesoServidorPublicoComponent, ProcesoCalculoPlanillaComponent, ProcesoAperturaPeriodoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class PagesModule { }
