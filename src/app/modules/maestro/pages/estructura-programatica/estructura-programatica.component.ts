import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalEstructuraProgramaticaComponent } from '../../components/modals/modal-estructura-programatica/modal-estructura-programatica.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'estructura-programatica',
    templateUrl: './estructura-programatica.component.html',
    styleUrls: ['./estructura-programatica.component.scss'],
})
export class EstructuraProgramaticaComponent {
    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    combo = { lista: [] };

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'ano',
        'programa_presupuestal',
        'producto',
        'actividad',
        'funcion',
        'division_funcional',
        'grupo_funcional',
        'finalidad',
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
            ano: [""],
            producto: [""],
            actividad: [""],
            funcion: [""],
            division_funcional: [""],
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
            "ano": 2014,
            "programa_presupuestal": "Programa B",
            "producto": "Producto 1",
            "actividad": "Actividad B",
            "funcion": "Funcion B",
            "division_funcional": "División C",
            "grupo_funcional": "Grupo A",
            "finalidad": "Finalidad B",
            "estado": true
          }, {
            "ano": 2008,
            "programa_presupuestal": "Programa C",
            "producto": "Producto 2",
            "actividad": "Actividad C",
            "funcion": "Funcion A",
            "division_funcional": "División C",
            "grupo_funcional": "Grupo A",
            "finalidad": "Finalidad C",
            "estado": false
          }, {
            "ano": 2006,
            "programa_presupuestal": "Programa B",
            "producto": "Producto 3",
            "actividad": "Actividad A",
            "funcion": "Funcion A",
            "division_funcional": "División B",
            "grupo_funcional": "Grupo C",
            "finalidad": "Finalidad B",
            "estado": true
          }, {
            "ano": 2022,
            "programa_presupuestal": "Programa B",
            "producto": "Producto 3",
            "actividad": "Actividad B",
            "funcion": "Funcion C",
            "division_funcional": "División B",
            "grupo_funcional": "Grupo A",
            "finalidad": "Finalidad C",
            "estado": false
          }, {
            "ano": 2000,
            "programa_presupuestal": "Programa A",
            "producto": "Producto 2",
            "actividad": "Actividad C",
            "funcion": "Funcion C",
            "division_funcional": "División A",
            "grupo_funcional": "Grupo C",
            "finalidad": "Finalidad C",
            "estado": true
          }, {
            "ano": 2000,
            "programa_presupuestal": "Programa A",
            "producto": "Producto 2",
            "actividad": "Actividad A",
            "funcion": "Funcion C",
            "division_funcional": "División A",
            "grupo_funcional": "Grupo A",
            "finalidad": "Finalidad C",
            "estado": false
          }, {
            "ano": 2020,
            "programa_presupuestal": "Programa A",
            "producto": "Producto 1",
            "actividad": "Actividad A",
            "funcion": "Funcion C",
            "division_funcional": "División B",
            "grupo_funcional": "Grupo B",
            "finalidad": "Finalidad C",
            "estado": false
          }, {
            "ano": 2001,
            "programa_presupuestal": "Programa A",
            "producto": "Producto 2",
            "actividad": "Actividad C",
            "funcion": "Funcion A",
            "division_funcional": "División B",
            "grupo_funcional": "Grupo A",
            "finalidad": "Finalidad B",
            "estado": false
          }, {
            "ano": 2007,
            "programa_presupuestal": "Programa B",
            "producto": "Producto 2",
            "actividad": "Actividad B",
            "funcion": "Funcion C",
            "division_funcional": "División C",
            "grupo_funcional": "Grupo A",
            "finalidad": "Finalidad C",
            "estado": true
          }, {
            "ano": 2021,
            "programa_presupuestal": "Programa B",
            "producto": "Producto 3",
            "actividad": "Actividad B",
            "funcion": "Funcion C",
            "division_funcional": "División A",
            "grupo_funcional": "Grupo B",
            "finalidad": "Finalidad B",
            "estado": false
          }, {
            "ano": 2001,
            "programa_presupuestal": "Programa A",
            "producto": "Producto 2",
            "actividad": "Actividad B",
            "funcion": "Funcion C",
            "division_funcional": "División C",
            "grupo_funcional": "Grupo C",
            "finalidad": "Finalidad C",
            "estado": true
          }, {
            "ano": 2019,
            "programa_presupuestal": "Programa A",
            "producto": "Producto 1",
            "actividad": "Actividad A",
            "funcion": "Funcion B",
            "division_funcional": "División B",
            "grupo_funcional": "Grupo B",
            "finalidad": "Finalidad A",
            "estado": false
          }, {
            "ano": 2022,
            "programa_presupuestal": "Programa B",
            "producto": "Producto 2",
            "actividad": "Actividad A",
            "funcion": "Funcion A",
            "division_funcional": "División C",
            "grupo_funcional": "Grupo C",
            "finalidad": "Finalidad A",
            "estado": "Estado A"
          }, {
            "ano": 2017,
            "programa_presupuestal": "Programa A",
            "producto": "Producto 2",
            "actividad": "Actividad C",
            "funcion": "Funcion A",
            "division_funcional": "División B",
            "grupo_funcional": "Grupo B",
            "finalidad": "Finalidad C",
            "estado": "Estado C"
          }, {
            "ano": 2004,
            "programa_presupuestal": "Programa A",
            "producto": "Producto 3",
            "actividad": "Actividad C",
            "funcion": "Funcion B",
            "division_funcional": "División A",
            "grupo_funcional": "Grupo A",
            "finalidad": "Finalidad A",
            "estado": "Estado A"
          }, {
            "ano": 2004,
            "programa_presupuestal": "Programa B",
            "producto": "Producto 2",
            "actividad": "Actividad C",
            "funcion": "Funcion C",
            "division_funcional": "División B",
            "grupo_funcional": "Grupo A",
            "finalidad": "Finalidad A",
            "estado": "Estado C"
          }, {
            "ano": 2015,
            "programa_presupuestal": "Programa A",
            "producto": "Producto 3",
            "actividad": "Actividad B",
            "funcion": "Funcion C",
            "division_funcional": "División A",
            "grupo_funcional": "Grupo A",
            "finalidad": "Finalidad A",
            "estado": "Estado A"
          }, {
            "ano": 2021,
            "programa_presupuestal": "Programa C",
            "producto": "Producto 2",
            "actividad": "Actividad A",
            "funcion": "Funcion A",
            "division_funcional": "División C",
            "grupo_funcional": "Grupo C",
            "finalidad": "Finalidad B",
            "estado": "Estado A"
          }, {
            "ano": 2008,
            "programa_presupuestal": "Programa B",
            "producto": "Producto 1",
            "actividad": "Actividad C",
            "funcion": "Funcion A",
            "division_funcional": "División B",
            "grupo_funcional": "Grupo B",
            "finalidad": "Finalidad A",
            "estado": "Estado B"
          }, {
            "ano": 2018,
            "programa_presupuestal": "Programa B",
            "producto": "Producto 1",
            "actividad": "Actividad C",
            "funcion": "Funcion B",
            "division_funcional": "División A",
            "grupo_funcional": "Grupo C",
            "finalidad": "Finalidad A",
            "estado": "Estado A"
          }];
        this.dataSource = new MatTableDataSource(dataDemo);
        this.dataSource.paginator = this.paginator;
    }

    handleCrear(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalEstructuraProgramaticaComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Nueva estructura programatica',
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
        .open(ModalEstructuraProgramaticaComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Actualizar estructura programatica',
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
        .open(ModalEstructuraProgramaticaComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Visualizar estructura programatica',
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
