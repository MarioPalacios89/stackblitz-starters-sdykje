import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AperturaPeriodoService } from 'app/core/services/proceso-compensacion/apertura-periodo.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'proceso-apertura-periodo',
    templateUrl: './proceso-apertura-periodo.component.html',
    styleUrls: ['./proceso-apertura-periodo.component.scss'],
})
export class ProcesoAperturaPeriodoComponent {
    private ngUnsubscribe = new Subject<void>();

    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'tipo_planilla',
        'planilla',
        'tipo_pago',
        'correlativo',
        'estado',
        'opciones',
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    listas = {
        ano: [],
        mes: [],
        tipo_planilla: [],
        planilla: [],
        tipo_pago: [],
        correlativo: [],
    };

    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private materialDialog: MatDialog,
        private _aperturaPeriodoService: AperturaPeriodoService
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
            this._aperturaPeriodoService.findAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
                this.cargarGrilla(response);
                sessionStorage.removeItem('loading');
            });

    }

    buildForm() {
        this.form = this.formBuilder.group({
            unidad_ejecutora: [{ value: 'UGEL 02 - Lince', disabled: true }],
            ano: [{ value: '', disabled: false }],
            mes: [{ value: '', disabled: false }],
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
}
