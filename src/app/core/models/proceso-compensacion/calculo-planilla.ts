export interface CalculoPlanilla {
    id?:              number;
    executingUnitId?: number;
    paymentTypeId?:   number;
    year?:            number;
    monthId?:         number;
    payrollTypeId?:   number;
    payrollId?:       number;
    correlative?:     number;
    periodStatusId?:  number;
    procesado?:       boolean;
    periodDetail?:    PeriodDetail[];
}

export interface PeriodDetail {
    id?:            number;
    periodId?:      number;
    laborRegimeId?: number;
}
