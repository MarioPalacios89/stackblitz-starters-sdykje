export interface MaestroHaberDescuento {
    laborRegimeId?:               number;
    conceptCode?:                 string;
    description?:                 string;
    shortDescription?:            string;
    showOnPayroll?:               boolean;
    payrollOrder?:                number;
    conceptTypeId?:               number;
    calculationGroupId?:          number;
    priority?:                    number;
    calculationTypeId?:           number;
    allowManualRegistration?:     boolean;
    bulkLoadSource?:              boolean;
    startDateValidity?:           Date;
    endDateValidity?:             Date;
    allowMonthlyRemuneration?:    boolean;
    allowOccasionalRemuneration?: boolean;
    annotations?:                 string;
    mcppConceptId?:               number;
    plameConceptId?:              number;
    expenseClassifierId?:         number;
    legalFramework?:              string;
}
