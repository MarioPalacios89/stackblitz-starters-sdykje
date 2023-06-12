import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalTerceroComponent } from '../../components/modals/tercero/modal-tercero/modal-tercero.component';
import { DetalleTerceroComponent } from '../../components/modals/tercero/detalle-tercero/detalle-tercero.component';

@Component({
    selector: 'maestro-tercero',
    templateUrl: './maestro-tercero.component.html',
    styleUrls: ['./maestro-tercero.component.scss'],
})
export class MaestroTerceroComponent {
    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    combo = { lista: [] };

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'codigo',
        'nombre',
        'grupo',
        'cpto',
        'estado',
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
            nombre_entidad: [null],
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
        let dataDemo = [
            {
                codigo: 856,
                nombre: 'Treeflex',
                grupo: 'C',
                cpto: 'Statistician IV',
                estado: true,
            },
            {
                codigo: 5668,
                nombre: 'Holdlamis',
                grupo: 'D',
                cpto: 'Research Assistant III',
                estado: true,
            },
            {
                codigo: 4018,
                nombre: 'Zontrax',
                grupo: 'A',
                cpto: 'Business Systems Development Analyst',
                estado: false,
            },
            {
                codigo: 7122,
                nombre: 'Alpha',
                grupo: 'C',
                cpto: 'Analog Circuit Design manager',
                estado: false,
            },
            {
                codigo: 6251,
                nombre: 'Matsoft',
                grupo: 'D',
                cpto: 'Structural Analysis Engineer',
                estado: true,
            },
            {
                codigo: 6453,
                nombre: 'Biodex',
                grupo: 'D',
                cpto: 'Office Assistant III',
                estado: true,
            },
            {
                codigo: 4851,
                nombre: 'Tresom',
                grupo: 'C',
                cpto: 'Director of Sales',
                estado: false,
            },
            {
                codigo: 6287,
                nombre: 'Ronstring',
                grupo: 'A',
                cpto: 'Account Coordinator',
                estado: false,
            },
            {
                codigo: 4985,
                nombre: 'Fix San',
                grupo: 'D',
                cpto: 'Technical Writer',
                estado: true,
            },
            {
                codigo: 1997,
                nombre: 'Bytecard',
                grupo: 'A',
                cpto: 'Geological Engineer',
                estado: true,
            },
            {
                codigo: 968,
                nombre: 'Alpha',
                grupo: 'C',
                cpto: 'Senior Developer',
                estado: true,
            },
            {
                codigo: 5216,
                nombre: 'Alphazap',
                grupo: 'C',
                cpto: 'Registered Nurse',
                estado: true,
            },
            {
                codigo: 2987,
                nombre: 'Bytecard',
                grupo: 'A',
                cpto: 'Nuclear Power Engineer',
                estado: false,
            },
            {
                codigo: 6696,
                nombre: 'Rank',
                grupo: 'C',
                cpto: 'Developer IV',
                estado: false,
            },
            {
                codigo: 8858,
                nombre: 'Stronghold',
                grupo: 'B',
                cpto: 'Human Resources Assistant IV',
                estado: true,
            },
            {
                codigo: 6721,
                nombre: 'Biodex',
                grupo: 'C',
                cpto: 'Nurse Practicioner',
                estado: false,
            },
            {
                codigo: 6435,
                nombre: 'Trippledex',
                grupo: 'A',
                cpto: 'Statistician III',
                estado: true,
            },
            {
                codigo: 4205,
                nombre: 'Flexidy',
                grupo: 'C',
                cpto: 'Account Coordinator',
                estado: false,
            },
            {
                codigo: 997,
                nombre: 'Ventosanzap',
                grupo: 'B',
                cpto: 'Cost Accountant',
                estado: true,
            },
            {
                codigo: 2954,
                nombre: 'Fix San',
                grupo: 'C',
                cpto: 'Sales Associate',
                estado: true,
            },
        ];
        this.dataSource = new MatTableDataSource(dataDemo);
        this.dataSource.paginator = this.paginator;
    }

    handleCrear(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
            .open(ModalTerceroComponent, {
                disableClose: true,
                width: '55%',
                data: {
                    title: 'Nueva maestro tercero',
                    listas: this.combo,
                    operation: 'create',
                    isSaveActive: false,
                },
            })
            .afterOpened()
            .subscribe((responseDialog) => {
                setTimeout(() => {
                    sessionStorage.removeItem('loading');
                }, 500);
            });
    }

    handleModificar(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
            .open(ModalTerceroComponent, {
                disableClose: true,
                width: '55%',
                data: {
                    title: 'Actualizar maestro tercero',
                    listas: this.combo,
                    operation: 'update',
                    isSaveActive: false,
                },
            })
            .afterOpened()
            .subscribe((responseDialog) => {
                setTimeout(() => {
                    sessionStorage.removeItem('loading');
                }, 500);
            });
    }

    handleDetalle(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
            .open(DetalleTerceroComponent, {
                disableClose: true,
                width: '55%',
                data: {
                    title: 'Detalle alcance tercero',
                    listas: this.combo,
                    operation: 'view',
                    isSaveActive: false,
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
