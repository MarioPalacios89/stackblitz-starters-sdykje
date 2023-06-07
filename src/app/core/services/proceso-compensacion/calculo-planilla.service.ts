import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalculoPlanilla } from 'app/core/models/proceso-compensacion/calculo-planilla';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CalculoPlanillaService {
    private urlBase = '';
    constructor(private _httpClient: HttpClient) {
        this.urlBase = 'https://api.payroll.dev.ayni.in.otic.pe/';
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    getLists(): Observable<any> {
        return this._httpClient
            .get('assets/data_mock/proceso-compensacion/calculo-planilla.json')
            .pipe(
                map((item: any) => ({
                    estadoPeriodo:item.listas.estadoPeriodo??[],
                    meses:item.listas.meses??[],
                    planilla:item.listas.planilla??[],
                    regimenLaboral:item.listas.regimenLaboral??[],
                    tipoPago: item.listas.tipoPago ?? [],
                    tipoPlanilla:item.listas.tipoPlanilla??[],
                    unidadEjecutora: item.listas.unidadEjecutora ?? []
                }))
            );
    }

    findAll(params: any = null): Observable<any> {
        let req = null;

        if (params != null) {
            req = this._httpClient.get(this.urlBase + 'ap-datasets/v1/periods', {
                params,
            });
        } else {
            // req = this._httpClient.get('assets/data_mock/proceso-compensacion/calculo-planilla.json').pipe(
            //     map((response:any)=>response.data)
            // );
            req = this._httpClient.get(this.urlBase + 'ap-datasets/v1/periods', {
                params,
            });
        }
        req = this._httpClient.get('assets/data_mock/proceso-compensacion/calculo-planilla.json', {
            params,
        });
        return req.pipe(
            map((response: CalculoPlanilla[]) =>
                response["data"].map((item: CalculoPlanilla) => ({
                    id: item.id,
                    executingUnitId: item.executingUnitId,
                    paymentTypeId: item.paymentTypeId,
                    year: item.year,
                    monthId: item.monthId,
                    correlative: item.correlative,
                    periodStatusId: item.periodStatusId ?? 'SIN ESTADO',
                    procesado:(item.periodStatusId??0)==143
                }))
            )
        );
    }

    findOne(id:any=null):Observable<CalculoPlanilla>{
        let req=this.urlBase + 'ap-datasets/v1/periods';
        if(id){
            req+=`/${id}`;
        }
        req='assets/data_mock/proceso-compensacion/calculo-planilla.json';
        return this._httpClient
        .get(req)
        .pipe(map((response: CalculoPlanilla) =>response["detalle"]));
    }
}
