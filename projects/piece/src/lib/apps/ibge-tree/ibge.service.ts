import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  RegiaoIbge,
  EstadoIbge,
  MesorregiaoIbge,
  MicrorregiaoIbge,
  MunicipioIbge
} from "./ibge.model";
import { environment } from "@env/environment";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class IbgeService {
  constructor(private httpClient: HttpClient) {}

  getRegioes(): Observable<RegiaoIbge[]> {
    return this.getProxyData(`/api/v1/localidades/regioes`);
  }

  getEstados(regiao?): Observable<EstadoIbge[]> {
    if (regiao)
      return this.getProxyData(`/api/v1/localidades/regioes/${regiao}/estados`);
    return this.getProxyData(`/api/v1/localidades/regioes/estados`);
  }

  getMesorregioes(estado?): Observable<MesorregiaoIbge[]> {
    if (estado)
      return this.getProxyData(
        `/api/v1/localidades/estados/${estado}/mesorregioes`
      );
    return this.getProxyData(`/api/v1/localidades/regioes/mesorregioes`);
  }

  getMicrorregioes(mesorregiao?): Observable<MicrorregiaoIbge[]> {
    if (mesorregiao)
      return this.getProxyData(
        `/api/v1/localidades/mesorregioes/${mesorregiao}/microrregioes`
      );
    return this.getProxyData(`/api/v1/localidades/microrregioes`);
  }

  getMunicipios(microrregiao?): Observable<MunicipioIbge[]> {
    if (microrregiao)
      return this.getProxyData(
        `/api/v1/localidades/microrregioes/${microrregiao}/municipios`
      );
    return this.getProxyData(`/api/v1/localidades/municipios`);
  }

  getMunicipiosByLevel(level, id): Observable<number[]> {
    let levelName = "";
    if (level === 0) levelName = "regioes";
    else if (level === 1) levelName = "estados";
    else if (level === 2) levelName = "mesorregioes";
    else if (level === 3) levelName = "microrregioes";

    return this.getProxyData(
      `/api/v1/localidades/${levelName}/${id}/municipios`
    ).pipe(map(municipios => municipios.map(mun => mun.id)));
  }

  getProxyData(uri): Observable<any[]> {
    return this.httpClient
      .post<any[]>(`${environment.IBGE_URL}`, { uri: uri })
      .pipe(map((res: any) => res.data));
  }
}
