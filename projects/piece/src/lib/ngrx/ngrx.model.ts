import { HttpErrorResponse } from "@angular/common/http";
import { Response40x } from "@dploy-rapi/w3";

export interface BaseModel {
  id?: number;
}

export interface EntitiesArrWithPaginationType<T> {
  pagination: any;
  entities: T[];
  search: any;
  loaded: boolean;
  loading: boolean;
}

export class PayloadOfError {
  public code: string;
  public http_code: number;
  public message: string;
  public validation: { [key: string]: string[] };

  constructor(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status >= 400 && err.status < 500) {
        this.fillResponse40x(err.error);
      } else {
        this.message = err.message;
      }
    } else {
      this.code = err.name;
      this.message = err.message;
    }
  }

  private fillResponse40x(err: Response40x): void {
    const info = err.error;

    this.message = err.message;

    if (info) {
      this.code = info.code;
      this.http_code = info.http_code;
      this.validation = info.validation;
    }
  }
}
