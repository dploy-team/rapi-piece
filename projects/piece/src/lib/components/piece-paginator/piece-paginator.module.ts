import { NgModule } from "@angular/core";
import { PiecePaginatorComponent } from "./piece-paginator.component";
import { MatPaginatorModule } from "@angular/material";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule, MatPaginatorModule],
  exports: [PiecePaginatorComponent],
  declarations: [PiecePaginatorComponent],
  providers: []
})
export class PiecePaginatorModule {}
