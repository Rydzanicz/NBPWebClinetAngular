import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
  imports: [FormsModule, CommonModule],
})
export class TableContainerComponent {
  @Input() data: any[] = [];

  sortState: { column: string, direction: 'ASC' | 'DESC' } = { column: '', direction: 'ASC' }; // Stan sortowania

  sortData(column: 'exchangeRateDateForBuyAndSell' | 'buy' | 'sell'): void {
    if (!this.data || this.data.length === 0) return;

    if (this.sortState.column !== column) {
      this.sortState.direction = 'ASC';
    }

    this.data.sort((a, b) => {
      const valueA = column === 'exchangeRateDateForBuyAndSell'
        ? new Date(a[column]).getTime()
        : a[column];
      const valueB = column === 'exchangeRateDateForBuyAndSell'
        ? new Date(b[column]).getTime()
        : b[column];

      return this.sortState.direction === 'ASC' ? valueA - valueB : valueB - valueA;
    });

    this.sortState = {
      column,
      direction: this.sortState.direction === 'ASC' ? 'DESC' : 'ASC',
    };
  }
}
