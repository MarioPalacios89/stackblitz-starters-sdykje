import {
    ChangeDetectorRef,
    Component,
    Inject,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'apertura-periodo',
    templateUrl: './apertura-periodo.component.html',
    styleUrls: ['./apertura-periodo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class AperturaPeriodoComponent {
    form: FormGroup;
    title: string = 'Nuevo registro';
    isSaveActive = true;
    operation: string = 'create';
    registros: any = null;
    listas: any = {};

    dataTable = [];
    dataTable2 = [];

    constructor(
        public matDialogRef: MatDialogRef<AperturaPeriodoComponent>,
        private cdr: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.init();
    }

    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }

    init(): void {
        this.title = this.data?.title ?? '';
        this.isSaveActive = this.data?.isSaveActive ?? true;
        this.operation = this.data?.operation.toLowerCase() ?? 'create';
        this.listas = Object.assign({}, this.data?.listas ?? {});
        let dataRegimen = [
            {
                id: 1,
                descripcion: 'LEY 29944 - LEY DE REFORMA MAGISTERIAL',
            },
            {
                id: 2,
                descripcion:
                    'LEY 30512 - EDUCACION SUPERIOR NO UNIVERSITARIA NOMBRADOS',
            },
            {
                id: 3,
                descripcion: 'LEY 30328 - CONTRATO DE SERVICIO DOCENTE',
            },
            { id: 4, descripcion: 'LEY 30493 - AUXILIAR EDUCACIÓN' },
            {
                id: 5,
                descripcion: 'DECRETO LEGISLATIVO 276 - CARRERA ADMINISTRATIVA',
            },
            {
                id: 6,
                descripcion:
                    'DECRETO LEGISLATIVO 1153 - PROFESIONALES DE LA SALUD',
            },
            {
                id: 7,
                descripcion: 'DECRETO LEGISLATIVO 728 - REGIMEN PRIVADO',
            },
            {
                id: 8,
                descripcion:
                    'DECRETO LEGISLATIVO 1057 - CONTRATACIÓN ADMINISTRATIVA DE SERVICIO',
            },
            { id: 9, descripcion: 'LEY 30057 - SERVICIO CIVIL - SERVIR' },
            { id: 10, descripcion: 'LEY 24029 - LEY DEL PROFESORADO' },
            {
                id: 11,
                descripcion:
                    'LEY 29062 - LEY DE LA CARRERA PUBLICA MAGISTERIAL',
            },
            {
                id: 12,
                descripcion:
                    'DECRETO LEGISLATIVO 559 - PROFESIONALES DE LA SALUD',
            },
            {
                id: 13,
                descripcion: 'LEY 23536 - PROFESIONALES DE LA SALUD',
            },
            {
                id: 14,
                descripcion:
                    'LEY 30372 - EDUCACIÓN SUPERIOR NO UNIVERSITARIA CONTRATADOS (95° DCF)',
            },
            { id: 15, descripcion: 'DECRETO LEGISLATIVO 1024' },
            { id: 16, descripcion: 'SIN RÉGIMEN' },
            { id: 17, descripcion: 'MÚLTIPLE' },
            {
                id: 18,
                descripcion: 'DECRETO LEY 20530 - RÉGIMEN DE PENSIONES',
            },
            {
                id: 19,
                descripcion: 'DECRETO LEY 11192 - PALMAS MAGISTERIALES',
            },
            {
                id: 20,
                descripcion: 'LEY 29029 - LEY DE LA MANCOMUNIDAD MUNICIPAL',
            },
            { id: 21, descripcion: 'PRONOEI' },
        ];
        let dataGrupoCalculo = [
            {
                id: 70,
                descripcion: 'REMUNERACIONES',
            },
            {
                id: 71,
                descripcion: 'ASIGNACIONES',
            },
            {
                id: 72,
                descripcion: 'BONIFICACIONES',
            },
            {
                id: 73,
                descripcion: 'OTROS INGRESOS',
            },
            {
                id: 74,
                descripcion: 'D. LEY Y JUDICIALES',
            },
            {
                id: 75,
                descripcion: 'SINDICALES',
            },
            {
                id: 76,
                descripcion: 'FONDOS DE BIENESTAR',
            },
            {
                id: 77,
                descripcion: 'COOPERATIVAS',
            },
            {
                id: 78,
                descripcion: 'ENTIDADES SUP. SBS',
            },
            {
                id: 79,
                descripcion: 'APORTES PATRONALES( ESSALUD )',
            },
        ];
        this.buildForm();
        this.filltable(dataRegimen);
        this.filltable2(dataGrupoCalculo);
        if (['update', 'view'].includes(this.operation)) {
            let data = this.data?.response ?? {};
            let n = Object.keys(data).length;
            if (n > 0) {
                this.registros = Object.assign({}, data);
            }
            if (this.operation == 'view') {
                for (let control in this.form.controls) {
                    this.form.controls[control].disable();
                }
            }
        }
    }

    buildForm(): void {
        this.form = this.formBuilder.group({
            year: [{ value: '', disabled: false }],
            month: [{ value: '', disabled: false }],
            payrollType: [{ value: '', disabled: false }],
            payroll: [{ value: '', disabled: false }],
            payType: [{ value: '', disabled: false }],
        });
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

    filltable(arr: any = []) {
        this.dataTable = Array.from(arr);
    }

    filltable2(arr: any = []) {
        this.dataTable2 = Array.from(arr);
    }
}
