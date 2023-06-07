import {
    ChangeDetectorRef,
    Component,
    Inject,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'detalle-servidor-publico',
    templateUrl: './detalle-servidor-publico.component.html',
    styleUrls: ['./detalle-servidor-publico.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DetalleServidorPublicoComponent {
    form: FormGroup;
    title: string = 'Nuevo registro';
    isSaveActive = true;
    operation: string = 'create';
    registros: any = null;
    listas: any = {};

    botonesCarga = [
        { label: 'Beneficiarios', icon: 'add', disabled: false },
        { label: 'Carga tercero', icon: 'add', disabled: false },
        { label: 'Conceptos', icon: 'add', disabled: false },
        { label: 'Asistencia', icon: 'add', disabled: false },
        { label: 'Boleta', icon: 'sim_card_download', disabled: false },
    ];

    dataTable = [];

    constructor(
        public matDialogRef: MatDialogRef<DetalleServidorPublicoComponent>,
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
        this.buildForm();
        if (['update', 'view'].includes(this.operation)) {


            let data = this.data?.response ?? {};
            let n = Object.keys(data).length;
            if (n > 0) {
                this.registros = Object.assign({}, data);
                this.filltable(this.registros.payrollList);
            }
            if (this.operation == 'view') {
                for (let control in this.form.controls) {
                    this.form.controls[control].disable();
                }
                this.botonesCarga.forEach((item) => (item.disabled = true));
            }
        }
    }

    filltable(arr: any = []) {
        this.dataTable = Array.from(arr);
    }

    buildForm(): void {
        this.form = this.formBuilder.group({
            employment_situation: [{ value: '', disabled: false }],
            retention: [{ value: '', disabled: true }],
            annotation: [{ value: '', disabled: false }],
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
}
