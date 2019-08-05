import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IbgeTreeComponent } from "./ibge-tree.component";
import { HttpClientModule } from "@angular/common/http";
import { IbgeService } from "./ibge.service";
import {
  MatTreeModule,
  MatIconModule,
  MatProgressBarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
} from "@angular/material";

@NgModule({
  declarations: [IbgeTreeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [IbgeTreeComponent],
  providers: [IbgeService]
})
export class IbgeTreeModule {}
