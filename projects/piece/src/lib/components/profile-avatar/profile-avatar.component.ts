import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "piece-profile-avatar",
  template: `
    <div *ngIf="!showName">
      <img
        class="rounded"
        [style.width]="size + 'px'"
        [style.height]="size + 'px'"
        [src]="user?.thumb || 'assets/images/user_default.svg'"
      />
    </div>
    <div
      fxLayoutAlign="center center"
      [style.width]="size + 'px'"
      [style.height]="size + 'px'"
      class="circle mat-elevation-z3"
      [style.backgroundColor]="bgColor"
      *ngIf="showName"
    >
      <b class="initials" [style.color]="tColor">{{ initials }}</b>
    </div>
  `,
  styles: [
    `
      .circle {
        border-radius: 50%;
        text-align: center;
      }

      .initials {
        line-height: 1;
        position: relative;
      }
    `
  ]
})
export class PieceProfileAvatarComponent implements OnInit {
  @Input()
  public user: any;

  @Input()
  public size = 55;

  @Input()
  public showName = false;

  @Input()
  public nameKey = null;

  @Input()
  public bgColor = "white";

  @Input()
  public tColor = "black";

  constructor() {}

  ngOnInit() {}

  get initials() {
    const fullName: string = this.user[this.nameKey];
    if (fullName === "") return "";
    const splittedName = fullName.split(" ");

    if (splittedName.length === 1) return splittedName[0].charAt(0);
    return `${splittedName[0].charAt(0)} ${splittedName[
      splittedName.length - 1
    ].charAt(0)}`;
  }
}
