import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalConceptoPlameComponent } from '../../components/modals/modal-concepto-plame/modal-concepto-plame.component';

@Component({
    selector: 'maestro-concepto-plame',
    templateUrl: './maestro-concepto-plame.component.html',
    styleUrls: ['./maestro-concepto-plame.component.scss'],
})
export class MaestroConceptoPlameComponent {
    form: FormGroup;
    export: boolean = false;
    working: boolean = false;
    tiempoMensaje: number = 3000;
    max = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    combo = { lista: [] };

    dialogRef: any;
    displayedColumns: string[] = [
        'index',
        'concepto',
        'descripcion',
        'estado',
        'motivo_anulacion',
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
            codigo_concepto_plame: [null],
            descripcion_concepto_plame: [null],
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
            "concepto": "Devolución",
            "descripcion": "faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam",
            "estado": false,
            "motivo_anulacion": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus."
          }, {
            "concepto": "Devolución",
            "descripcion": "ac diam cras pellentesque volutpat dui maecenas tristique est et",
            "estado": true,
            "motivo_anulacion": "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
          }, {
            "concepto": "Compra",
            "descripcion": "posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi",
            "estado": true,
            "motivo_anulacion": "Quisque ut erat. Curabitur gravida nisi at nibh."
          }, {
            "concepto": "Cambio",
            "descripcion": "risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in",
            "estado": true,
            "motivo_anulacion": "Nulla tempus."
          }, {
            "concepto": "Devolución",
            "descripcion": "felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi",
            "estado": true,
            "motivo_anulacion": "Ut tellus."
          }, {
            "concepto": "Devolución",
            "descripcion": "sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus",
            "estado": false,
            "motivo_anulacion": "Nunc purus. Phasellus in felis."
          }, {
            "concepto": "Cambio",
            "descripcion": "non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus",
            "estado": false,
            "motivo_anulacion": "Integer ac neque."
          }, {
            "concepto": "Compra",
            "descripcion": "luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum",
            "estado": true,
            "motivo_anulacion": "Morbi non quam nec dui luctus rutrum."
          }, {
            "concepto": "Compra",
            "descripcion": "in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui",
            "estado": false,
            "motivo_anulacion": "Pellentesque eget nunc."
          }, {
            "concepto": "Venta",
            "descripcion": "varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget",
            "estado": true,
            "motivo_anulacion": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst."
          }, {
            "concepto": "Venta",
            "descripcion": "feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam",
            "estado": false,
            "motivo_anulacion": "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
          }, {
            "concepto": "Venta",
            "descripcion": "placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris",
            "estado": false,
            "motivo_anulacion": "Nam tristique tortor eu pede."
          }, {
            "concepto": "Venta",
            "descripcion": "convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien",
            "estado": true,
            "motivo_anulacion": "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam."
          }, {
            "concepto": "Venta",
            "descripcion": "nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo",
            "estado": true,
            "motivo_anulacion": "Aliquam quis turpis eget elit sodales scelerisque."
          }, {
            "concepto": "Devolución",
            "descripcion": "natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis",
            "estado": false,
            "motivo_anulacion": "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia."
          }, {
            "concepto": "Venta",
            "descripcion": "nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede",
            "estado": true,
            "motivo_anulacion": "Integer tincidunt ante vel ipsum."
          }, {
            "concepto": "Compra",
            "descripcion": "ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu pede",
            "estado": true,
            "motivo_anulacion": "Suspendisse potenti. Nullam porttitor lacus at turpis."
          }, {
            "concepto": "Venta",
            "descripcion": "molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam",
            "estado": true,
            "motivo_anulacion": "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis."
          }, {
            "concepto": "Venta",
            "descripcion": "in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus",
            "estado": true,
            "motivo_anulacion": "In hac habitasse platea dictumst."
          }, {
            "concepto": "Devolución",
            "descripcion": "nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer",
            "estado": true,
            "motivo_anulacion": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst."
          }];
        this.dataSource = new MatTableDataSource(dataDemo);
        this.dataSource.paginator = this.paginator;
    }

    handleCrear(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalConceptoPlameComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Nuevo concepto PLAME',
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
