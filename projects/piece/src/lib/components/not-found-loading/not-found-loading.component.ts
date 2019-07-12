import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "piece-not-found-loading",
  template: `
    <mat-card class="mat-elevation-z2 mb-16">
      <div fxLayout="row" fxFlexFill fxLayoutAlign="center center">
        <span
          *ngIf="!isLoading"
          fxFlexAlign="center"
          align="center"
          class="truncate"
          >{{ text }}</span
        >
        <mat-spinner
          align="center"
          *ngIf="isLoading"
          [diameter]="25"
        ></mat-spinner>
      </div>
    </mat-card>
  `,
  styles: [
    `
      .mat-card {
        padding-left: 5px !important;
        padding-right: 0px !important;
      }
    `
  ]
})
export class NotFoundLoadingComponent implements OnInit {
  @Input() isLoading;
  @Input() text = "Nenhum registro encontrado!";

  constructor() {}

  ngOnInit() {}
}
