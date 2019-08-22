import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "piece-info-card",
  templateUrl: "./info-card.component.html",
  styleUrls: ["./info-card.component.scss"]
})
export class InfoCardComponent implements OnInit {
  @Input() public type: "info" | "error" | "warning" = "info";

  constructor() {}

  ngOnInit() {}

  get color() {
    switch (this.type) {
      case "error":
        return "#EF6F71";
      case "warning":
        return "#F0B53C";
      case "info":
        return "#0277BD";
      default:
        break;
    }
  }

  get accentColor() {
    switch (this.type) {
      case "error":
        return "#ffdada";
      case "warning":
        return "#ffedc9";
      case "info":
        return "#b8d6e8";
      default:
        break;
    }
  }
}
