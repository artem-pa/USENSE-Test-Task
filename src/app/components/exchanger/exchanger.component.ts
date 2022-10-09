import { Component, OnInit } from '@angular/core';
import {
  IExchabgeRate,
  IExchabgeRateFull,
  IExchabgeRateUsdEur,
} from 'src/app/interfaces/exchange-rate.interface';

import { HttpService } from 'src/app/services/http/http.service';

type ExchangeValue = {
  currency: string;
  value: string;
};

@Component({
  selector: 'app-exchanger',
  templateUrl: './exchanger.component.html',
  styleUrls: ['./exchanger.component.scss'],
})
export class ExchangerComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  rateArray: IExchabgeRate[] = [];
  usdEurRate: IExchabgeRateUsdEur | null = null;
  isLeftInput = true;
  leftSide: ExchangeValue = {
    currency: 'UAH',
    value: '0',
  };
  rightSide: ExchangeValue = {
    currency: 'USD',
    value: '0',
  };

  ngOnInit(): void {
    this.loadRates();
  }

  get options(): [string, string][] {
    return this.rateArray.map((opt) => [opt.cc, `${opt.cc} ${opt.txt}`]);
  }

  loadRates() {
    this.httpService.getRate().subscribe((data) => {
      this.getUsdEurRate(data);
      this.getAllRates(data);
    });
  }

  getUsdEurRate(data: IExchabgeRateFull[]) {
    this.usdEurRate = {
      usd: data.filter((rate) => rate.cc === 'USD')[0].rate,
      eur: data.filter((rate) => rate.cc === 'EUR')[0].rate,
      date: data[0].exchangedate,
    };
  }

  getAllRates(data: IExchabgeRateFull[]) {
    this.rateArray = [];
    this.rateArray.push({
      cc: 'UAH',
      rate: 1,
      txt: 'Українська гривня',
    });
    data.forEach((rate) =>
      this.rateArray.push({
        cc: rate.cc,
        rate: rate.rate,
        txt: rate.txt,
      })
    );

    const usdRate = this.rateArray.splice(
      this.rateArray.findIndex((rate) => rate.cc === 'USD'),
      1
    )[0];
    const eurRate = this.rateArray.splice(
      this.rateArray.findIndex((rate) => rate.cc === 'EUR'),
      1
    )[0];

    this.rateArray.splice(1, 0, usdRate, eurRate);
  }

  updateCurrency(side: 'left' | 'right', currency: string) {
    switch (side) {
      case 'left':
        this.leftSide.currency = currency;
        this.isLeftInput = true;
        break;
      case 'right':
        this.rightSide.currency = currency;
        this.isLeftInput = false;
        break;
      default:
        return;
    }
    this.calcExchange();
  }

  updateValue(side: 'left' | 'right', value: string) {
    switch (side) {
      case 'left':
        this.leftSide.value = value;
        this.isLeftInput = true;
        break;
      case 'right':
        this.rightSide.value = value;
        this.isLeftInput = false;
        break;
      default:
        return;
    }
    this.calcExchange();
  }

  getRate(currency: string): number {
    return this.rateArray.filter((rate) => rate.cc === currency)[0].rate;
  }

  calcExchange() {
    let input = this.leftSide;
    let output = this.rightSide;

    if (!this.isLeftInput) {
      input = this.rightSide;
      output = this.leftSide;
    }
    const inputRate = this.getRate(input.currency);
    const outputRate = this.getRate(output.currency);
    const rate = inputRate / outputRate;

    if (isNaN(Number(input.value))) {
      output.value = '0';
    }
    else {
      output.value = (Number(input.value) * rate).toFixed(2);
    }

    console.log('input: ', [input, inputRate]);
    console.log('output', [output, outputRate]);
    console.log(this.leftSide.value, this.rightSide.value);
  }
}
