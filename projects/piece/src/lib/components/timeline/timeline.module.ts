import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimelineComponent } from "./timeline.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material";

@NgModule({
  declarations: [TimelineComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule],
  exports: [TimelineComponent]
})
export class TimelineModule {}
