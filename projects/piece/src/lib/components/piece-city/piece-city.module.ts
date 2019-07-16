import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PieceCityComponent } from "./piece-city.component";
import { SearchCityInputComponent } from "./search-city-input/search-city-input.component";
import { FormCityDialogComponent } from "./form-city-dialog/form-city-dialog.component";

import { PieceCityService } from "./piece-city.service";
import { MaterialModule } from "../../modules/material.module";
import { W3Module } from "@dploy-rapi/w3";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    W3Module,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule
  ],
  declarations: [
    PieceCityComponent,
    SearchCityInputComponent,
    FormCityDialogComponent
  ],
  exports: [SearchCityInputComponent, FormCityDialogComponent],
  entryComponents: [SearchCityInputComponent, FormCityDialogComponent],
  providers: [PieceCityService]
})
export class PieceCityModule {}
