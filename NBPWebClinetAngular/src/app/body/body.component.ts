import {Component} from '@angular/core';
import {TableContainerComponent} from '../table-container/table-container.component';
import {FiltersComponent} from '../filters/filters.component';
import {NBPService} from '../services/NBP.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  imports: [TableContainerComponent,
    FiltersComponent,
    FormsModule,
    CommonModule],
})
export class BodyComponent {
  tableData: any[] = [];
  loading: boolean = false;

  constructor(private nbpService: NBPService) {
  }

  onFiltersChanged(filters: any): void {
    console.log('Wybrane filtry:', filters);

    this.loading = true;

    this.nbpService.getLast100CurrencyValue(filters).subscribe({
      next: (response: any) => {
        this.loading = false;

        const parsedResponse = JSON.parse(response);
        this.tableData = parsedResponse.data || [];
      },
      error: (error) => {
        this.loading = false;
        console.error('Błąd podczas pobierania danych z backendu:', error);
        this.tableData = [];
      },
    });
  }
}
