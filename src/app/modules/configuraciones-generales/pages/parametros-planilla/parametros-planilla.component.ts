import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParametrosPlanillaService } from 'app/core/services/configuraciones-generales/parametros-planilla.service';
import { ModalParametrosPlanillaComponent } from '../../components/modals/modal-parametros-planilla/modal-parametros-planilla.component';

@Component({
    selector: 'parametros-planilla',
    templateUrl: './parametros-planilla.component.html',
    styleUrls: ['./parametros-planilla.component.scss'],
})
export class ParametrosPlanillaComponent {
    private ngUnsubscribe = new Subject<void>();
    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'code',
        'description',
        'value',
        'startDate',
        'endDate',
        'parameterType',
        'status',
        'cancellationReason',
        'opciones'
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    listas = { parameterType: [], status: [] };

    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private materialDialog: MatDialog,
        private _parametrosPlanillaService: ParametrosPlanillaService
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
        sessionStorage.setItem('loading', 'Obteniendo registro');
        setTimeout(() => {
            this._parametrosPlanillaService
                .findAll()
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe({
                    next: (response) => {
                        this.cargarGrilla(response);
                        sessionStorage.removeItem('loading');
                    },
                    error: (error) => {
                        sessionStorage.removeItem('loading');
                    },
                });
        }, 200);
    }

    buildForm() {
        this.form = this.formBuilder.group({
            description: [{ value: '', disabled: true }],
            parameterType: [{ value: '', disabled: true }],
            status: [{ value: '', disabled: true }],
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

    handleCrear(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalParametrosPlanillaComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Nuevo parámetro',
                listas: this.listas,
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
}
