import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import { MatPaginator } from "@angular/material";

@Component({
  selector: "piece-paginator",
  template: `
    <mat-paginator
      *ngIf="pagination"
      #paginator
      [length]="data.total"
      (page)="changePage($event)"
      [pageIndex]="data.page"
      [pageSize]="data.per_page"
      [pageSizeOptions]="[5, 10, 25, 100]"
    >
    </mat-paginator>
  `
})
export class PiecePaginatorComponent {
  public data = {
    total: 0,
    page: 0,
    per_page: 0
  };

  @Input() pagination: any;
  @Output() onChange = new EventEmitter<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    const pagination = { ...changes.pagination.currentValue };
    pagination.page = pagination.page > 0 ? pagination.page - 1 : 0;
    this.data = Object.assign({}, this.data, pagination);
  }

  changePage(event): void {
    const data = {
      ...event,
      page: event.pageIndex + 1
    };

    this.onChange.emit(data);
  }
}
