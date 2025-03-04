import {Component, HostListener} from '@angular/core';
import {NBPService} from '../services/NBP.service';
import {TableContainerComponent} from '../table-container/table-container.component';
import {FiltersComponent} from '../filters/filters.component';
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
  page: number = 0;
  size: number = 10;
  allDataLoaded: boolean = false;

  private activeFilters: any = {};

  constructor(private nbpService: NBPService) {
  }

  onFiltersChanged(filters: any): void {
    this.page = 0;
    this.allDataLoaded = false;
    this.activeFilters = filters;

    this.loadPageData(true);
  }

  loadPageData(reset: boolean = false): void {
    if (this.loading || this.allDataLoaded) {
      return;
    }

    this.loading = true;

    this.nbpService.getLast100CurrencyValue(this.activeFilters, this.page, this.size).subscribe({
      next: (response: any) => {
        const parsedResponse = JSON.parse(response);
        const newData = parsedResponse.data || [];

        this.loading = false;

        if (reset) {
          this.tableData = [...newData];
        } else {
          this.tableData = [...this.tableData, ...newData];
        }

        if (newData.length < this.size) {
          this.allDataLoaded = true;
        }

        this.page += 1;
      },
      error: (error) => {
        this.loading = false;
        console.error('Błąd podczas pobierania danych z backendu:', error);
      },
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.loading) {
      this.loadPageData();
    }
  }
}
