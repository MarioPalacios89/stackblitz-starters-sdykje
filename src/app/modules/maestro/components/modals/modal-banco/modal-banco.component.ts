import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'modal-banco',
    templateUrl: './modal-banco.component.html',
    styleUrls: ['./modal-banco.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalBancoComponent {
    form: FormGroup;
    title: string = 'Nuevo registro';

    listas = {
        code_sunat: [],
        department: [],
        province: [],
        district: [],
        state: [],
    };

    constructor(
        public matDialogRef: MatDialogRef<ModalBancoComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.title = this.data?.title ?? '';
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            code: [{ value: '', disabled: true }],
            descripcion: [{ value: '', disabled: false }],
            ruc: [{ value: '', disabled: false }],
            initial: [{ value: '', disabled: false }],
            telephone: [{ value: '', disabled: false }],
            code_sunat: [{ value: '', disabled: false }],
            department: [{ value: '', disabled: false }],
            province: [{ value: '', disabled: false }],
            district: [{ value: '', disabled: false }],
            address: [{ value: '', disabled: false }],
            state: [{ value: '', disabled: true }],
            reason_anulation: [{ value: '', disabled: false }],
        });
    }
}
