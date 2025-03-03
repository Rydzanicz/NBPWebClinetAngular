import {Component} from '@angular/core';
import {TableContainerComponent} from '../table-container/table-container.component';
import {FiltersComponent} from '../filters/filters.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  imports: [
    TableContainerComponent,
    FiltersComponent
  ]
})
export class BodyComponent {
  tableData: any[] = [];

  onFiltersChanged(filters: any): void {
    console.log('Wybrane filtry:', filters);

    this.tableData = [
      {date: filters.startDate || '2023-01-01', currency: filters.currency, value: 4.5},
      {date: filters.endDate || '2023-01-02', currency: filters.currency, value: 4.6},
    ];
  }
}
