import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTreeModule
} from "@angular/material";
import { IbgeTreeComponent } from "./ibge-tree.component";
import { IbgeService } from "./ibge.service";

@NgModule({
  declarations: [IbgeTreeComponent],
  imports: [
    CommonModule,
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
