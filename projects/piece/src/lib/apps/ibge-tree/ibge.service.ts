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
    return this.httpClient.get<RegiaoIbge[]>(`${environment.IBGE_URL}/regioes`);
  }

  getEstados(regiao?): Observable<EstadoIbge[]> {
    if (regiao)
      return this.httpClient.get<EstadoIbge[]>(
        `${environment.IBGE_URL}/regioes/${regiao}/estados`
      );
    return this.httpClient.get<EstadoIbge[]>(
      `${environment.IBGE_URL}/regioes/estados`
    );
  }

  getMesorregioes(estado?): Observable<MesorregiaoIbge[]> {
    if (estado)
      return this.httpClient.get<MesorregiaoIbge[]>(
        `${environment.IBGE_URL}/estados/${estado}/mesorregioes`
      );
    return this.httpClient.get<MesorregiaoIbge[]>(
      `${environment.IBGE_URL}/regioes/mesorregioes`
    );
  }

  getMicrorregioes(mesorregiao?): Observable<MicrorregiaoIbge[]> {
    if (mesorregiao)
      return this.httpClient.get<MicrorregiaoIbge[]>(
        `${environment.IBGE_URL}/mesorregioes/${mesorregiao}/microrregioes`
      );
    return this.httpClient.get<MicrorregiaoIbge[]>(
      `${environment.IBGE_URL}/microrregioes`
    );
  }

  getMunicipios(microrregiao?): Observable<MunicipioIbge[]> {
    if (microrregiao)
      return this.httpClient.get<MunicipioIbge[]>(
        `${environment.IBGE_URL}/microrregioes/${microrregiao}/municipios`
      );
    return this.httpClient.get<MunicipioIbge[]>(
      `${environment.IBGE_URL}/municipios`
    );
  }

  getMunicipiosByLevel(level, id): Observable<number[]> {
    let levelName = "";
    if (level === 0) levelName = "regioes";
    else if (level === 1) levelName = "estados";
    else if (level === 2) levelName = "mesorregioes";
    else if (level === 3) levelName = "microrregioes";

    return this.httpClient
      .get<MunicipioIbge[]>(
        `${environment.IBGE_URL}/${levelName}/${id}/municipios`
      )
      .pipe(map(municipios => municipios.map(mun => mun.id)));
  }
}
