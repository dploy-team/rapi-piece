import { OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { Subscription, Observable, Subject } from "rxjs";
import { EntitiesArrWithPaginationType } from "./ngrx.model";
import { Sort } from "@angular/material";
import { makeSortParams } from "@dploy-rapi/w3";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, takeUntil, take } from "rxjs/operators";

/**
 * Classe abstrata para controlar telas de listage, Tanto o search, quanto o archive
 */
export abstract class AbstractListComponent<T> implements OnInit, OnDestroy {
  public dataSource: T[] = [];
  public displayedColumns = ["id", "name", "created_at", "actions"];
  public params: any = {};
  public pagination = {
    total: 0,
    per_page: 0
  };

  protected _config = {
    sort: "id"
  };

  public loading$: Observable<boolean>;

  protected _subject: Subscription;

  ngOnInit(): void {
    this.loading$ = this.loadingSelector();

    this.buildForm();
    this.makeInitialParams();
    this.makeParamsFromState();
    this.makeParamsFromRoute();

    this.search();

    this.selectorSearch()
      .pipe(
        filter(params => !!params),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(params => {
        this.mergeParams(params);
      });
    this.selectorState()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(state => {
        console.log(state);
        this.pagination = state.pagination;
        this.dataSource = state.entities;
        this.params = state.search;
      });
  }

  protected abstract selectorState(): Observable<
    EntitiesArrWithPaginationType<T>
  >;

  protected abstract loadingSelector(): Observable<boolean>;

  pageEvent(ev: any): void {
    this.params.page = ev.page;
    this.params.paginate = ev.pageSize;
    this.loadResource();
  }

  sortData(ev: Sort): void {
    console.log(ev);
    this.params.sort = makeSortParams(ev, this._config.sort);
    this.params.page = 1;
    this.loadResource();
  }

  abstract confirmDelete(item: T): void;

  getSort(): { id: string; start: "asc" | "desc" | "" } {
    const sort = this.params && this.params.sort ? this.params.sort : "";

    return {
      id: sort.replace("-", ""),
      start: sort.startsWith("-") ? "desc" : "asc"
    };
  }

  @Output() onCreate = new EventEmitter();

  public showSearch = false;
  public form: FormGroup;

  // Protected
  protected _params: any;
  protected _unsubscribeAll: Subject<any>;

  constructor(
    protected _activatedRoute: ActivatedRoute,
    protected _router: Router
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;

    if (!this.showSearch) {
      this.clearSearch();
    }
  }

  openForm(): void {
    this.onCreate.emit();
  }

  search(): void {
    this.mergeParams(this.getFormData());
    // this._params = this.getFormData();
    this._params.page = 1;
    console.log(this._params);
    console.log("SEARCH", this._params);
    this.loadResource();
    this.updateUrl(this._params);
  }

  protected abstract loadResource(): void;

  /**
   * retorna os parametros do search mantido no state do redux
   */
  protected abstract selectorSearch(): Observable<any>;

  protected abstract buildForm(): void;

  protected getInitialParams(): any {
    return {
      q: "",
      page: 1,
      paginate: 15,
      include: ""
    };
  }

  protected getFormData(): any {
    return this.form.value;
  }

  protected mergeParams(p: any): void {
    this._params = Object.assign({}, this._params, p);
  }

  /**
   * Trata os inputs recebidos da URL
   * @param params retorna eles tratados
   */
  protected makeQueryParams(params): any {
    return params;
  }

  protected makeInitialParams(): void {
    this._params = { ...this.getInitialParams() };
  }

  protected makeParamsFromState(): void {
    this.selectorSearch()
      .pipe(take(1))
      .subscribe(params => {
        console.log("makeParamsFromState", params);
        this.mergeParams(params);
      });
  }

  protected makeParamsFromRoute(): void {
    if (!this._activatedRoute.snapshot.queryParamMap.keys.length) {
      return;
    }

    this.showSearch = true;
    this.mergeParams(
      this.makeQueryParams(this._activatedRoute.snapshot.queryParams)
    );
    this.form.patchValue(this._params, { emitEvent: true });
  }

  protected makeParamsToUrl(data): any {
    const params = { ...data };
    delete params.include;

    Object.keys(params).map(k => {
      if (params[k] === "" || params[k] === undefined || params[k] === null) {
        delete params[k];
      }
    });

    return params;
  }

  public clearSearch(): void {
    this._params = { ...this.getInitialParams() };
    this._params.page = 1;

    this.form.reset(this._params, { emitEvent: true });
    this.loadResource();
    this.updateUrl(this._params);
  }

  protected updateUrl(params): void {
    this._router.navigate(["."], {
      relativeTo: this._activatedRoute,
      queryParams: this.makeParamsToUrl(params),
      queryParamsHandling: ""
    });
  }
}
