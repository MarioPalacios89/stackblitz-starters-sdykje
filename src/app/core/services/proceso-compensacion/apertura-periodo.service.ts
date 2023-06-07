import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AperturaPeriodoService {
    private urlBase = '';
    constructor(private _httpClient: HttpClient) {
        this.urlBase = 'https://api.payroll.dev.ayni.in.otic.pe/';
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    findAll(): Observable<any> {
        return this._httpClient
            .get('assets/data_mock/proceso-compensacion/apertura-periodo.json')
            .pipe(map((response: any) => response.data));
    }

    findOne(params: any): Observable<any> {
        return this._httpClient.get(
            this.urlBase + 'AperturaPeriodoService/findOne',
            { params }
        );
    }

    create(id: any, objUpdate: any) {
        return this._httpClient.put(
            this.urlBase + 'AperturaPeriodoService/update',
            objUpdate
        );
    }

    update(id: any, objUpdate: any) {
        return this._httpClient.put(
            this.urlBase + 'AperturaPeriodoService/update',
            objUpdate
        );
    }

    remove(id: any) {
        return this._httpClient.delete(
            this.urlBase + 'AperturaPeriodoService/remove',
            id
        );
    }
}
