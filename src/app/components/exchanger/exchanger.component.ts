import { Component, OnInit } from '@angular/core';
import { IExchabgeRate, IExchabgeRateFull, IExchabgeRateUsdEur } from 'src/app/interfaces/exchange-rate.interface';

import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.scss']
})
export class ExchangerComponent implements OnInit {

  constructor(
    private httpService: HttpService
  ) { }

  rateArray: IExchabgeRate[] = [];
  usdEurRate: IExchabgeRateUsdEur | null = null;

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates() {
    this.httpService.getRate().subscribe(data => {
      this.getUsdEurRate(data);
      this.getRate(data);
      console.log(this.usdEurRate)
    })
  }

  getUsdEurRate(data: IExchabgeRateFull[]) {
    this.usdEurRate = {
      eur: data.filter(rate => rate.cc === 'EUR')[0].rate,
      usd: data.filter(rate => rate.cc === 'USD')[0].rate,
      date: data[0].exchangedate
    }
  }

  getRate(data: IExchabgeRateFull[]) {
    this.rateArray.push({
      cc: 'UAH',
      rate: 1,
      txt: 'Українська гривня'
    })
    data.forEach(rate => this.rateArray.push({
      cc: rate.cc,
      rate: rate.rate,
      txt: rate.txt
    }))
  }
}
