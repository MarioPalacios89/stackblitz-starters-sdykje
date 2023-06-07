import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaestroHaberDescuento } from 'app/core/models/maestro/maestro-haber-descuento';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HaberDescuentoService {
    private urlBase = '';
    constructor(private _httpClient: HttpClient) {
        this.urlBase = 'https://api.payroll.dev.ayni.in.otic.pe/';
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    getLists(): Observable<any> {
        return this._httpClient
            .get('assets/data_mock/maestro/haber-descuento.json')
            .pipe(
                map((item: any) => ({
                    clasificadorGasto: item?.listas?.clasificadorGasto ?? [],
                    conceptosMCPP: item?.listas?.conceptosMCPP ?? [],
                    conceptosPLAME: item?.listas?.conceptosPLAME ?? [],
                    estado: item?.listas?.estado ?? [],
                    ingresoInformacion: item?.listas?.ingresoInformacion ?? [],
                    tipoConcepto: item?.listas?.tipoConcepto ?? [],
                    tipoCalculo: item?.listas?.tipoCalculo ?? [],
                    tipoGrupoCalculo: item?.listas?.tipoGrupoCalculo ?? [],
                    tipoPago: item?.listas?.tipoPago ?? [],
                    regimenLaboral: item?.listas?.regimenLaboral ?? []
                }))
            );
    }

    findAll(params: any = null): Observable<any> {
        let req = null;

        if (params != null) {
            req = this._httpClient.get(
                this.urlBase + 'ap-havings/v1/havings-discounts',
                {
                    params,
                }
            );
        } else {
            // req = this._httpClient.get(this.urlBase + 'ap-periods/v1/periods');
            req = this._httpClient.get(
                this.urlBase + 'ap-havings/v1/havings-discounts'
            );
        }

        req = this._httpClient.get('assets/data_mock/maestro/haber-descuento.json',{params});

        return req.pipe(
            map((response: any) =>
                response.tabla.map((item) => ({
                    id: item.id,
                    conceptCode: item.conceptCode ?? '',
                    description: item.description ?? '',
                    startDateValidity: item.startDateValidity ?? '',
                    endDateValidity: item.endDateValidity ?? '',
                    paymentTypeId: item.paymentTypeId,
                    conceptTypeId: item.conceptTypeId,
                    calculationGroupId: item.calculationGroupId,
                    stateId: item.stateId,
                }))
            )
        );
    }

    findOne(id:any=null): Observable<MaestroHaberDescuento> {

        let req=this.urlBase + 'ap-havings/v1/havings-discounts';
        if(id){
            req+=`/${id}`;
        }
        req='assets/data_mock/maestro/haber-descuento.json';
        return this._httpClient
        .get(req)
        .pipe(map((response: any) =>response.detalle));

        return this._httpClient
        .get('assets/data_mock/maestro/haber-descuento.json')
        .pipe(map((response: any) =>response?.detalle));

        // return this._httpClient
        // .get('assets/data_mock/maestro/haber-descuento.json')
        // .pipe(map((response: any) =>response?.detalle));
    }
}
