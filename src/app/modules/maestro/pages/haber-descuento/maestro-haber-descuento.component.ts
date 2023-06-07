import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalHaberDescuentoComponent } from '../../components/modals/modal-haber-descuento/modal-haber-descuento.component';
import { HaberDescuentoService } from 'app/core/services/maestro/haber-descuento.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'maestro-haber-descuento',
    templateUrl: './maestro-haber-descuento.component.html',
    styleUrls: ['./maestro-haber-descuento.component.scss'],
})
export class MaestroHaberDescuentoComponent {
    private ngUnsubscribe = new Subject<void>();

    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;

    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    displayedColumns: string[] = [
        'index',
        'concepto',
        'descripcion_concepto',
        'tipo_concepto',
        'grupo_calculo',
        'tipo_pago',
        'fecha_inicio',
        'fecha_fin',
        'estado',
        'opciones',
    ];

    permisoGeneral: any;

    dataSource = new MatTableDataSource();

    listas = {
        clasificadorGasto:[],
        conceptosMCPP:[],
        conceptosPLAME:[],
        estado: [],
        ingresoInformacion:[],
        tipoConcepto: [],
        tipoCalculo: [],
        tipoGrupoCalculo:[],
        tipoPago: [],
        regimenLaboral: []
    };

    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    dialogRef: any;
    constructor(
        private formBuilder: FormBuilder,
        private _haberDescuentoService: HaberDescuentoService,
        private materialDialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.buildForm();
        this.defaultGrid();
        this.cargarGrilla();
    }
    ngAfterViewInit() {
        sessionStorage.setItem('loading', 'Obteniendo datos');
        this._haberDescuentoService.getLists().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
            const {
                clasificadorGasto,
                conceptosMCPP,
                conceptosPLAME,
                estado,
                ingresoInformacion,
                tipoConcepto,
                tipoCalculo,
                tipoGrupoCalculo,
                tipoPago,
                regimenLaboral,
            } = response;
            this.listas.clasificadorGasto = clasificadorGasto;
            this.listas.conceptosMCPP = conceptosMCPP;
            this.listas.conceptosPLAME = conceptosPLAME;
            this.listas.estado = estado;
            this.listas.ingresoInformacion=ingresoInformacion;
            this.listas.tipoConcepto = tipoConcepto;
            this.listas.tipoCalculo = tipoCalculo;
            this.listas.tipoGrupoCalculo = tipoGrupoCalculo;
            this.listas.tipoPago = tipoPago;
            this.listas.regimenLaboral = regimenLaboral;

            let randomBoolean = () => Math.random() >= 0.5;
            setTimeout(() => {
                this._haberDescuentoService.findAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {

                    let data = response;
                    data = data.map((item) => ({
                        id: item.id,
                        conceptCode: item.conceptCode ?? '',
                        description: item.description ?? '',
                        startDateValidity: item.startDateValidity ?? '',
                        endDateValidity: item.endDateValidity ?? '',
                        paymentType: this.getDescriptionList(
                            item.paymentTypeId,
                            this.listas.tipoPago
                        ),
                        conceptType: this.getDescriptionList(
                            item.conceptTypeId,
                            this.listas.tipoConcepto
                        ),
                        calculationGroup: this.getDescriptionList(
                            item.calculationGroupId,
                            this.listas.tipoGrupoCalculo
                        ),
                        stateId: item.stateId,
                        state: this.getDescriptionList(
                            item.stateId,
                            this.listas.estado
                        ),
                        // isView: (item.conceptCode=="D0001"?true:randomBoolean())
                        isView:true
                    }));
                    this.cargarGrilla(data);
                    sessionStorage.removeItem('loading');
                });
            }, 200);
        });
    }

    buildForm() {
        this.form = this.formBuilder.group({
            idRegimenLaboral: [{ value: '', disabled: true }],
            idTipoConcepto: [{ value: '', disabled: true }],
            idTipoPago: [{ value: '', disabled: true }],
            idGrupoCalculo: [{ value: '', disabled: true }],
            idTipoCalculo: [{ value: '', disabled: true }],
        });

        // this.form.get("fechaConfiguracion").valueChanges.subscribe(value => {
        //   this.form.patchValue({ anio: value?.getFullYear() });
        // });

        // this.form.get("idTipoProceso").valueChanges.subscribe(value => {
        //   this.combo.procesos = [];
        //   this.form.patchValue({ idDescripcionMaestroProceso: "-1" });
        //   if (value && value > 0 ) {
        //     this.form.get('idDescripcionMaestroProceso').enable();
        //     this.defaultComboProcesos(value);
        //   } else
        //     this.form.get('idDescripcionMaestroProceso').disable();
        // });
    }

    defaultGrid() {
        this.buildPaginators(this.paginator);
    }

    buildPaginators(paginator: MatPaginator): void {
        paginator.showFirstLastButtons = true;
        paginator._intl.itemsPerPageLabel = 'Registros por página';
        paginator._intl.nextPageLabel = 'Siguiente página';
        paginator._intl.previousPageLabel = 'Página anterior';
        paginator._intl.firstPageLabel = 'Primera página';
        paginator._intl.lastPageLabel = 'Última página';
        paginator._intl.getRangeLabel = (
            page: number,
            pageSize: number,
            length: number
        ) => {
            if (length === 0 || pageSize === 0) {
                return `0 de ${length}`;
            }
            const length2 = Math.max(length, 0);
            const startIndex = page * pageSize;
            const endIndex =
                startIndex < length2
                    ? Math.min(startIndex + pageSize, length2)
                    : startIndex + pageSize;
            return `${startIndex + 1} – ${endIndex} de ${length2}`;
        };
    }

    cargarGrilla(data: any[] = [], autoSearch: boolean = false) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    }

    handleCrear(): void {
        this.dialogRef = this.materialDialog.open(
            ModalHaberDescuentoComponent,
            {
                disableClose: true,
                width: '60%',
                data: {
                    modal: {
                        icon: 'save',
                        title: 'Nuevo miembro de comité',
                        action: 'create',
                        disabled: false,
                    },
                },
            }
        );
    }

    handleModificar(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this._haberDescuentoService.findOne(1).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
            next: (response) => {

                this.dialogRef = this.materialDialog
                    .open(ModalHaberDescuentoComponent, {
                        disableClose: true,
                        width: '75%',
                        data: {
                            title: 'Actualizar concepto',
                            listas: this.listas,
                            operation:"update",
                            isSaveActive:true,
                            response,
                        },
                    })
                    .afterOpened().pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((responseDialog) => {
                        setTimeout(() => {
                            sessionStorage.removeItem('loading');
                        }, 500);

                    });
            },
            error: (error) => {
                setTimeout(() => {
                    sessionStorage.removeItem('loading');
                }, 500);
            },
        });
    }

    handleExportar(): void {}

    handleBuscar(): void {}

    handleLimpiar(): void {}

    obtenerDetalle(elm:any=null): void {
        if(elm==null){
            this.snackBar.open("No se encontro el registro", "", {
                duration: 2500,
                panelClass: 'error-snackbar',
                horizontalPosition: "end",
                verticalPosition: "top",
              });
            return;
        }
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        let id=elm.id;
        this._haberDescuentoService.findOne(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
            next: (response) => {
                this.dialogRef = this.materialDialog
                    .open(ModalHaberDescuentoComponent, {
                        disableClose: true,
                        width: '75%',
                        data: {
                            title: 'Visualizar concepto',
                            listas: this.listas,
                            operation:"view",
                            isSaveActive:false,
                            response,
                        },
                    })
                    .afterOpened().pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((responseDialog) => {
                        setTimeout(() => {
                            sessionStorage.removeItem('loading');
                        }, 500);

                    });
            },
            error: (error) => {
                setTimeout(() => {
                    sessionStorage.removeItem('loading');
                }, 500);
            },
        });
    }

    getDescriptionList(id: number, arr: any[] = []): string {
        let list = arr.filter((item) => item.id == id);
        if (list.length) {
            return list[0].descripcion;
        }
        return '';
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
