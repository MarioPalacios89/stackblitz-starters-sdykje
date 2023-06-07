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
    modal = {
        icon: "",
        title: "",
        origin: "",
    };

    form: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<ModalClasificadorGastoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.modal = this.data.modal;
    this.buildForm();
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
}
