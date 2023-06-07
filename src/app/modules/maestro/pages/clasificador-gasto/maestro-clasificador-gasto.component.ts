import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalClasificadorGastoComponent } from '../../components/modals/modal-clasificador-gasto/modal-clasificador-gasto.component';

@Component({
    selector: 'maestro-clasificador-gasto',
    templateUrl: './maestro-clasificador-gasto.component.html',
    styleUrls: ['./maestro-clasificador-gasto.component.scss'],
})
export class MaestroClasificadorGastoComponent {
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
        'codigo',
        'descripcion',
        'asociar_concepto',
        'clasificador_padre',
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
            ano: [{value:'',disabled:true}],
            codigo: [{value:'',disabled:true}],
            descripcion_clasificador: [{value:'',disabled:true}],
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
            "ano": 2010,
            "codigo": "ABC123",
            "descripcion": "accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor",
            "asociar_concepto": "Concepto C",
            "clasificador_padre": "Padre 3",
            "estado": true
          }, {
            "ano": 2020,
            "codigo": "ABC123",
            "descripcion": "sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper",
            "asociar_concepto": "Concepto A",
            "clasificador_padre": "Padre 2",
            "estado": true
          }, {
            "ano": 2015,
            "codigo": "ABC123",
            "descripcion": "luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at",
            "asociar_concepto": "Concepto B",
            "clasificador_padre": "Padre 2",
            "estado": false
          }, {
            "ano": 2018,
            "codigo": "GHI789",
            "descripcion": "mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet",
            "asociar_concepto": "Concepto B",
            "clasificador_padre": "Padre 1",
            "estado": true
          }, {
            "ano": 2020,
            "codigo": "DEF456",
            "descripcion": "ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum",
            "asociar_concepto": "Concepto C",
            "clasificador_padre": "Padre 1",
            "estado": true
          }, {
            "ano": 2004,
            "codigo": "DEF456",
            "descripcion": "id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas",
            "asociar_concepto": "Concepto A",
            "clasificador_padre": "Padre 1",
            "estado": true
          }, {
            "ano": 2015,
            "codigo": "DEF456",
            "descripcion": "lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse",
            "asociar_concepto": "Concepto A",
            "clasificador_padre": "Padre 3",
            "estado": true
          }, {
            "ano": 2011,
            "codigo": "ABC123",
            "descripcion": "pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut",
            "asociar_concepto": "Concepto B",
            "clasificador_padre": "Padre 3",
            "estado": false
          }, {
            "ano": 2004,
            "codigo": "DEF456",
            "descripcion": "at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat",
            "asociar_concepto": "Concepto A",
            "clasificador_padre": "Padre 2",
            "estado": true
          }, {
            "ano": 2015,
            "codigo": "DEF456",
            "descripcion": "praesent blandit lacinia erat vestibulum sed magna at nunc commodo",
            "asociar_concepto": "Concepto A",
            "clasificador_padre": "Padre 3",
            "estado": false
          }, {
            "ano": 2011,
            "codigo": "ABC123",
            "descripcion": "pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut",
            "asociar_concepto": "Concepto A",
            "clasificador_padre": "Padre 3",
            "estado": true
          }, {
            "ano": 2021,
            "codigo": "GHI789",
            "descripcion": "sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in",
            "asociar_concepto": "Concepto B",
            "clasificador_padre": "Padre 3",
            "estado": false
          }, {
            "ano": 2008,
            "codigo": "GHI789",
            "descripcion": "sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci",
            "asociar_concepto": "Concepto A",
            "clasificador_padre": "Padre 3",
            "estado": false
          }, {
            "ano": 2007,
            "codigo": "ABC123",
            "descripcion": "nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante",
            "asociar_concepto": "Concepto B",
            "clasificador_padre": "Padre 2",
            "estado": false
          }, {
            "ano": 2003,
            "codigo": "ABC123",
            "descripcion": "habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel",
            "asociar_concepto": "Concepto C",
            "clasificador_padre": "Padre 3",
            "estado": true
          }, {
            "ano": 2003,
            "codigo": "GHI789",
            "descripcion": "aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a",
            "asociar_concepto": "Concepto B",
            "clasificador_padre": "Padre 1",
            "estado": false
          }, {
            "ano": 2004,
            "codigo": "GHI789",
            "descripcion": "nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis",
            "asociar_concepto": "Concepto C",
            "clasificador_padre": "Padre 1",
            "estado": false
          }, {
            "ano": 2013,
            "codigo": "GHI789",
            "descripcion": "vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque",
            "asociar_concepto": "Concepto B",
            "clasificador_padre": "Padre 1",
            "estado": true
          }, {
            "ano": 2009,
            "codigo": "DEF456",
            "descripcion": "id ornare imperdiet sapien urna pretium nisl ut volutpat sapien",
            "asociar_concepto": "Concepto B",
            "clasificador_padre": "Padre 1",
            "estado": true
          }, {
            "ano": 2011,
            "codigo": "ABC123",
            "descripcion": "interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing",
            "asociar_concepto": "Concepto B",
            "clasificador_padre": "Padre 2",
            "estado": false
          }];
        this.dataSource = new MatTableDataSource(dataDemo);
        this.dataSource.paginator = this.paginator;
    }

    handleCrear(): void {
        this.dialogRef = this.materialDialog.open(ModalClasificadorGastoComponent, {
            disableClose: true,
            data: {
              modal: {
                icon: "save",
                title: "Nuevo miembro de comité",
                action: "create",
                disabled: false
              },
            }
          });
    }

    handleExportar(): void {}

    handleBuscar(): void {}

    handleLimpiar(): void {}
}
