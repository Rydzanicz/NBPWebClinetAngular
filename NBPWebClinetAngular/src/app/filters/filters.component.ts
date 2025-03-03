import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  imports: [FormsModule, CommonModule],
})
export class FiltersComponent implements OnInit {
  startDate: string | null = null;
  endDate: string | null = null;
  currency: string = 'USD';

  maxDate: string = '';

  @Output() filtersChanged = new EventEmitter<any>();

  ngOnInit(): void {
    this.setMaxDate();
  }

  setMaxDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.maxDate = `${year}-${month}-${day}`;
  }

  applyFilters(): void {
    const filters: any = {currency: this.currency};

    if (this.startDate) {
      filters.startDate = this.startDate;
    }
    if (this.endDate) {
      filters.endDate = this.endDate;
    }

    this.filtersChanged.emit(filters);
  }
}
