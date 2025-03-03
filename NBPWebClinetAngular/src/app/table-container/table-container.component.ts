import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
  imports: [FormsModule, CommonModule],

})
export class TableContainerComponent {
  @Input() data: any[] = [];
}
