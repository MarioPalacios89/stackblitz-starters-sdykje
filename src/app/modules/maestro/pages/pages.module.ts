import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material/material.module';
import { Routes, RouterModule } from "@angular/router";
import { ComponentsModule } from '../components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaestroAfpComponent } from './afp/maestro-afp.component'
import { MaestroHaberDescuentoComponent } from './haber-descuento/maestro-haber-descuento.component';
import { MaestroClasificadorGastoComponent } from './clasificador-gasto/maestro-clasificador-gasto.component';
import { MaestroBancoComponent } from './banco/maestro-banco.component';
import { MaestroConceptoMcppComponent } from './concepto-mcpp/maestro-concepto-mcpp.component';
import { MaestroAprobadorPlanillaComponent } from './aprobador-planilla/maestro-aprobador-planilla.component';
import { IndiceIncrementoCategoriaComponent } from './indice-incremento-categoria/indice-incremento-categoria.component';
import { EstructuraProgramaticaComponent } from './estructura-programatica/estructura-programatica.component';
import { EstructuraProgramaticaUeComponent } from './estructura-programatica-ue/estructura-programatica-ue.component';
import { MaestroTerceroComponent } from './tercero/maestro-tercero.component';
import { MaestroConceptoPlameComponent } from './concepto-plame/maestro-concepto-plame.component';

import { MomentDateModule } from '@angular/material-moment-adapter';
import { FuseAlertModule } from '@fuse/components/alert';

const routes: Routes = [
    {
        path: "",
        component: MaestroHaberDescuentoComponent,
    },
    {
        path: "haberes",
        component: MaestroHaberDescuentoComponent,
    },
    {
        path: "afp",
        component: MaestroAfpComponent,
    },
    {
        path: "clasificador_gasto",
        component: MaestroClasificadorGastoComponent,
    },
    {
        path: "banco",
        component: MaestroBancoComponent,
    },
    {
        path: "concepto_mcpp",
        component: MaestroConceptoMcppComponent,
    },
    {
        path: "aprobador_planilla",
        component: MaestroAprobadorPlanillaComponent,
    },
    {
        path: "indice_incremento_categoria",
        component: IndiceIncrementoCategoriaComponent,
    },
    {
        path: "estructura_programatica",
        component: EstructuraProgramaticaComponent,
    },
    {
        path: "estructura_programatica_ue",
        component: EstructuraProgramaticaUeComponent,
    },
    {
        path: "maestro-tercero",
        component: MaestroTerceroComponent,
    },
    {
        path: "maestro-concepto-plame",
        component: MaestroConceptoPlameComponent,
    },

];

const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'MMM DD, YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};

@NgModule({
  declarations: [
    MaestroAfpComponent,
    MaestroHaberDescuentoComponent,
    MaestroClasificadorGastoComponent,
    MaestroBancoComponent,
    MaestroConceptoMcppComponent,
    MaestroAprobadorPlanillaComponent,
    IndiceIncrementoCategoriaComponent,
    EstructuraProgramaticaComponent,
    EstructuraProgramaticaUeComponent,
    MaestroTerceroComponent,
    MaestroConceptoPlameComponent
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
  ]
})
export class PagesModule { }
