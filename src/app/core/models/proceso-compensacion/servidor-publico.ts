export interface ServidorPublico {
    publicServantId?:  number;
    personId?:         number;
    laborRegimeId?:    number;
    laborRegime?:      string;
    placeCode?:        string;
    workplaceId?:      number;
    workplace?:        string;
    admissionDate?:    Date;
    endDate?:          null;
    laborSituationId?: number;
    laborSituation?:   string;
}
