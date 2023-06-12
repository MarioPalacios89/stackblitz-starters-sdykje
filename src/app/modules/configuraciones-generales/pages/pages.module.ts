import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';
import { ComponentsModule } from '../components/components.module';
import { ParametrosPlanillaComponent } from './parametros-planilla/parametros-planilla.component';
import { GestionarCronogramaAnualComponent } from './gestionar-cronograma-anual/gestionar-cronograma-anual.component';
import { GestionarCronogramaPlanillaComponent } from './gestionar-cronograma-planilla/gestionar-cronograma-planilla.component';

const routes: Routes = [
    {
        path: "",
        component: ParametrosPlanillaComponent,
    },
    {
        path: "parametros-planilla",
        component: ParametrosPlanillaComponent,
    },
    {
        path: "gestionar-cronograma-anual",
        component: GestionarCronogramaAnualComponent,
    },
    {
        path: "gestionar-cronograma-planilla",
        component: GestionarCronogramaPlanillaComponent,
    },
];

@NgModule({
    declarations: [
    ParametrosPlanillaComponent,
    GestionarCronogramaAnualComponent,
    GestionarCronogramaPlanillaComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MomentDateModule,
    ],
})
export class PagesModule {}
