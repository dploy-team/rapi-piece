import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { CollectionResponse, ItemResponse } from "@dploy-rapi/w3";

import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class PieceCityService {
  public paginationData = {
    total: 0,
    per_page: 0
  };

  constructor(public http: HttpClient) {}

  querySearch(filter: { q: string } = { q: "" }): Observable<any> {
    return this.http
      .get<any>(`${environment.URL_API}/rapi/fuse/cities`, {
        params: { q: filter.q, paginate: "20" }
      })
      .pipe(
        tap((response: any) => {
          // .filter(city => city.city_name.toLowerCase().includes(filter.q));
          return response.data;
        })
      );
  }

  search(params: {}) {
    return this.http
      .get<CollectionResponse>(`${environment.URL_API}/rapi/fuse/cities`, {
        params: params
      })
      .pipe(
        tap(res => {
          if (res.meta) {
            this.paginationData.total = +res.meta.total;
            this.paginationData.per_page = +res.meta.per_page;
          }
        }),
        map(res => res.data)
      );
  }

  searchPlaces(q): any {
    const data = {
      params: { q }
    };

    return this.http
      .get<CollectionResponse>(`${environment.URL_API}/cidades/places`, data)
      .pipe(map(res => res.data));
  }

  savePlace(placeId) {
    const data = {
      place_id: placeId,
      include: "state.country"
    };
    return this.http
      .post<ItemResponse>(`${environment.URL_API}/cidades/places`, data)
      .pipe(map(res => res.data));
  }

  pagination() {
    return this.paginationData;
  }
}
