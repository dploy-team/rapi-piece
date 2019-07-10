import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "piece-empty-list",
  templateUrl: "./empty-list.component.html",
  styleUrls: ["./empty-list.component.scss"]
})
export class PieceEmptyListComponent implements OnInit {
  @Input()
  public imgUrl = "../../../../assets/images/empty-list.png";

  @Input()
  public buttonLabel = null;

  @Input()
  public buttonLink = "/";

  @Input()
  public message = "Nenhum registro encontrado!";

  constructor() {}

  ngOnInit() {}
}
