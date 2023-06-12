/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'applications',
        // title: "Maestros",
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'maestro',
                title: 'Maestros',
                type: 'collapsable',
                icon: 'view_list',
                children: [
                    {
                        id: 'maestro_haber_descuento',
                        title: 'Maestro de haberes y descuento',
                        type: 'basic',
                        link: '/ayni/maestro/haberes',
                    },
                    {
                        id: 'clasificador_gasto',
                        title: 'Maestro clasificadores de gasto',
                        type: 'basic',
                        link: '/ayni/maestro/clasificador_gasto',
                    },
                    {
                        id: 'banco',
                        title: 'Maestro de bancos',
                        type: 'basic',
                        link: '/ayni/maestro/banco',
                    },
                    {
                        id: 'maestro_concepto_mcpp',
                        title: 'Maestro de conceptos MCPP',
                        type: 'basic',
                        link: '/ayni/maestro/concepto_mcpp',
                    },
                    {
                        id: 'maestro_afp',
                        title: 'Maestro de AFP',
                        type: 'basic',
                        link: '/ayni/maestro/afp',
                    },
                    {
                        id: 'maestro_aprobador_planilla',
                        title: 'Maestro de aprobadores de planilla',
                        type: 'basic',
                        link: '/ayni/maestro/aprobador_planilla',
                    },
                    {
                        id: 'maestro-concepto-plame',
                        title: 'Maestro de conceptos PLAME',
                        type: 'basic',
                        link: '/ayni/maestro/maestro-concepto-plame',
                    },
                    {
                        id: 'indice_incremento_categoria',
                        title: 'Actualizar indice de incremento',
                        type: 'basic',
                        link: '/ayni/maestro/indice_incremento_categoria',
                    },
                    {
                        id: 'estructura_programatica',
                        title: 'Estructura programática',
                        type: 'basic',
                        link: '/ayni/maestro/estructura_programatica',
                    },
                    {
                        id: 'estructura_programatica_ue',
                        title: 'Estructura programática nivel UE',
                        type: 'basic',
                        link: '/ayni/maestro/estructura_programatica_ue',
                    },
                    {
                        id: 'maestro-tercero',
                        title: 'Maestro de terceros',
                        type: 'basic',
                        link: '/ayni/maestro/maestro-tercero',
                    },
                ],
            },
            {
                id: 'proceso-compensacion',
                title: 'Proceso compensaciones',
                type: 'collapsable',
                icon: 'account_tree',
                children: [
                    {
                        id: 'proceso-apertura-periodo',
                        title: 'Apertura de periodo',
                        type: 'basic',
                        link: '/ayni/proceso-compensacion/apertura-periodo',
                    },
                    {
                        id: 'proceso-compensacion-servidor-publico',
                        title: 'Consulta servidor público',
                        type: 'basic',
                        link: '/ayni/proceso-compensacion/servidor-publico',
                    },
                    {
                        id: 'proceso-calculo-planilla',
                        title: 'Cálculo de planilla',
                        type: 'basic',
                        link: '/ayni/proceso-compensacion/calculo-planilla',
                    }

                ]
            },
            {
                id: 'configuraciones-generales',
                title: 'Configuraciones generales',
                type: 'collapsable',
                icon: 'settings',
                children: [
                    {
                        id: 'configuraciones-generales-parametros-planilla',
                        title: 'Parametros planilla',
                        type: 'basic',
                        link: '/ayni/configuraciones-generales/parametros-planilla',
                    },
                    {
                        id: 'configuraciones-generales-gestionar-cronograma-anual',
                        title: 'Gestión cronograma anual de pagos',
                        type: 'basic',
                        link: '/ayni/configuraciones-generales/gestionar-cronograma-anual',
                    },
                    {
                        id: 'configuraciones-generales-gestionar-cronograma-planilla',
                        title: 'Gestión cronograma de planillas',
                        type: 'basic',
                        link: '/ayni/configuraciones-generales/gestionar-cronograma-planilla',
                    }

                ]
            }
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
