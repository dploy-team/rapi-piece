import { NgModule } from "@angular/core";
import { NotFoundLoadingComponent } from "./not-found-loading.component";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule, MatCardModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FlexLayoutModule
  ],
  exports: [NotFoundLoadingComponent],
  declarations: [NotFoundLoadingComponent],
  providers: []
})
export class PieceNotFoundLoadingModule {}
