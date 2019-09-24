import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "piece-image-view",
  templateUrl: "./image-view.component.html",
  styleUrls: ["./image-view.component.css"]
})
export class ImageViewComponent implements OnInit {
  public image: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.image = this.data;
  }
}
