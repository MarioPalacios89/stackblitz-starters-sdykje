import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BancoService } from 'app/core/services/maestro/banco.service';
import { ModalBancoComponent } from '../../components/modals/modal-banco/modal-banco.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'maestro-banco',
    templateUrl: './maestro-banco.component.html',
    styleUrls: ['./maestro-banco.component.scss'],
})
export class MaestroBancoComponent {
    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    combo = { lista: [] };

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'codigo_banco',
        'descripcion_banco',
        'ruc',
        'sigla',
        'telefono',
        'codigo_sunat',
        'departamento',
        'direccion',
        'estado',
        'motivo_anulacion',
        'opciones',
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    private ngUnsubscribe = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private _bancoService: BancoService,
        private materialDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.buildForm();
        this.buildPaginators(this.paginator);
        this.cargarGrilla();
    }

    ngAfterViewInit() {
        sessionStorage.setItem('loading', 'Obteniendo datos');
        setTimeout(() => {
            this._bancoService.findAll().subscribe((response) => {
                this.cargarGrilla(response);
                sessionStorage.removeItem('loading');
            });
        }, 200);
    }

    buildForm() {
        this.form = this.formBuilder.group({
            descripcion_banco: [{value:'',disabled:true}],
            ruc: [{value:'',disabled:true}],
            sigla: [{value:'',disabled:true}],
            estado: [{value:'',disabled:true}],
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


    handleExportar(): void {}

    handleBuscar(): void {}

    handleLimpiar(): void {}

    handleCrear(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalBancoComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Nuevo banco',
                listas: this.combo,
                operation:"create",
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

    handleModificar(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalBancoComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Actualizar banco',
                listas: this.combo,
                operation:"update",
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

    handleDetalle(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalBancoComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Visualizar banco',
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
}
