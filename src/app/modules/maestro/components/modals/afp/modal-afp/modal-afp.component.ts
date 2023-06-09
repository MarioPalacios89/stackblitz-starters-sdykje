import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'modal-afp',
  templateUrl: './modal-afp.component.html',
  styleUrls: ['./modal-afp.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalAfpComponent {
    modal = {
        icon: "",
        title: "",
        origin: "",
    };

    form: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<ModalAfpComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.modal = this.data.modal;
    this.buildForm();
}

buildForm() {
    this.form = this.formBuilder.group({
        codigo: [null],
        descripcion: [null],
        ruc: [null],
        telefono: [null],
        departamento: [""],
        provincia: [""],
        distrito: [""],
        direccion: [null],
        estado: [""],
        motivo: [null],
    });
}
}
