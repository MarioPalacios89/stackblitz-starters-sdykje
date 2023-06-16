import { ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'modal-afp',
  templateUrl: './modal-afp.component.html',
  styleUrls: ['./modal-afp.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalAfpComponent {
    form: FormGroup;
    title: string = 'Nuevo registro';
    isSaveActive = true;
    operation: string = 'create';
    registros: any = null;
    listas: any = {};

  constructor(
    public matDialogRef: MatDialogRef<ModalAfpComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) { }

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

buildForm() {
    this.form = this.formBuilder.group({
        codigo: [{ value: '', disabled: false }],
        descripcion: [{ value: '', disabled: false }],
        ruc: [{ value: '', disabled: false }],
        telefono: [{ value: '', disabled: false }],
        departamento: [{ value: '', disabled: false }],
        provincia: [{ value: '', disabled: false }],
        distrito: [{ value: '', disabled: false }],
        direccion:  [{ value: '', disabled: false }],
        estado:  [{ value: '', disabled: true }],
        motivo:  [{ value: '', disabled: true }],
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
