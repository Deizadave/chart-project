import { Component, OnInit } from '@angular/core';
import { CHART_OPTIONS } from '../../models/chart-options';
import { Select, Store } from '@ngxs/store';
import { AppState } from '../../state/app.state';
import { Observable } from 'rxjs';
import { ProductRank } from '../../models/product-rank.type';
import { ChartOptions } from 'chart.js';
import { DatasetId } from '../../models/dataset-id.enum';
import { AppActions } from '../../state/app.actions';
import { DateRange } from '../../models/date';
import { RankRange } from '../../models/rank.interface';

@Component({
  selector: 'dh-rank-viewer',
  templateUrl: './rank-viewer.component.html',
  styleUrls: ['./rank-viewer.component.scss']
})
export class RankViewerComponent implements OnInit {
  // @ts-ignore
  @Select(AppState.selectedDataset) selectedDataset$: Observable<ProductRank[]>;

  // @ts-ignore
  @Select(AppState.selectedDatasetId) selectedDatasetId$: Observable<DatasetId>;

  // @ts-ignore
  @Select(AppState.dateRange) dateRange$: Observable<DateRange>;

  // @ts-ignore
  @Select(AppState.rankRange) rankRange$: Observable<RankRange>;


  chartsOptions: ChartOptions = CHART_OPTIONS;
  datasetIds: DatasetId[] = Object.values(DatasetId);

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
  }

  onDatasetSelection(datasetId: DatasetId) {
    this.store.dispatch(new AppActions.SelectDataset(datasetId));
  }

  onDateChange(dateRange: DateRange) {
    this.store.dispatch(new AppActions.SetDateRange(dateRange));
  }

  onRankChange(rankRange: RankRange) {
    this.store.dispatch(new AppActions.SetRankRange(rankRange));
  }

}
