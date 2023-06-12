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
    selector: 'detalle-tercero',
    templateUrl: './detalle-tercero.component.html',
    styleUrls: ['./detalle-tercero.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class DetalleTerceroComponent {
    form: FormGroup;
    title: string = 'Nuevo registro';
    isSaveActive = true;
    operation: string = 'create';
    registros: any = null;
    listas: any = {};

    listaAfectacion = {
        in: [],
        out: [],
    };

    compareFunction = (o1: any, o2: any) => o1.id === o2.id;

    constructor(
        public matDialogRef: MatDialogRef<DetalleTerceroComponent>,
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
        let afectaciones = [
            { id: 1, label: 'USE 01 SAN JUAN DE MIRAFLORES' },
            { id: 2, label: 'USE 02 SAN MARTIN DE PORRAS' },
            { id: 3, label: 'USE 03 CERCADO' },
            { id: 4, label: 'USE 04 COMAS' },
            { id: 5, label: 'USE 05 SAN JUAN DE LURIGANCHO' },
            { id: 6, label: 'USE 06 VITARTE' },
            { id: 7, label: 'USE 07 SAN BORJA' },
            { id: 8, label: 'DIRECCION DE EDUCACION DE LIMA' },
            { id: 9, label: 'ESCUELA NACIONAL DE BELLAS ARTES' },
        ];
        this.listaAfectacion.in = Array.from(afectaciones).map(
            (item) => ({
                id: item.id,
                label: item.label,
                check: false,
            })
        );
        this.buildForm();
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
            code: [{ value: 'ABC0001', disabled: true }],
            name: [{ value: 'COOPERATIVA ABC', disabled: true }],
            executingUnit: [{ value: '', disabled: true }],
        });
    }

    moverOpcionAfection(lista: any, esEntrada: boolean = false): void {
        let listaSeleccionada: any = Array.from(lista.selectedOptions.selected);

        if (listaSeleccionada.length) {
            let seleccionados = listaSeleccionada.map((item) => item.value);

            if (esEntrada) {
                listaSeleccionada = this.listaAfectacion.in.filter((item) =>
                    seleccionados.includes(item.id)
                );
                this.listaAfectacion.out = []
                    .concat(this.listaAfectacion.out, listaSeleccionada)
                    .sort((a, b) => a.id - b.id);
                this.listaAfectacion.in = this.listaAfectacion.in.filter(
                    (item) => !seleccionados.includes(item.id)
                );
                this.listaAfectacion.in
                    .map((item) => ({
                        id: item.id,
                        label: item.label,
                        check: false,
                    }))
                    .sort((a, b) => a.id - b.id);
            } else {
                listaSeleccionada = this.listaAfectacion.out.filter((item) =>
                    seleccionados.includes(item.id)
                );
                this.listaAfectacion.in = []
                    .concat(this.listaAfectacion.in, listaSeleccionada)
                    .sort((a, b) => a.id - b.id);
                this.listaAfectacion.out = this.listaAfectacion.out.filter(
                    (item) => !seleccionados.includes(item.id)
                );
                this.listaAfectacion.out
                    .map((item) => ({
                        id: item.id,
                        label: item.label,
                        check: false,
                    }))
                    .sort((a, b) => a.id - b.id);
            }
        }
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
