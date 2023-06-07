import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

    private urlBase = '';
    constructor(private _httpClient: HttpClient) {
        this.urlBase = 'https://api.payroll.dev.ayni.in.otic.pe/';
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    findAll(): Observable<any> {
        return this._httpClient
            .get('assets/data_mock/maestro/banco.json')
            .pipe(
                map((response: any) => response.data.map(item=>({
                    codigo_banco: item.codigo_banco??0,
                    descripcion_banco: item.descripcion_banco ?? '',
                    ruc: item.ruc.toString() ?? '',
                    sigla: item.sigla ?? '',
                    telefono: item.telefono ?? '',
                    codigo_sunat: item.codigo_sunat??0,
                    departamento: item.departamento,
                    direccion: item.direccion,
                    estado: item.estado??false,
                    motivo_anulacion: item.motivo_anulacion??'',
                })))
            );
    }

}
