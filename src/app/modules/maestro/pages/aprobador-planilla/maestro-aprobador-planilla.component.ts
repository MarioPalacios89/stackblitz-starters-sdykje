import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAprobadorPlanillaComponent } from '../../components/modals/modal-aprobador-planilla/modal-aprobador-planilla.component';
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
    selector: 'maestro-aprobador-planilla',
    templateUrl: './maestro-aprobador-planilla.component.html',
    styleUrls: ['./maestro-aprobador-planilla.component.scss'],
    providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class MaestroAprobadorPlanillaComponent {
    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    combo = { lista: [] };

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'unidad_ejecutora',
        'rol',
        'tipo_pago',
        'nivel_aprobacion',
        'usuario',
        'estado',
        'fecha_inicio',
        'fecha_fin',
        'opciones',
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    constructor(
        private formBuilder: FormBuilder,
        private materialDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.buildForm();
        this.buildPaginators(this.paginator);
    }

    ngAfterViewInit() {
        this.cargarGrilla();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            usuario: [null],
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
    cargarGrilla(autoSearch: boolean = false) {
        let dataDemo = [{
            "unidad_ejecutora": "UE1",
            "rol": "Administrador",
            "tipo_pago": "Tarjeta de crédito",
            "nivel_aprobacion": 3,
            "usuario": "jcoyne0",
            "estado": false,
            "fecha_inicio": "8/31/2022",
            "fecha_fin": "8/30/2021"
          }, {
            "unidad_ejecutora": "UE2",
            "rol": "Usuario",
            "tipo_pago": "Efectivo",
            "nivel_aprobacion": 10,
            "usuario": "rfronsek1",
            "estado": false,
            "fecha_inicio": "4/29/2020",
            "fecha_fin": "7/18/2020"
          }, {
            "unidad_ejecutora": "UE2",
            "rol": "Invitado",
            "tipo_pago": "Tarjeta de crédito",
            "nivel_aprobacion": 10,
            "usuario": "jlighton2",
            "estado": false,
            "fecha_inicio": "5/24/2022",
            "fecha_fin": "2/12/2022"
          }, {
            "unidad_ejecutora": "UE3",
            "rol": "Invitado",
            "tipo_pago": "Tarjeta de crédito",
            "nivel_aprobacion": 5,
            "usuario": "pbesse3",
            "estado": true,
            "fecha_inicio": "8/8/2022",
            "fecha_fin": "8/26/2021"
          }, {
            "unidad_ejecutora": "UE1",
            "rol": "Administrador",
            "tipo_pago": "Transferencia bancaria",
            "nivel_aprobacion": 8,
            "usuario": "atejero4",
            "estado": true,
            "fecha_inicio": "5/4/2021",
            "fecha_fin": "11/6/2022"
          }, {
            "unidad_ejecutora": "UE2",
            "rol": "Administrador",
            "tipo_pago": "Transferencia bancaria",
            "nivel_aprobacion": 7,
            "usuario": "tperrott5",
            "estado": true,
            "fecha_inicio": "5/30/2022",
            "fecha_fin": "3/28/2020"
          }, {
            "unidad_ejecutora": "UE3",
            "rol": "Usuario",
            "tipo_pago": "Transferencia bancaria",
            "nivel_aprobacion": 9,
            "usuario": "bcolbourn6",
            "estado": false,
            "fecha_inicio": "5/4/2022",
            "fecha_fin": "2/27/2021"
          }, {
            "unidad_ejecutora": "UE2",
            "rol": "Usuario",
            "tipo_pago": "Efectivo",
            "nivel_aprobacion": 4,
            "usuario": "jellor7",
            "estado": false,
            "fecha_inicio": "1/3/2022",
            "fecha_fin": "1/16/2021"
          }, {
            "unidad_ejecutora": "UE1",
            "rol": "Usuario",
            "tipo_pago": "Transferencia bancaria",
            "nivel_aprobacion": 7,
            "usuario": "ppittock8",
            "estado": true,
            "fecha_inicio": "8/19/2020",
            "fecha_fin": "1/16/2020"
          }, {
            "unidad_ejecutora": "UE1",
            "rol": "Invitado",
            "tipo_pago": "Transferencia bancaria",
            "nivel_aprobacion": 4,
            "usuario": "eantonucci9",
            "estado": true,
            "fecha_inicio": "5/19/2020",
            "fecha_fin": "3/10/2021"
          }, {
            "unidad_ejecutora": "UE2",
            "rol": "Usuario",
            "tipo_pago": "Efectivo",
            "nivel_aprobacion": 4,
            "usuario": "bmcalla",
            "estado": false,
            "fecha_inicio": "7/11/2022",
            "fecha_fin": "11/12/2020"
          }, {
            "unidad_ejecutora": "UE2",
            "rol": "Usuario",
            "tipo_pago": "Tarjeta de crédito",
            "nivel_aprobacion": 3,
            "usuario": "uphilliskirkb",
            "estado": true,
            "fecha_inicio": "6/19/2020",
            "fecha_fin": "12/10/2020"
          }, {
            "unidad_ejecutora": "UE2",
            "rol": "Invitado",
            "tipo_pago": "Transferencia bancaria",
            "nivel_aprobacion": 6,
            "usuario": "lhainningc",
            "estado": true,
            "fecha_inicio": "4/20/2021",
            "fecha_fin": "5/25/2020"
          }, {
            "unidad_ejecutora": "UE3",
            "rol": "Usuario",
            "tipo_pago": "Efectivo",
            "nivel_aprobacion": 10,
            "usuario": "plabbetd",
            "estado": false,
            "fecha_inicio": "2/22/2022",
            "fecha_fin": "3/14/2022"
          }, {
            "unidad_ejecutora": "UE1",
            "rol": "Usuario",
            "tipo_pago": "Transferencia bancaria",
            "nivel_aprobacion": 4,
            "usuario": "clutmane",
            "estado": false,
            "fecha_inicio": "4/27/2022",
            "fecha_fin": "9/3/2022"
          }, {
            "unidad_ejecutora": "UE1",
            "rol": "Invitado",
            "tipo_pago": "Transferencia bancaria",
            "nivel_aprobacion": 7,
            "usuario": "jjoronf",
            "estado": false,
            "fecha_inicio": "11/27/2020",
            "fecha_fin": "8/17/2021"
          }, {
            "unidad_ejecutora": "UE3",
            "rol": "Usuario",
            "tipo_pago": "Efectivo",
            "nivel_aprobacion": 5,
            "usuario": "sviciosog",
            "estado": true,
            "fecha_inicio": "3/16/2021",
            "fecha_fin": "1/26/2022"
          }, {
            "unidad_ejecutora": "UE2",
            "rol": "Usuario",
            "tipo_pago": "Tarjeta de crédito",
            "nivel_aprobacion": 10,
            "usuario": "leixenbergerh",
            "estado": false,
            "fecha_inicio": "11/4/2022",
            "fecha_fin": "3/28/2021"
          }, {
            "unidad_ejecutora": "UE2",
            "rol": "Administrador",
            "tipo_pago": "Efectivo",
            "nivel_aprobacion": 3,
            "usuario": "swinmilli",
            "estado": false,
            "fecha_inicio": "1/13/2022",
            "fecha_fin": "9/30/2021"
          }, {
            "unidad_ejecutora": "UE3",
            "rol": "Administrador",
            "tipo_pago": "Tarjeta de crédito",
            "nivel_aprobacion": 2,
            "usuario": "tabrashkinj",
            "estado": false,
            "fecha_inicio": "3/22/2020",
            "fecha_fin": "10/15/2022"
          }];
        this.dataSource = new MatTableDataSource(dataDemo);
        this.dataSource.paginator = this.paginator;
    }

    handleCrear(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalAprobadorPlanillaComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Nuevo aprobador de planilla',
                listas: this.combo,
                operation:"create",
                isSaveActive:false,
            },
        })
        .afterOpened()
        .subscribe((responseDialog) => {
            setTimeout(() => {
                sessionStorage.removeItem('loading');
            }, 500);

        });
    }

    handleExportar(): void {}

    handleBuscar(): void {}

    handleLimpiar(): void {}
}
