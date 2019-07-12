import { NgModule } from "@angular/core";

import { PieceEmptyListComponent } from "./empty-list.component";
import { MaterialModule } from "../../modules/material.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [PieceEmptyListComponent],
  declarations: [PieceEmptyListComponent],
  providers: []
})
export class PieceEmptyListModule {}
