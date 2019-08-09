import { Component, OnInit, Input } from "@angular/core";
import { PieceTimelineModel } from "./timeline.model";

@Component({
  selector: "piece-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"]
})
export class TimelineComponent implements OnInit {
  constructor() {}

  @Input() public timeline: PieceTimelineModel[];

  ngOnInit() {}
}
