import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GestionarCronogramaPlanillaService } from 'app/core/services/configuraciones-generales/gestionar-cronograma-planilla.service';
import { ModalGestionarCronogramaPlanillaComponent } from '../../components/modals/modal-gestionar-cronograma-planilla/modal-gestionar-cronograma-planilla.component';

@Component({
    selector: 'gestionar-cronograma-planilla',
    templateUrl: './gestionar-cronograma-planilla.component.html',
    styleUrls: ['./gestionar-cronograma-planilla.component.scss'],
})
export class GestionarCronogramaPlanillaComponent {
    private ngUnsubscribe = new Subject<void>();
    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'executingUnit',
        'payType',
        'payrollType',
        'year',
        'month',
        'status',
        'opciones',
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    listas = {
        executingUnit: [],
        payType: [],
        payrollType: [],
        year: [],
        month: [],
    };

    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private materialDialog: MatDialog,
        private _gestionarCronogramaPlanillaService: GestionarCronogramaPlanillaService
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
            this._gestionarCronogramaPlanillaService
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
            executingUnit: [{ value: '', disabled: true }],
            payType: [{ value: '', disabled: true }],
            payrollType: [{ value: '', disabled: true }],
            year: [{ value: '', disabled: true }],
            month: [{ value: '', disabled: true }],
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
        .open(ModalGestionarCronogramaPlanillaComponent, {
            disableClose: true,
            width: '40%',
            data: {
                title: 'Nueva cronograma de planillas',
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
