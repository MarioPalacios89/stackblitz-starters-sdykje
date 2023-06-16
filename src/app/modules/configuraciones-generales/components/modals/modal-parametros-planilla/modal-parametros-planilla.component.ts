
import {ChangeDetectorRef,Component,Inject,ViewEncapsulation } from '@angular/core';
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
  selector: 'modal-parametros-planilla',
  templateUrl: './modal-parametros-planilla.component.html',
  styleUrls: ['./modal-parametros-planilla.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class ModalParametrosPlanillaComponent {

form: FormGroup;
title:string="Nuevo registro";
isSaveActive = true;
operation: string = 'create';
registros: any = null;
listas: any = {};

constructor(
    public matDialogRef:MatDialogRef<ModalParametrosPlanillaComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) { }

 ngOnInit(): void {
    this.init();
}

ngAfterContentChecked(): void {
      this.cdr.detectChanges();
}

init():void {
this.title=this.data?.title??"";
this.isSaveActive = this.data?.isSaveActive ?? true;
this.operation = this.data?.operation.toLowerCase() ?? 'create';
this.listas = Object.assign({}, this.data?.listas??{});
    this.buildForm();
if (['update', 'view'].includes(this.operation)) {
    let data = this.data?.response??{};
  let n=Object.keys(data).length
  if(n>0){
   this.registros = Object.assign({}, data);
  }
  if (this.operation == 'view') {
              for (let control in this.form.controls) {
                  this.form.controls[control].disable();
              }
  }
}
}


buildForm():void {
    this.form = this.formBuilder.group({
code:[{value:'',disabled:true}],
description:[{value:'',disabled:true}],
value:[{value:'',disabled:true}],
startDate:[{value:'',disabled:true}],
endDate:[{value:'',disabled:true}],
parameterType:[{value:'',disabled:true}],
status:[{value:'',disabled:true}],
reasonCancellation:[{value:'',disabled:true}]});
  }

      getDescriptionList(id: number,arr: any[] = [],prop: string = 'label'): string {
      let list = arr.filter((item) => item.id == id);
      if (list.length) {
          return list[0][prop] ?? '';
      }
      return '';
  }

}
