import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
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
    selector: 'modal-haber-descuento',
    templateUrl: './modal-haber-descuento.component.html',
    styleUrls: ['./modal-haber-descuento.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class ModalHaberDescuentoComponent {
    modal = {
        icon: '',
        title: '',
        origin: '',
    };

    form: FormGroup;
    form2: FormGroup;
    form3: FormGroup;

    listas = {
        clasificadorGasto: [],
        conceptosMCPP: [],
        conceptosPLAME: [],
        estado: [],
        tipoConcepto: [],
        tipoCalculo: [],
        tipoGrupoCalculo: [],
        tipoPago: [],
        regimenLaboral: [],
        ingresoInformacion: [],
        afectaciones: [
            {
                id: 1,
                label: 'ESS - EsSalud',
            },
            {
                id: 2,
                label: '5TA - Renta 5ta Categoría',
            },
            {
                id: 3,
                label: 'SNP - Sistema Nacional de Pensiones',
            },
            {
                id: 4,
                label: 'SPP - Sistema Privado de Pensiones',
            },
            {
                id: 5,
                label: '5PR - Proyección de Renta',
            },
            {
                id: 6,
                label: 'VAC - Base de Vacaciones',
            },
            {
                id: 7,
                label: 'CTS - Base Compensación Tiempo de Servicio',
            },
        ],
    };

    listaAfectacion = {
        in: [],
        out: [],
    };

    title: string = 'Nuevo registro';

    isSaveActive = true;

    operation: string = 'create';

    compareFunction = (o1: any, o2: any) => o1.id === o2.id;

    constructor(
        public matDialogRef: MatDialogRef<ModalHaberDescuentoComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.init();
    }

    init() {
        this.title = this.data?.title ?? 'Nuevo registro';

        this.isSaveActive = this.data?.isSaveActive ?? true;

        // this.modal = this.data?.modal;
        this.listas.clasificadorGasto = Array.from(
            this.data?.listas?.clasificadorGasto
        );
        this.listas.conceptosMCPP = Array.from(
            this.data?.listas?.conceptosMCPP
        );
        this.listas.conceptosPLAME = Array.from(
            this.data?.listas?.conceptosPLAME
        );
        this.listas.estado = Array.from(this.data?.listas?.estado);
        this.listas.ingresoInformacion = Array.from(
            this.data?.listas?.ingresoInformacion
        );
        this.listas.tipoConcepto = Array.from(this.data?.listas?.tipoConcepto);
        this.listas.tipoCalculo = Array.from(this.data?.listas?.tipoCalculo);
        this.listas.tipoGrupoCalculo = Array.from(
            this.data?.listas?.tipoGrupoCalculo
        );
        this.listas.tipoPago = Array.from(this.data?.listas?.tipoPago);
        this.listas.regimenLaboral = Array.from(
            this.data?.listas?.regimenLaboral
        );

        this.listaAfectacion.in = Array.from(this.listas.afectaciones).map(
            (item) => ({
                id: item.id,
                label: item.label,
                check: false,
            })
        );
        this.buildForm();

        this.operation = this.data?.operation.toLowerCase() ?? 'create';

        if (['update', 'view'].includes(this.operation)) {
            console.log(this.data.response);
            this.setData(this.data.response);

            if (this.operation == 'view') {
                for (let control in this.form.controls) {
                    this.form.controls[control].disable();
                }
            }
        }
    }

    get planillaTipoPagoFormArray() {
        return this.form.controls.planillaTipoPago as FormArray;
    }

    buildForm() {
        this.form = this.formBuilder.group({
            regimenLaboral: [{ value: '', disabled: false }],
            codigo: [{ value: '', disabled: false }],
            descripcion: [{ value: '', disabled: false }],
            descripcionCorta: [{ value: '', disabled: false }],
            verEnBoleta: [{ value: false, disabled: false }],
            ordenPresentacion: [{ value: '', disabled: true }],
            tipoConcepto: [{ value: '', disabled: false }],
            grupoCalculo: [{ value: '', disabled: false }],
            prioridadCalculo: [{ value: '', disabled: false }],
            // grupoDescuento: [null],
            // prioridadDentroGrupoDescuento: [null],
            fechaInicio: [{ value: '', disabled: false }],
            fechaFin: [{ value: '', disabled: false }],
            estado: [{ value: '', disabled: false }],
            planillaTipoPago: new FormArray([]),
            tipoCalculo: [{ value: '', disabled: false }],
            registroManual: [{ value: false, disabled: false }],
            ingresoInformacion: [{ value: false, disabled: false }],
            marcoLegal: [{ value: '', disabled: false }],
            anotaciones: [{ value: '', disabled: false }],
            equivalenciaCodigoMCPP: [{ value: '', disabled: true }],
            equivalenciaDescripcionMCPP: [{ value: '', disabled: true }],
            equivalenciaCodigoSUNAT: [{ value: '', disabled: true }],
            equivalenciaDescripcionSUNAT: [{ value: '', disabled: true }],
            clasificadorGasto: [{ value: '', disabled: true }],
        });

        this.listas.tipoPago.forEach(() =>
            this.planillaTipoPagoFormArray.push(new FormControl(false))
        );

        console.log(this.listas.tipoPago);

        console.log(this.planillaTipoPagoFormArray);

        this.form.get('verEnBoleta').valueChanges.subscribe((val) => {
            let arr = [
                'ordenPresentacion',
                'tipoConcepto',
                'planillaTipoPago',
                'equivalenciaCodigoMCPP',
                'equivalenciaCodigoSUNAT',
                'clasificadorGasto',
            ];
            arr.forEach((item) => {
                if (val) {
                    this.form.get(item).enable();
                } else {
                    this.form
                        .get(item)
                        .setValue(item != 'planillaTipoPago' ? '' : false);
                    this.form.get(item).disable();
                }
            });
        });

        this.form
            .get('equivalenciaCodigoMCPP')
            .valueChanges.subscribe((val) => {
                this.form
                    .get('equivalenciaDescripcionMCPP')
                    .setValue(
                        this.getDescriptionList(val, this.listas.conceptosMCPP)
                    );
            });

        this.form
            .get('equivalenciaCodigoSUNAT')
            .valueChanges.subscribe((val) => {
                this.form
                    .get('equivalenciaDescripcionSUNAT')
                    .setValue(
                        this.getDescriptionList(val, this.listas.conceptosPLAME)
                    );
            });

        this.form2 = this.formBuilder.group({
            fichaPersonal: [{ value: '', disabled: false }],
            fichaPersonalDescripcion:[{ value: '', disabled: false }],
            conceptos: [{ value: '', disabled: false }],
            conceptosDescripcion:[{ value: '', disabled: false }],
            variables: [{ value: '', disabled: false }],
            variablesDescripcion:[{ value: '', disabled: false }],
            afectaciones: [{ value: '', disabled: false }],
            afectacionesDescripcion: [{ value: '', disabled: false }],
            situacion: [{ value: '', disabled: false }],
            paso: [{ value: '', disabled: false }],
            operador:[{ value: '', disabled: false }],
            operadorDescripcion:[{ value: '', disabled: false }],
            elementos: [{ value: '', disabled: false }],
            alterno: [{ value: '', disabled: false }]
        });

        this.form3 = this.formBuilder.group({
            idConcepto: [null],
        });
    }

    setData(data: any) {
        this.form.patchValue({
            regimenLaboral: data?.laborRegimeId ?? '',
            codigo: data?.conceptCode ?? '',
            descripcion: data?.description ?? '',
            descripcionCorta: data?.shortDescription ?? '',
            verEnBoleta: data?.showOnPayroll ?? false,
            ordenPresentacion: data?.payrollOrder ?? '',
            tipoConcepto: data?.conceptTypeId ?? '',
            grupoCalculo: data?.calculationGroupId ?? '',
            prioridadCalculo: data?.priority ?? '',
            fechaInicio: data?.startDateValidity ?? '',
            fechaFin: data?.endDateValidity ?? '',
            estado: '',
            tipoCalculo: data?.calculationTypeId ?? '',
            registroManual: data?.allowManualRegistration ?? false,
            ingresoInformacion: data?.bulkLoadSource ?? false,
            marcoLegal: data?.legalFramework ?? '',
            anotaciones: data?.annotations ?? '',
            equivalenciaCodigoMCPP: '',
            equivalenciaCodigoSUNAT: '',
            clasificadorGasto: '',
            // equivalenciaCodigoMCPP: data?.mcppConceptId ?? '',
            // equivalenciaCodigoSUNAT: data?.plameConceptId ?? '',
            // clasificadorGasto: data?.expenseClassifierId ?? '',
        });

        const listaPago = this.listas.tipoPago;

        let ordinarioIdx = listaPago.findIndex((item) => item.id == 28);
        if (ordinarioIdx > -1) {
            this.planillaTipoPagoFormArray.controls[ordinarioIdx].setValue(
                data?.allowMonthlyRemuneration ?? false
            );
        }

        let complementariaIdx = listaPago.findIndex((item) => item.id == 29);
        if (complementariaIdx > -1) {
            this.planillaTipoPagoFormArray.controls[complementariaIdx].setValue(
                data?.allowOccasionalRemuneration ?? false
            );
        }

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
    getDescriptionList(id: number, arr: any[] = []): string {
        let list = arr.filter((item) => item.id == id);
        if (list.length) {
            return list[0].descripcion;
        }
        return '';
    }
}
