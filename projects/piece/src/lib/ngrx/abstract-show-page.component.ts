import { OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseModel } from "./ngrx.model";

export abstract class AbstractShowPageComponent<T extends BaseModel>
  implements OnInit {
  public title: string;

  public isLoading = false;

  protected _item: T;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.listenRoute();

    this.setData(this._item);
  }

  protected abstract getData(param): Promise<T>;

  protected listenRoute(): void {
    const id = +this.activatedRoute.snapshot.url[0].path;

    if (id > 0) {
      this.loadingModel(id);
    }
  }

  protected loadingModel(id: number): void {
    this.isLoading = true;

    this.getData(id)
      .then(model => this.setData(model))
      .finally(() => (this.isLoading = false));
  }

  protected setData(model?: T): void {
    this._item = model;
  }
}
