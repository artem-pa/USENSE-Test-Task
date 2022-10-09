import { Component, Input } from '@angular/core';
import { IExchabgeRateUsdEur } from 'src/app/interfaces/exchange-rate.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
  @Input() rate: IExchabgeRateUsdEur | null = null;

  constructor() {}

  currentDate = new Date();
}
