import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalConceptoMcppComponent } from '../../components/modals/modal-concepto-mcpp/modal-concepto-mcpp.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'maestro-concepto-mcpp',
    templateUrl: './maestro-concepto-mcpp.component.html',
    styleUrls: ['./maestro-concepto-mcpp.component.scss'],
})
export class MaestroConceptoMcppComponent {
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
            tipo_concepto: [""],
            descripcion_concepto: [null],
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
            "concepto": "Compra",
            "descripcion": "nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa",
            "estado": false,
            "motivo_anulacion": "Suspendisse ornare consequat lectus."
          }, {
            "concepto": "Venta",
            "descripcion": "aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst",
            "estado": false,
            "motivo_anulacion": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis."
          }, {
            "concepto": "Devolución",
            "descripcion": "mi nulla ac enim in tempor turpis nec euismod scelerisque quam",
            "estado": false,
            "motivo_anulacion": "Morbi a ipsum. Integer a nibh. In quis justo."
          }, {
            "concepto": "Compra",
            "descripcion": "eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse",
            "estado": true,
            "motivo_anulacion": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh."
          }, {
            "concepto": "Venta",
            "descripcion": "sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in",
            "estado": false,
            "motivo_anulacion": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum."
          }, {
            "concepto": "Venta",
            "descripcion": "vulputate ut ultrices vel augue vestibulum ante ipsum primis in",
            "estado": true,
            "motivo_anulacion": "Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante."
          }, {
            "concepto": "Devolución",
            "descripcion": "duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi",
            "estado": true,
            "motivo_anulacion": "Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat."
          }, {
            "concepto": "Compra",
            "descripcion": "quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere",
            "estado": true,
            "motivo_anulacion": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci."
          }, {
            "concepto": "Venta",
            "descripcion": "quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at",
            "estado": false,
            "motivo_anulacion": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus."
          }, {
            "concepto": "Compra",
            "descripcion": "nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus",
            "estado": false,
            "motivo_anulacion": "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui."
          }, {
            "concepto": "Venta",
            "descripcion": "convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi",
            "estado": false,
            "motivo_anulacion": "Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum."
          }, {
            "concepto": "Devolución",
            "descripcion": "orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem",
            "estado": false,
            "motivo_anulacion": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."
          }, {
            "concepto": "Compra",
            "descripcion": "vulputate ut ultrices vel augue vestibulum ante ipsum primis in",
            "estado": true,
            "motivo_anulacion": "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus."
          }, {
            "concepto": "Venta",
            "descripcion": "lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien",
            "estado": true,
            "motivo_anulacion": "In eleifend quam a odio. In hac habitasse platea dictumst."
          }, {
            "concepto": "Devolución",
            "descripcion": "sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue",
            "estado": true,
            "motivo_anulacion": "In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt."
          }, {
            "concepto": "Venta",
            "descripcion": "egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu",
            "estado": true,
            "motivo_anulacion": "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis."
          }, {
            "concepto": "Compra",
            "descripcion": "tortor id nulla ultrices aliquet maecenas leo odio condimentum id",
            "estado": true,
            "motivo_anulacion": "Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy."
          }, {
            "concepto": "Venta",
            "descripcion": "at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi",
            "estado": false,
            "motivo_anulacion": "Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna."
          }, {
            "concepto": "Devolución",
            "descripcion": "sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis",
            "estado": false,
            "motivo_anulacion": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
          }, {
            "concepto": "Devolución",
            "descripcion": "ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat",
            "estado": false,
            "motivo_anulacion": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          }];
        this.dataSource = new MatTableDataSource(dataDemo);
        this.dataSource.paginator = this.paginator;
    }

    handleCrear(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalConceptoMcppComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Nuevo concepto',
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

        handleModificar(): void {
        sessionStorage.setItem('loading', 'Obteniendo detalle');
        this.dialogRef = this.materialDialog
        .open(ModalConceptoMcppComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Actualizar concepto',
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
        .open(ModalConceptoMcppComponent, {
            disableClose: true,
            width: '75%',
            data: {
                title: 'Visualizar concepto',
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
