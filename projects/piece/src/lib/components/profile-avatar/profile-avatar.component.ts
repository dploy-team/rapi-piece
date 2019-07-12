import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "@dploy-rapi/w3";

@Component({
  selector: "piece-profile-avatar",
  template: `
    <div>
      <img
        class="rounded"
        [style.width]="size + 'px'"
        [style.height]="size + 'px'"
        [src]="user?.thumb || 'assets/images/user_default.svg'"
      />
    </div>
  `,
  styles: []
})
export class PieceProfileAvatarComponent implements OnInit {
  @Input()
  public user: UserModel;

  @Input()
  public size = 55;

  @Input()
  public showCrown = false;

  constructor(public router: Router) {}

  ngOnInit() {}
}
