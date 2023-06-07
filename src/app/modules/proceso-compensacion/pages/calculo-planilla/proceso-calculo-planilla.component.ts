import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CalculoPlanilla } from 'app/core/models/proceso-compensacion/calculo-planilla';
import { CalculoPlanillaService } from 'app/core/services/proceso-compensacion/calculo-planilla.service';
import { DetalleCalculoPlanillaComponent } from '../../components/modals/calculo-planilla/detalle-calculo-planilla/detalle-calculo-planilla.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'proceso-calculo-planilla',
    templateUrl: './proceso-calculo-planilla.component.html',
    styleUrls: ['./proceso-calculo-planilla.component.scss'],
})
export class ProcesoCalculoPlanillaComponent {
    private ngUnsubscribe = new Subject<void>();

    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    combo = { lista: [] };

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'planilla',
        'tipo_pago',
        'correlativo',
        'estado_proceso',
        'opciones',
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    listas = {
        unidadEjecutora: [],
        tipoPago: [],
        planilla:[],
        estadoPeriodo:[],
        meses:[],
        tipoPlanilla:[],
        regimenLaboral:[]
    };

    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private materialDialog: MatDialog,
        private _calculoPlanillaService: CalculoPlanillaService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.buildForm();
        this.buildPaginators(this.paginator);
        this.cargarGrilla();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
     }

    ngAfterViewInit() {
        sessionStorage.setItem('loading', 'Obteniendo datos');
        this._calculoPlanillaService.getLists().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
            const {estadoPeriodo,meses,planilla,regimenLaboral, tipoPago,tipoPlanilla,unidadEjecutora } = response;
            this.listas.unidadEjecutora = unidadEjecutora;
            this.listas.tipoPago = tipoPago;
            this.listas.planilla=planilla;
            this.listas.estadoPeriodo=estadoPeriodo;
            this.listas.meses=meses;
            this.listas.tipoPlanilla=tipoPlanilla;
            this.listas.regimenLaboral=regimenLaboral;
            console.log('listas', response);
            setTimeout(() => {
                this._calculoPlanillaService
                    .findAll().pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((response) => {
                        let data = response.map((item:CalculoPlanilla)=>({
                            'id':item.id,
                            'planilla':this.getDescriptionList(item.executingUnitId,"label",this.listas.planilla),
                            'tipo_pago':this.getDescriptionList(item.paymentTypeId,"label",this.listas.tipoPago),
                            'correlativo':item.correlative,
                            'estado_proceso':this.getDescriptionList(item.periodStatusId,"label",this.listas.estadoPeriodo),
                            'procesado':item.procesado
                        }));
                        console.log(response);
                        this.cargarGrilla(data);
                        sessionStorage.removeItem('loading');
                    });
            }, 200);
        });
    }

    buildForm() {
        this.form = this.formBuilder.group({
            unidad_ejecutora: [{ value: 'UGEL 02 - Lince', disabled: true }],
            ano: [{ value: '', disabled: true }],
            mes: [{ value: '', disabled: true }],
            tipo_planilla: [{ value: '', disabled: true }],
            planilla: [{ value: '', disabled: true }],
            tipo_pago: [{ value: '', disabled: true }],
            correlativo: [{ value: '', disabled: true }],
        });
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

    handleCrear(): void {}

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
        this._calculoPlanillaService.findOne(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
            next: (response) => {
                this.dialogRef = this.materialDialog
                    .open(DetalleCalculoPlanillaComponent, {
                        disableClose: true,
                        width: '53%',
                        data: {
                            title: 'Cálculo de planilla',
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



        // this.dialogRef = this.materialDialog.open(DetalleCalculoPlanillaComponent, {
        //     disableClose: true,
        //     width: '53%',
        //     data: {
        //         title: 'Cálculo de planilla',
        //     },
        // });
    }

    getDescriptionList(
        id: number,
        prop: string = 'label',
        arr: any[] = []
    ): string {
        let list = arr.filter((item) => item.id == id);
        if (list.length) {
            return list[0][prop] ?? '';
        }
        return '';
    }


}
