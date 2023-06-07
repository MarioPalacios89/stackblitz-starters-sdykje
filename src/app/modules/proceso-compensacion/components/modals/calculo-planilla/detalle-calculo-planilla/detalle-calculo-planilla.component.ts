import {
    ChangeDetectorRef,
    Component,
    Inject,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'detalle-calculo-planilla',
    templateUrl: './detalle-calculo-planilla.component.html',
    styleUrls: ['./detalle-calculo-planilla.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DetalleCalculoPlanillaComponent {
    form: FormGroup;
    title: string = 'Nuevo registro';
    isSaveActive = true;

    operation: string = 'create';

    dataTable = [];
    totalTable = 0;

    botonesCarga = [
        { label: 'Carga asistencia', disabled: false },
        { label: 'Carga tercero', disabled: false },
        { label: 'Procesar planilla', disabled: false },
        { label: 'Reperturar planilla', disabled: false },
        { label: 'Enviar aprobar', disabled: false },
    ];

    registroPantalla: any = null;

    listas: any = {};

    constructor(
        public matDialogRef: MatDialogRef<DetalleCalculoPlanillaComponent>,
        private cdr: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {}

    ngOnInit(): void {
        this.init();
    }


    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }

    init() {
        this.title = this.data?.title ?? 'Nuevo registro';
        this.isSaveActive = this.data?.isSaveActive ?? true;
        this.operation = this.data?.operation.toLowerCase() ?? 'create';

        this.listas = Object.assign({}, this.data?.listas);

        this.buildForm();

        if (['update', 'view'].includes(this.operation)) {
            let data = this.data.response;
            this.registroPantalla = Object.assign({}, data);
            this.registroPantalla.executingUnit = this.getDescriptionList(
                data.executingUnitId,
                this.listas?.unidadEjecutora
            );
            this.registroPantalla.month = this.getDescriptionList(
                data.monthId,
                this.listas?.meses
            );
            this.registroPantalla.payrollType = this.getDescriptionList(
                data.payrollTypeId,
                this.listas?.tipoPlanilla
            );
            this.registroPantalla.payroll = this.getDescriptionList(
                data.payrollId,
                this.listas?.planilla
            );
            this.registroPantalla.paymentType = this.getDescriptionList(
                data.paymentTypeId,
                this.listas?.tipoPago
            );
            this.registroPantalla.periodStatus = this.getDescriptionList(
                data.periodStatusId,
                this.listas?.estadoPeriodo
            );
            this.registroPantalla.periodDetail =
                this.registroPantalla.periodDetail.map((item2: any) => ({
                    id: item2.id,
                    periodId: item2.periodId,
                    laborRegimeId: item2.laborRegimeId,
                    laborRegime: this.getDescriptionList(
                        item2.laborRegimeId,
                        this.listas?.regimenLaboral,
                        "descripcion"
                    ),
                    amount:0
                }));

            this.filltable(this.registroPantalla.periodDetail);

            console.log('data', this.registroPantalla);

            if (this.operation == 'view') {
                for (let control in this.form.controls) {
                    this.form.controls[control].disable();
                }
                this.botonesCarga.forEach((item) => (item.disabled = true));
            }
        }
    }

    buildForm() {
        this.form = this.formBuilder.group({});
    }

    filltable(arr:any=[]) {
        this.totalTable = arr.reduce((a, b) => a + b.amount, 0);
        this.dataTable = Array.from(arr);
    }

    getDescriptionList(
        id: number,
        arr: any[] = [],
        prop: string = 'label'
    ): string {
        let list = arr.filter((item) => item.id == id);
        if (list.length) {
            return list[0][prop] ?? '';
        }
        return '';
    }
}
