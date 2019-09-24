import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material";

import { ValueAccessorBase } from "@dploy-rapi/w3";
import { PieceCityService } from "../piece-city.service";
import { FormCityDialogComponent } from "../form-city-dialog/form-city-dialog.component";
import { filter, debounceTime, tap, switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";

/*
example
in html:
          <rapi-picie-search-city-input (selectCity)="setCityValue($event)" [enableCreate]="false" fxFlex=""></rapi-picie-search-city-input>
  in ts
  setCityValue(ev){
    this.params.city_id = !ev ? null : ev.id;
  }
 */
@Component({
  selector: "rapi-picie-search-city-input",
  templateUrl: "./search-city-input.component.html",
  styleUrls: ["./search-city-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchCityInputComponent,
      multi: false
    }
  ]
})
export class SearchCityInputComponent extends ValueAccessorBase<any>
  implements OnInit, OnDestroy, OnChanges {
  citysForm: FormGroup;
  filteredCities = [];
  isLoading = false;
  isEmpty = false;
  private tempSearch = "";
  hasCity = false;
  private defaultconfigLabels: SearchCityInputConfig = {
    labelSearch: "Buscar cidade",
    labelEmptyState: "Não encontramos nenhuma cidade para sua busca.",
    labelCreateMsg: " Cadastrar uma nova cidade",
    label: "Cidade"
  };

  private sub: Subscription;

  @Input() enableCreate? = false;
  @Input() configLabels?: SearchCityInputConfig;
  @Output() selectCity = new EventEmitter();
  @Output() removeCity = new EventEmitter();
  @Input() require? = false;
  @Input() city?;

  constructor(
    private fb: FormBuilder,
    private cityService: PieceCityService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const city: SimpleChange = changes.city;
    this.city = city.currentValue;

    this.checkhasCity();
  }

  ngOnInit(): void {
    if (!this.configLabels) {
      this.configLabels = this.defaultconfigLabels;
    } else {
      this.configLabels = Object.assign(
        {},
        this.defaultconfigLabels,
        this.configLabels
      );
    }

    this.citysForm = this.fb.group({
      cityInput: null
    });

    this.checkhasCity();

    this.sub = this.citysForm
      .get("cityInput")
      .valueChanges.pipe(
        filter(v => v.length > 2),
        debounceTime(300),
        tap(value => {
          this.isLoading = true;
          this.isEmpty = false;
          this.filteredCities = [];
          this.tempSearch = value;
        }),
        switchMap(value => this.cityService.querySearch({ q: value }))
      )
      .subscribe(citys => {
        this.isLoading = false;
        this.filteredCities = citys.data;
        if (!this.filteredCities || !this.filteredCities.length) {
          this.isEmpty = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkhasCity() {
    if (this.city) {
      this.citysForm.controls["cityInput"].setValue(this.city);
      this.hasCity = true;
    }
  }

  displayFn(city: any): string {
    if (city) {
      return city.description;
    }
  }

  getPosts(val): void {
    if (val.id) {
      this.hasCity = true;
      this.selectCity.emit(val);
      return;
    }
    if (val == "new") {
      this.openFormCity();
    }
  }

  private openFormCity(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    dialogConfig.data = this.tempSearch;

    this.dialog
      .open(FormCityDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.hasCity = true;
        this.selectCity.emit(result);
        this.writeValue(result);
      });
  }

  writeValue(data): void {
    if (!data) {
      return;
    }
    this.citysForm.controls["cityInput"].patchValue(data);

    this.checkhasCity();
  }
}

export interface SearchCityInputConfig {
  labelSearch: string;
  labelEmptyState: string;
  labelCreateMsg: string;
  appearance?: string;
  label?: string;
}
