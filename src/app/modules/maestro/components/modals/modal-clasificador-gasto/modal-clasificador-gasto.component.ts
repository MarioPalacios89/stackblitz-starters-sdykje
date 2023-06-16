import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'modal-clasificador-gasto',
  templateUrl: './modal-clasificador-gasto.component.html',
  styleUrls: ['./modal-clasificador-gasto.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalClasificadorGastoComponent {
    form: FormGroup;
    title: string = 'Nuevo registro';
    isSaveActive = true;
    operation: string = 'create';
    registros: any = null;
    listas: any = {};

  constructor(
    public matDialogRef: MatDialogRef<ModalClasificadorGastoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.init();
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
        ano:[""],
        codigo: [null],
        asociar_concepto:[null],
        descripcion: [{value:"",disabled:true}],
        gasto_padre:[""],
        gasto_padre_descripcion:[""],
        estado: [""],
        motivo_anulacion: [null],
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
