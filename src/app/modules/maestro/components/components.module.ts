import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAfpComponent } from './modals/afp/modal-afp/modal-afp.component';
import { MaterialModule } from 'app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalHaberDescuentoComponent } from './modals/modal-haber-descuento/modal-haber-descuento.component';
import { ModalClasificadorGastoComponent } from './modals/modal-clasificador-gasto/modal-clasificador-gasto.component';
import { ModalBancoComponent } from './modals/modal-banco/modal-banco.component';
import { DetalleAfpComponent } from './modals/afp/detalle-afp/detalle-afp.component';
import { ModalConceptoMcppComponent } from './modals/modal-concepto-mcpp/modal-concepto-mcpp.component';
import { ModalAprobadorPlanillaComponent } from './modals/modal-aprobador-planilla/modal-aprobador-planilla.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ModalConceptoPlameComponent } from './modals/modal-concepto-plame/modal-concepto-plame.component';
import { ModalIndiceIncrementoCategoriaComponent } from './modals/modal-indice-incremento-categoria/modal-indice-incremento-categoria.component';
import { ModalEstructuraProgramaticaComponent } from './modals/modal-estructura-programatica/modal-estructura-programatica.component';
import { ModalEstructuraProgramaticaUeComponent } from './modals/modal-estructura-programatica-ue/modal-estructura-programatica-ue.component';


@NgModule({
  declarations: [
    ModalAfpComponent,
    ModalHaberDescuentoComponent,
    ModalClasificadorGastoComponent,
    ModalBancoComponent,
    DetalleAfpComponent,
    ModalConceptoMcppComponent,
    ModalAprobadorPlanillaComponent,
    ModalConceptoPlameComponent,
    ModalIndiceIncrementoCategoriaComponent,
    ModalEstructuraProgramaticaComponent,
    ModalEstructuraProgramaticaUeComponent
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
