import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ItemUploadResponse } from "@dploy-rapi/w3";

import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { environment } from "@env/environment";

export interface ConfigUpload {
  url?: string;
  token?: string;
  owner_type?: string;
  owner_id?: string;
  gallery: string;
  headers?: any;
  extras?: { [key: string]: any };
}

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  upload(data): Observable<any> {
    return this.http
      .post<ItemUploadResponse>(
        `${environment.URL_API}/rapi/fuse/uploads`,
        data
      )
      .pipe(map(res => res));
  }

  customUpload(file, config): Observable<any> {
    const data = this.buildFormData(file, config);
    const url = config.url
      ? config.url
      : `${environment.URL_API}/rapi/fuse/uploads`;

    return this.http
      .post<ItemUploadResponse>(url, data, { headers: config.headers })
      .pipe(map(res => res.data));
  }

  buildFormData(file, config: ConfigUpload): FormData {
    config.token = config.token ? config.token : environment.UPLOAD_TOKEN;

    console.log("buildFormData.file->", file);

    const input = new FormData();
    input.append("file", file);
    input.append("token", config.token);
    input.append("gallery", config.gallery);

    if (config.owner_type) {
      input.append("owner_type", config.owner_type);
    }

    if (config.owner_id) {
      input.append("owner_id", config.owner_id);
    }

    // input.append('file', this.uploadForm.get('file').value);

    Object.keys(config.extras).forEach(k => input.append(k, config.extras[k]));

    return input;
  }
}
