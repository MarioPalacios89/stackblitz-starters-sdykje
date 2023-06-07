import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServidorPublicoService } from './servidor-publico.service';
import { CalculoPlanillaService } from './calculo-planilla.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [ServidorPublicoService, CalculoPlanillaService],
})
export class ProcesoCompensacionModule {}
