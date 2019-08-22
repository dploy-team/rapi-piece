import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule, MatIconModule } from "@angular/material";
import { InfoCardComponent } from "./info-card.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [InfoCardComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, FlexLayoutModule],
  exports: [InfoCardComponent]
})
export class InfoCardModule {}
