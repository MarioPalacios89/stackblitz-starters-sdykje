import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'estructura-programatica-ue',
    templateUrl: './estructura-programatica-ue.component.html',
    styleUrls: ['./estructura-programatica-ue.component.scss'],
})
export class EstructuraProgramaticaUeComponent {
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
        'unidad_ejecutora',
        'programa_presupuestal',
        'producto',
        'actividad',
        'funcion',
        'division_funcional',
        'grupo_funcional',
        'finalidad',
        'meta',
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
            ano: [null],
            programa_presupuestal: [null],
            producto: [null],
            actividad: [null],
            función: [null],
            division_funcional: [null],
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
            "ano": 2003,
            "unidad_ejecutora": "Ministerio de Educación",
            "programa_presupuestal": "Programa Nacional de Asistencia Solidaria Pensión 65",
            "producto": "Maquinaria pesada",
            "actividad": "Capacitación docente",
            "funcion": "Educación",
            "division_funcional": "Educación básica regular",
            "grupo_funcional": "Administración pública",
            "finalidad": "Desarrollo económico",
            "meta": "Mejora de la conectividad vial"
          }, {
            "ano": 2001,
            "unidad_ejecutora": "Ministerio de Educación",
            "programa_presupuestal": "Programa Nacional de Asistencia Solidaria Pensión 65",
            "producto": "Maquinaria pesada",
            "actividad": "Capacitación docente",
            "funcion": "Transporte",
            "division_funcional": "Educación básica regular",
            "grupo_funcional": "Justicia",
            "finalidad": "Desarrollo social",
            "meta": "Reducción de la mortalidad infantil"
          }, {
            "ano": 2015,
            "unidad_ejecutora": "Ministerio de Salud",
            "programa_presupuestal": "Programa Nacional de Alimentación Escolar Qali Warma",
            "producto": "Útiles escolares",
            "actividad": "Capacitación docente",
            "funcion": "Educación",
            "division_funcional": "Atención primaria en salud",
            "grupo_funcional": "Justicia",
            "finalidad": "Funcionamiento de los servicios públicos",
            "meta": "Reducción de la mortalidad infantil"
          }, {
            "ano": 2020,
            "unidad_ejecutora": "Ministerio de Salud",
            "programa_presupuestal": "Programa Nacional de Alimentación Escolar Qali Warma",
            "producto": "Maquinaria pesada",
            "actividad": "Construcción de carreteras",
            "funcion": "Salud",
            "division_funcional": "Educación básica regular",
            "grupo_funcional": "Defensa y seguridad",
            "finalidad": "Funcionamiento de los servicios públicos",
            "meta": "Mejora de la conectividad vial"
          }, {
            "ano": 2003,
            "unidad_ejecutora": "Ministerio de Transporte",
            "programa_presupuestal": "Programa Nacional de Saneamiento Rural",
            "producto": "Maquinaria pesada",
            "actividad": "Capacitación docente",
            "funcion": "Salud",
            "division_funcional": "Atención primaria en salud",
            "grupo_funcional": "Defensa y seguridad",
            "finalidad": "Desarrollo económico",
            "meta": "Mejora de la calidad educativa"
          }, {
            "ano": 2012,
            "unidad_ejecutora": "Ministerio de Salud",
            "programa_presupuestal": "Programa Nacional de Saneamiento Rural",
            "producto": "Maquinaria pesada",
            "actividad": "Campaña de vacunación",
            "funcion": "Salud",
            "division_funcional": "Educación básica regular",
            "grupo_funcional": "Justicia",
            "finalidad": "Desarrollo económico",
            "meta": "Reducción de la mortalidad infantil"
          }, {
            "ano": 2014,
            "unidad_ejecutora": "Ministerio de Educación",
            "programa_presupuestal": "Programa Nacional de Saneamiento Rural",
            "producto": "Medicamentos",
            "actividad": "Construcción de carreteras",
            "funcion": "Educación",
            "division_funcional": "Educación básica regular",
            "grupo_funcional": "Justicia",
            "finalidad": "Desarrollo económico",
            "meta": "Mejora de la conectividad vial"
          }, {
            "ano": 2004,
            "unidad_ejecutora": "Ministerio de Salud",
            "programa_presupuestal": "Programa Nacional de Alimentación Escolar Qali Warma",
            "producto": "Medicamentos",
            "actividad": "Construcción de carreteras",
            "funcion": "Transporte",
            "division_funcional": "Infraestructura de transporte terrestre",
            "grupo_funcional": "Administración pública",
            "finalidad": "Desarrollo social",
            "meta": "Reducción de la mortalidad infantil"
          }, {
            "ano": 2014,
            "unidad_ejecutora": "Ministerio de Transporte",
            "programa_presupuestal": "Programa Nacional de Asistencia Solidaria Pensión 65",
            "producto": "Maquinaria pesada",
            "actividad": "Campaña de vacunación",
            "funcion": "Transporte",
            "division_funcional": "Educación básica regular",
            "grupo_funcional": "Administración pública",
            "finalidad": "Desarrollo social",
            "meta": "Mejora de la calidad educativa"
          }, {
            "ano": 2009,
            "unidad_ejecutora": "Ministerio de Salud",
            "programa_presupuestal": "Programa Nacional de Asistencia Solidaria Pensión 65",
            "producto": "Maquinaria pesada",
            "actividad": "Construcción de carreteras",
            "funcion": "Salud",
            "division_funcional": "Atención primaria en salud",
            "grupo_funcional": "Administración pública",
            "finalidad": "Funcionamiento de los servicios públicos",
            "meta": "Reducción de la mortalidad infantil"
          }, {
            "ano": 2001,
            "unidad_ejecutora": "Ministerio de Transporte",
            "programa_presupuestal": "Programa Nacional de Asistencia Solidaria Pensión 65",
            "producto": "Maquinaria pesada",
            "actividad": "Capacitación docente",
            "funcion": "Salud",
            "division_funcional": "Educación básica regular",
            "grupo_funcional": "Defensa y seguridad",
            "finalidad": "Desarrollo económico",
            "meta": "Mejora de la conectividad vial"
          }, {
            "ano": 2003,
            "unidad_ejecutora": "Ministerio de Transporte",
            "programa_presupuestal": "Programa Nacional de Saneamiento Rural",
            "producto": "Medicamentos",
            "actividad": "Capacitación docente",
            "funcion": "Transporte",
            "division_funcional": "Atención primaria en salud",
            "grupo_funcional": "Defensa y seguridad",
            "finalidad": "Funcionamiento de los servicios públicos",
            "meta": "Reducción de la mortalidad infantil"
          }, {
            "ano": 2003,
            "unidad_ejecutora": "Ministerio de Educación",
            "programa_presupuestal": "Programa Nacional de Saneamiento Rural",
            "producto": "Maquinaria pesada",
            "actividad": "Campaña de vacunación",
            "funcion": "Educación",
            "division_funcional": "Infraestructura de transporte terrestre",
            "grupo_funcional": "Justicia",
            "finalidad": "Funcionamiento de los servicios públicos",
            "meta": "Reducción de la mortalidad infantil"
          }, {
            "ano": 2017,
            "unidad_ejecutora": "Ministerio de Educación",
            "programa_presupuestal": "Programa Nacional de Asistencia Solidaria Pensión 65",
            "producto": "Medicamentos",
            "actividad": "Capacitación docente",
            "funcion": "Salud",
            "division_funcional": "Infraestructura de transporte terrestre",
            "grupo_funcional": "Defensa y seguridad",
            "finalidad": "Funcionamiento de los servicios públicos",
            "meta": "Reducción de la mortalidad infantil"
          }, {
            "ano": 2002,
            "unidad_ejecutora": "Ministerio de Salud",
            "programa_presupuestal": "Programa Nacional de Alimentación Escolar Qali Warma",
            "producto": "Medicamentos",
            "actividad": "Campaña de vacunación",
            "funcion": "Transporte",
            "division_funcional": "Atención primaria en salud",
            "grupo_funcional": "Administración pública",
            "finalidad": "Desarrollo económico",
            "meta": "Mejora de la conectividad vial"
          }, {
            "ano": 2003,
            "unidad_ejecutora": "Ministerio de Transporte",
            "programa_presupuestal": "Programa Nacional de Alimentación Escolar Qali Warma",
            "producto": "Útiles escolares",
            "actividad": "Capacitación docente",
            "funcion": "Transporte",
            "division_funcional": "Atención primaria en salud",
            "grupo_funcional": "Administración pública",
            "finalidad": "Desarrollo social",
            "meta": "Mejora de la calidad educativa"
          }, {
            "ano": 2012,
            "unidad_ejecutora": "Ministerio de Transporte",
            "programa_presupuestal": "Programa Nacional de Saneamiento Rural",
            "producto": "Útiles escolares",
            "actividad": "Construcción de carreteras",
            "funcion": "Educación",
            "division_funcional": "Atención primaria en salud",
            "grupo_funcional": "Justicia",
            "finalidad": "Desarrollo económico",
            "meta": "Mejora de la calidad educativa"
          }, {
            "ano": 2022,
            "unidad_ejecutora": "Ministerio de Educación",
            "programa_presupuestal": "Programa Nacional de Alimentación Escolar Qali Warma",
            "producto": "Medicamentos",
            "actividad": "Capacitación docente",
            "funcion": "Transporte",
            "division_funcional": "Educación básica regular",
            "grupo_funcional": "Administración pública",
            "finalidad": "Desarrollo económico",
            "meta": "Mejora de la conectividad vial"
          }, {
            "ano": 2006,
            "unidad_ejecutora": "Ministerio de Educación",
            "programa_presupuestal": "Programa Nacional de Saneamiento Rural",
            "producto": "Medicamentos",
            "actividad": "Construcción de carreteras",
            "funcion": "Educación",
            "division_funcional": "Atención primaria en salud",
            "grupo_funcional": "Defensa y seguridad",
            "finalidad": "Desarrollo social",
            "meta": "Mejora de la conectividad vial"
          }, {
            "ano": 2006,
            "unidad_ejecutora": "Ministerio de Educación",
            "programa_presupuestal": "Programa Nacional de Saneamiento Rural",
            "producto": "Medicamentos",
            "actividad": "Construcción de carreteras",
            "funcion": "Transporte",
            "division_funcional": "Atención primaria en salud",
            "grupo_funcional": "Justicia",
            "finalidad": "Desarrollo social",
            "meta": "Mejora de la conectividad vial"
          }];
        this.dataSource = new MatTableDataSource(dataDemo);
        this.dataSource.paginator = this.paginator;
    }

    handleCrear(): void {}

    handleExportar(): void {}

    handleBuscar(): void {}

    handleLimpiar(): void {}
}
