import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionarCronogramaAnualService } from './gestionar-cronograma-anual.service';
import { ParametrosPlanillaService } from './parametros-planilla.service';
import { GestionarCronogramaPlanillaService } from './gestionar-cronograma-planilla.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[ParametrosPlanillaService,GestionarCronogramaAnualService,GestionarCronogramaPlanillaService]
})
export class ConfiguracionesGeneralesModule { }
