import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfpService } from './afp.service';
import { AprobadorPlanillaService } from './aprobador-planilla.service';
import { BancoService } from './banco.service';
import { ClasificadorGastoService } from './clasificador-gasto.service';
import { ConceptoMcppService } from './concepto-mcpp.service';
import { ConceptoPlameService } from './concepto-plame.service';
import { EstructuraProgramaticaUeService } from './estructura-programatica-ue.service';
import { EstructuraProgramaticaService } from './estructura-programatica.service';
import { HaberDescuentoService } from './haber-descuento.service';
import { IndiceIncrementoCategoriaService } from './indice-incremento-categoria.service';
import { TerceroService } from './tercero.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AfpService,
    AprobadorPlanillaService,
    BancoService,
    ClasificadorGastoService,
    ConceptoMcppService,
    ConceptoPlameService,
    EstructuraProgramaticaUeService,
    EstructuraProgramaticaService,
    HaberDescuentoService,
    IndiceIncrementoCategoriaService,
    TerceroService
  ]
})
export class MaestroModule { }
