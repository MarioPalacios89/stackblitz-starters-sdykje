import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalIndiceIncrementoCategoriaComponent } from '../../components/modals/modal-indice-incremento-categoria/modal-indice-incremento-categoria.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'indice-incremento-categoria',
    templateUrl: './indice-incremento-categoria.component.html',
    styleUrls: ['./indice-incremento-categoria.component.scss'],
})
export class IndiceIncrementoCategoriaComponent {
    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    combo = { lista: [] };

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'regimen_laboral',
        'codigo',
        'escala_magisterial',
        'abreviatura',
        'porcentaje',
        'fecha_inicio',
        'fecha_fin',
        'estado',
        'opciones',
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    private ngUnsubscribe = new Subject<void>();

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
            regimen_laboral: [null],
            descripcion: [null],
            estado: [null],
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
            "regimen_laboral": "privado",
            "codigo": 1917,
            "escala_magisterial": "inicial",
            "abreviatura": "RLPF",
            "porcentaje": 35.0,
            "fecha_inicio": "9/21/2006",
            "fecha_fin": "3/8/2009",
            "estado": true
          }, {
            "regimen_laboral": "publico",
            "codigo": 6117,
            "escala_magisterial": "primaria",
            "abreviatura": "RLP",
            "porcentaje": 44.0,
            "fecha_inicio": "10/13/2016",
            "fecha_fin": "6/1/2009",
            "estado": true
          }, {
            "regimen_laboral": "mixto",
            "codigo": 9653,
            "escala_magisterial": "inicial",
            "abreviatura": "RLPF",
            "porcentaje": 51.17,
            "fecha_inicio": "2/9/2003",
            "fecha_fin": "8/15/2015",
            "estado": false
          }, {
            "regimen_laboral": "publico",
            "codigo": 5750,
            "escala_magisterial": "secundaria",
            "abreviatura": "RLP",
            "porcentaje": 83.79,
            "fecha_inicio": "1/14/2014",
            "fecha_fin": "7/22/2005",
            "estado": true
          }, {
            "regimen_laboral": "privado",
            "codigo": 3240,
            "escala_magisterial": "superior",
            "abreviatura": "RLPV",
            "porcentaje": 76.8,
            "fecha_inicio": "10/24/2006",
            "fecha_fin": "12/1/2022",
            "estado": true
          }, {
            "regimen_laboral": "mixto",
            "codigo": 1554,
            "escala_magisterial": "superior",
            "abreviatura": "RLP",
            "porcentaje": 48.35,
            "fecha_inicio": "7/4/2017",
            "fecha_fin": "8/13/2003",
            "estado": true
          }, {
            "regimen_laboral": "mixto",
            "codigo": 4621,
            "escala_magisterial": "inicial",
            "abreviatura": "RLP",
            "porcentaje": 41.93,
            "fecha_inicio": "2/26/2010",
            "fecha_fin": "10/12/2007",
            "estado": false
          }, {
            "regimen_laboral": "publico",
            "codigo": 2072,
            "escala_magisterial": "primaria",
            "abreviatura": "RLP",
            "porcentaje": 45.64,
            "fecha_inicio": "6/27/2013",
            "fecha_fin": "2/24/2004",
            "estado": true
          }, {
            "regimen_laboral": "privado",
            "codigo": 5609,
            "escala_magisterial": "superior",
            "abreviatura": "RLPF",
            "porcentaje": 26.89,
            "fecha_inicio": "3/3/2018",
            "fecha_fin": "4/20/2000",
            "estado": true
          }, {
            "regimen_laboral": "publico",
            "codigo": 8827,
            "escala_magisterial": "secundaria",
            "abreviatura": "RLPF",
            "porcentaje": 8.47,
            "fecha_inicio": "4/11/2006",
            "fecha_fin": "8/15/2018",
            "estado": false
          }, {
            "regimen_laboral": "privado",
            "codigo": 2204,
            "escala_magisterial": "secundaria",
            "abreviatura": "RLPV",
            "porcentaje": 36.48,
            "fecha_inicio": "4/19/2019",
            "fecha_fin": "9/18/2022",
            "estado": true
          }, {
            "regimen_laboral": "mixto",
            "codigo": 1835,
            "escala_magisterial": "superior",
            "abreviatura": "RLPV",
            "porcentaje": 99.73,
            "fecha_inicio": "12/10/2006",
            "fecha_fin": "3/29/2011",
            "estado": false
          }, {
            "regimen_laboral": "mixto",
            "codigo": 5534,
            "escala_magisterial": "inicial",
            "abreviatura": "RLPF",
            "porcentaje": 27.4,
            "fecha_inicio": "11/5/2011",
            "fecha_fin": "3/21/2001",
            "estado": true
          }, {
            "regimen_laboral": "publico",
            "codigo": 8510,
            "escala_magisterial": "primaria",
            "abreviatura": "RLP",
            "porcentaje": 34.65,
            "fecha_inicio": "7/26/2018",
            "fecha_fin": "9/19/2021",
            "estado": true
          }, {
            "regimen_laboral": "privado",
            "codigo": 6379,
            "escala_magisterial": "primaria",
            "abreviatura": "RLP",
            "porcentaje": 97.64,
            "fecha_inicio": "8/29/2022",
            "fecha_fin": "10/20/2012",
            "estado": true
          }, {
            "regimen_laboral": "privado",
            "codigo": 2979,
            "escala_magisterial": "inicial",
            "abreviatura": "RLP",
            "porcentaje": 43.85,
            "fecha_inicio": "4/20/2000",
            "fecha_fin": "12/15/2019",
            "estado": false
          }, {
            "regimen_laboral": "publico",
            "codigo": 4112,
            "escala_magisterial": "primaria",
            "abreviatura": "RLPF",
            "porcentaje": 39.52,
            "fecha_inicio": "3/29/2017",
            "fecha_fin": "4/9/2003",
            "estado": true
          }, {
            "regimen_laboral": "mixto",
            "codigo": 5420,
            "escala_magisterial": "secundaria",
            "abreviatura": "RLP",
            "porcentaje": 40.02,
            "fecha_inicio": "12/17/2001",
            "fecha_fin": "7/9/2004",
            "estado": false
          }, {
            "regimen_laboral": "mixto",
            "codigo": 5160,
            "escala_magisterial": "inicial",
            "abreviatura": "RLP",
            "porcentaje": 34.27,
            "fecha_inicio": "7/16/2013",
            "fecha_fin": "4/25/2011",
            "estado": false
          }, {
            "regimen_laboral": "publico",
            "codigo": 6885,
            "escala_magisterial": "secundaria",
            "abreviatura": "RLPF",
            "porcentaje": 71.58,
            "fecha_inicio": "11/5/2010",
            "fecha_fin": "9/3/2007",
            "estado": false
          }];
        this.dataSource = new MatTableDataSource(dataDemo);
        this.dataSource.paginator = this.paginator;
    }

    handleCrear(): void {
                sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalIndiceIncrementoCategoriaComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Nuevo detalle indice',
                listas: this.combo,
                operation:"create",
                isSaveActive:true,
            },
        })
        .afterOpened().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((responseDialog) => {
            setTimeout(() => {
                sessionStorage.removeItem('loading');
            }, 500);

        });
    }

    handleExportar(): void {}

    handleBuscar(): void {}

    handleLimpiar(): void {}

    handleModificar(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalIndiceIncrementoCategoriaComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Actualizar detalle indice',
                listas: this.combo,
                operation:"update",
                isSaveActive:true,
            },
        })
        .afterOpened().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((responseDialog) => {
            setTimeout(() => {
                sessionStorage.removeItem('loading');
            }, 500);

        });
    }

    handleDetalle(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalIndiceIncrementoCategoriaComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Visualizar detalle indice',
                listas: this.combo,
                operation:"view",
                isSaveActive:false,
            },
        })
        .afterOpened().pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((responseDialog) => {
            setTimeout(() => {
                sessionStorage.removeItem('loading');
            }, 500);

        });
    }


    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
