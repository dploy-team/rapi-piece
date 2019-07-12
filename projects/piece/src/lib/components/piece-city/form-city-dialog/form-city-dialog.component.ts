import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PieceCityService} from '../piece-city.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'rapi-picie-form-city-dialog',
  templateUrl: './form-city-dialog.component.html',
  styleUrls: ['./form-city-dialog.component.scss']
})
export class FormCityDialogComponent implements OnInit {
  citysForm: FormGroup;
  cities = [];
  isLoading = false;
  isBusqued = false;
  private defaultSeach = '';

  constructor(private fb: FormBuilder,
              private cityService: PieceCityService,
              public dialogRef: MatDialogRef<FormCityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.defaultSeach = data;

  }

  ngOnInit(): void {
    this.citysForm = this.fb.group({
      cityInput: null
    });
    if (this.defaultSeach) {
      this.citysForm.controls['cityInput'].setValue(this.defaultSeach);
    }
    if (this.defaultSeach.length > 3) {
      this.buscar();
    }
  }

  buscar(): void {
    this.isLoading = true;
    this.isBusqued = true;
    this.cityService.searchPlaces(this.citysForm.getRawValue().cityInput)

      .subscribe(result => {
        this.cities = result;
        this.isLoading = false;
      }, () => {
          this.isLoading = false;
      });
  }

  save(): void {
    // mytodo save nao implementado
    alert('Não implementado!');
  }

  saveCity(city): void {
    this.cityService.savePlace(city.place_id)
      .subscribe(result => {
        this.dialogRef.close(result);
      });
  }

}
