import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ServidorPublico } from 'app/core/models/proceso-compensacion/servidor-publico';
import { ServidorPublicoService } from 'app/core/services/proceso-compensacion/servidor-publico.service';
import { Subject, takeUntil } from 'rxjs';
import { DetalleServidorPublicoComponent } from '../../components/modals/servidor-publico/detalle-servidor-publico/detalle-servidor-publico.component';

@Component({
    selector: 'proceso-servidor-publico',
    templateUrl: './proceso-servidor-publico.component.html',
    styleUrls: ['./proceso-servidor-publico.component.scss'],
})
export class ProcesoServidorPublicoComponent {
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
        'documento',
        'apellidos_nombres',
        'unidad_ejecutora',
        'regimen_laboral',
        'codigo_plaza',
        'centro_trabajo',
        'fecha_ingreso',
        'fecha_termino',
        'situacion',
        'boleta',
        'opciones',
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    listas={
        persona:[],
        regimenLaboral:[],
        situacionLaboral:[],
        centroTrabajo:[]
    }

    constructor(
        private formBuilder: FormBuilder,
        private materialDialog: MatDialog,
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private _servidorPublicoService: ServidorPublicoService
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
        this._servidorPublicoService.obtenerListas().pipe(takeUntil(this.ngUnsubscribe)).subscribe((response) => {
            const { persona, regimenLaboral, situacionLaboral,centroTrabajo } =response;
            this.listas.persona=persona;
            this.listas.regimenLaboral=regimenLaboral;
            this.listas.situacionLaboral=situacionLaboral;
            this.listas.centroTrabajo=centroTrabajo;
            this.handleBuscar();
        });




    }

    buildForm() {
        this.form = this.formBuilder.group({
            tipo_documento: [{ value: '', disabled: true }],
            numero_documento: [{ value: '', disabled: false }],
            primer_apellido: [{ value: '', disabled: true }],
            segundo_apellido: [{ value: '', disabled: true }],
            nombres: [{ value: '', disabled: true }],
            cargo: [{ value: '', disabled: true }],
            unidad_ejecutora: [{ value: '', disabled: true }],
            codigo_modular: [{ value: '', disabled: true }],
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
/**s */
    handleBuscar(): void {
        sessionStorage.setItem('loading', 'Obteniendo datos');
        let numero=this.form.get("numero_documento").value;
        let obj=null;
        if(numero!=""){
            obj={tipo:109,numero}
        }
        this._servidorPublicoService
        .obtenerServidoresPublicos(obj)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response) => {
            let data=response.map((item:ServidorPublico)=>({
                'documento':this.getDescriptionList(item.personId,"numeroDocumento",this.listas.persona),
                'apellidos_nombres':this.getDescriptionList(item.personId,"label",this.listas.persona),
                'unidad_ejecutora':null,
                'regimen_laboral':this.getDescriptionList(item.laborRegimeId,"label",this.listas.regimenLaboral),
                'codigo_plaza':null,
                'centro_trabajo':this.getDescriptionList(item.workplaceId,"IdUGEL",this.listas.centroTrabajo),
                'fecha_ingreso':item.admissionDate,
                'fecha_termino':null,
                'situacion':this.getDescriptionList(item.workplaceId,"label",this.listas.situacionLaboral),
                'boleta':null
            }))
            console.log(response);
            this.cargarGrilla(data);
            sessionStorage.removeItem('loading');
        });

    }

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
        this._servidorPublicoService.findOne(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
            next: (response) => {
                this.dialogRef = this.materialDialog
                    .open(DetalleServidorPublicoComponent, {
                        disableClose: true,
                        width: '75%',
                        data: {
                            title: 'Detalle servidor público',
                            listas: this.listas,
                            operation:"view",
                            isSaveActive:false,
                            response
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

    getDescriptionList(id: number,prop:string="label",arr: any[] = []): string {
        let list = arr.filter((item) => item.id == id);
        if (list.length) {
            return list[0][prop]??'';
        }
        return '';
    }
}
