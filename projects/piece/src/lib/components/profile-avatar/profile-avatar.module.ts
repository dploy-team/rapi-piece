import { NgModule } from "@angular/core";
import { PieceProfileAvatarComponent } from "./profile-avatar.component";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  exports: [PieceProfileAvatarComponent],
  declarations: [PieceProfileAvatarComponent],
  providers: []
})
export class PieceProfileAvatarModule {}
