import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServidorPublico } from 'app/core/models/proceso-compensacion/servidor-publico';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServidorPublicoService {

    private urlBase = '';
    constructor(private _httpClient: HttpClient) {
        this.urlBase = 'https://api.payroll.dev.ayni.in.otic.pe/';
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    obtenerListas(): Observable<any> {
        return this._httpClient
            .get(
                'assets/data_mock/proceso-compensacion/servidor-publico.json'
            )
            .pipe(
                map((item: any) => ({
                    persona: item.listas.persona ?? [],
                    regimenLaboral: item.listas.regimenLaboral ?? [],
                    situacionLaboral: item.listas.situacionLaboral ?? []
                }))
            );
    }

    obtenerServidoresPublicos(parametros:{tipo?:number,numero?:string}=null): Observable<any[]> {
        let url=this.urlBase + 'ap-public-servants/v1/public-servants';
        if(parametros&&parametros.tipo>0){
            url+=`?documentTypeId=${parametros.tipo}&documentNumber=${parametros.numero}`
        }
        url='assets/data_mock/proceso-compensacion/servidor-publico.json';

        return this._httpClient
           .get(url)
            .pipe(
                map((response: ServidorPublico[]) => response["data"].map((item:ServidorPublico)=>({
                    publicServantId: item.publicServantId,
                    personId: item.personId ?? '',
                    laborRegimeId: item.laborRegimeId ?? '',
                    laborRegime: item.laborRegime ?? '',
                    placeCode: item.placeCode??'',
                    workplaceId: item.workplaceId??'',
                    workplace: item.workplace??'',
                    admissionDate: item.admissionDate??'',
                    endDate: item.endDate??'',
                    laborSituationId: item.laborSituationId??'',
                    laborSituation: item.laborSituation??''
                })))
            );
    }

    findOne(id:any=null):Observable<any>{
        let req='assets/data_mock/proceso-compensacion/servidor-publico.json';
        // if(id){
        //     req+=`/${id}`;
        // }
        return this._httpClient
        .get(req)
        .pipe(map((response: any) =>response.detalle));
    }

}
/**s */
