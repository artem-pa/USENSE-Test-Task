import { Component, OnInit } from '@angular/core';
import { IExchabgeRate, IExchabgeRateFull, IExchabgeRateUsdEur } from 'src/app/interfaces/exchange-rate.interface';

import { HttpService } from 'src/app/services/http/http.service';

type ExchangeValue = {
  currency: string,
  value: string,
  isInput: boolean
}

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
  leftSide: ExchangeValue = {
    currency: 'UAH',
    value: '0',
    isInput: true
  }
  rightSide: ExchangeValue = {
    currency: 'USD',
    value: '0',
    isInput: false
  }

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
      usd: data.filter(rate => rate.cc === 'USD')[0].rate,
      eur: data.filter(rate => rate.cc === 'EUR')[0].rate,
      date: data[0].exchangedate
    }
  }

  getRate(data: IExchabgeRateFull[]) {
    this.rateArray = [];
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

  updateCurrency(side: 'left' | 'right', currency: string) {
    switch (side) {
      case 'left':
        this.leftSide.currency = currency;
        this.leftSide.isInput = true;
        this.rightSide.isInput = false;
        return;
      case 'right':
        this.rightSide.currency = currency;
        this.rightSide.isInput = true;
        this.leftSide.isInput = false;
    }
  }

  get options(): [string, string][] {
    return this.rateArray.map(opt => [opt.cc, `${opt.cc} ${opt.txt}`])
  }
}
