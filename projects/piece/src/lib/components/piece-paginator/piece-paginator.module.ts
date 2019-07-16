import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { PiecePaginatorComponent } from "./piece-paginator.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/");
}

@NgModule({
  imports: [CommonModule, MatPaginatorModule],
  exports: [PiecePaginatorComponent],
  declarations: [PiecePaginatorComponent]
})
export class PiecePaginatorModule {}
