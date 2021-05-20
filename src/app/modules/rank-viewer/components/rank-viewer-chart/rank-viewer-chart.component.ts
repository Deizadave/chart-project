import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductRank } from '../../../../models/product-rank.type';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as moment from 'moment';
import { Product } from '../../../../models/product.interface';
import { RankRange } from 'src/app/models/rank.interface';

@Component({
  selector: 'dh-rank-viewer-chart',
  templateUrl: './rank-viewer-chart.component.html',
  styleUrls: ['./rank-viewer-chart.component.scss']
})
export class RankViewerChartComponent implements OnInit, OnChanges {
  @Input() selectedDataset: ProductRank[] | null = [];
  @Input() chartOptions: ChartOptions = {};
  @Input() rankRange: RankRange | null = null;
  
  
  
  chartData: ChartDataSets[] = [];
  chartLabels: Label[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.selectedDataset.currentValue) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions() {
    this.chartLabels = this.getLabels();
    this.chartData = this.getData();
  }

  private getLabels(): string[] {
    const dates: string[] = Array.from(new Set(this.selectedDataset?.map((r: ProductRank) => r.date)));

    return dates
        .map((d) => moment(d, 'MM/DD/YYYY').utc(true))
        .sort((a, b) => a.isAfter(b) ? 1 : -1)
        .map((d) => d.toISOString());
  }

  private getData(): ChartDataSets[] {
    const productASINs = Array.from(new Set(this.selectedDataset?.map((r: ProductRank) => r.ASIN)) ?? []);
    let data: ChartDataSets[] = [];
    
    for (const ASIN of productASINs) {
      const product: Product | null = this.getProduct(ASIN);

      if (!product) {
        continue;
      }

      data.push({ data: this.getProductData(product), label: product.name, fill: false });
    }
    
    data = this.rankRange ? data.slice(this.rankRange.min, this.rankRange.max) : data;

    return data;
  }

  private getProduct(ASIN: string): ProductRank | null {
    return this.selectedDataset?.find((p) => p.ASIN === ASIN) ?? null;
  }

  private getProductData(product: Product): Array<number | null> {
    const productData: Array<number | null> = [];

    for (const day of this.chartLabels) {
      const dayData = this.getProductRankByDay(product, day as string);

      productData.push(dayData?.rank ?? null);
    }

    return productData;
  }

  private getProductRankByDay(product: Product, date: string): ProductRank | null {
    const formattedDate: string = moment(date).utc(true).format('MM/DD/YYYY');

    return this.selectedDataset?.find((p) => p.ASIN === product.ASIN && p.date === formattedDate) ?? null;
  }
}
