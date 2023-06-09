import {
    ChangeDetectorRef,
    Component,
    Inject,
    ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'modal-estructura-programatica-ue',
  templateUrl: './modal-estructura-programatica-ue.component.html',
  styleUrls: ['./modal-estructura-programatica-ue.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalEstructuraProgramaticaUeComponent {
    form: FormGroup;
    title: string = 'Nuevo registro';
    isSaveActive = true;
    operation: string = 'create';
    registros: any = null;
    listas: any = {};

    constructor(
        public matDialogRef: MatDialogRef<ModalEstructuraProgramaticaUeComponent>,
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
            year: [{ value: '', disabled: false }],
            budgetProgram: [{ value: '', disabled: false }],
            budgetProgramDescription: [{ value: '', disabled: true }],
            product: [{ value: '', disabled: false }],
            productDescription: [{ value: '', disabled: true }],
            activity: [{ value: '', disabled: false }],
            activityDescription: [{ value: '', disabled: true }],
            function: [{ value: '', disabled: false }],
            functionDescription: [{ value: '', disabled: true }],
            functionalDivision: [{ value: '', disabled: false }],
            functionalDivisionDescription: [{ value: '', disabled: true }],
            functionalGroup: [{ value: '', disabled: false }],
            functionalGroupDescription: [{ value: '', disabled: true }],
            purpose: [{ value: '', disabled: false }],
            purposeDescription: [{ value: '', disabled: true }],
            state: [{ value: '', disabled: true }],
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

