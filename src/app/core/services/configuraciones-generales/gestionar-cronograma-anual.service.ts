
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GestionarCronogramaAnualService {
  private urlBase = "";
  constructor(private _httpClient: HttpClient) {
    this.urlBase = "https://api.payroll.dev.ayni.in.otic.pe/";
  }

  get accessToken(): string {
    return localStorage.getItem("accessToken") ?? "";
  }

  findAll(params: any = null): Observable<any> {
    let req = null;
   if (params != null) {
            req = this._httpClient.get('assets/data_mock/data.json', {
                params,
            });
        } else {
            req = this._httpClient.get('assets/data_mock/data.json');
        }
    return req.pipe(map((response: any) => response.data));
  }

  findOne(params: any): Observable<any> {
    return this._httpClient.get(this.urlBase + "GestionarCronogramaAnualService/findOne",{params});
  }

  create(id: any, objUpdate: any) {
    return this._httpClient.put(this.urlBase + "GestionarCronogramaAnualService/update",objUpdate);
  }

  update(id: any, objUpdate: any) {
    return this._httpClient.put(this.urlBase + "GestionarCronogramaAnualService/update",objUpdate);
  }

  remove(id: any) {
    return this._httpClient.delete(this.urlBase + "GestionarCronogramaAnualService/remove", id);
  }
}
