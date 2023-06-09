import {
    ChangeDetectorRef,
    Component,
    Inject,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'modal-concepto-mcpp',
    templateUrl: './modal-concepto-mcpp.component.html',
    styleUrls: ['./modal-concepto-mcpp.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalConceptoMcppComponent {
    form: FormGroup;
    title: string = 'Nuevo registro';
    isSaveActive = true;
    operation: string = 'create';
    registros: any = null;
    listas: any = {};

    constructor(
        public matDialogRef: MatDialogRef<ModalConceptoMcppComponent>,
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
            typeConcept: [{ value: '', disabled: false }],
            code: [{ value: '', disabled: false }],
            description: [{ value: '', disabled: false }],
            state: [{ value: '', disabled: false }],
            cancellationReason: [{ value: '', disabled: false }],
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
