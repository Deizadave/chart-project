import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AppActions } from './app.actions';
import { DatasetId } from '../models/dataset-id.enum';
import { ProductRank } from '../models/product-rank.type';
import { BedroomFurnitureBSROverTime } from '../../assets/dataset/BSR/bedroom-furniture.dataset';
import { MattressesAndBoxSpringsBSROverTime } from '../../assets/dataset/BSR/mattresses-and-box-springs.dataset';
import { FurnitureBSROverTime } from '../../assets/dataset/BSR/furniture.dataset';
import * as moment from 'moment';
import { DateRange } from '../models/date';
import { RankBoundry, RankRange } from '../models/rank.interface';

export interface AppStateModel {
  dataset: { [key in DatasetId]: ProductRank[] };
  selectedDatasetId: DatasetId;
  rankRange: RankRange;
  dateRange: DateRange;
}


function getDataWithinDuration(dataset: ProductRank[], range: DateRange): ProductRank[] {
  const startDate = moment(range.startDate, 'MM/DD/YYYY').subtract(1, 'days').utc(true);
  const endDate = moment(range.endDate, 'MM/DD/YYYY').utc(true);

  return dataset.filter((p) => moment(p.date, 'MM/DD/YYYY').isBetween(startDate, endDate));
}

const defaults: AppStateModel = {
  dataset: {
    [DatasetId.BSR_FURNITURE]: FurnitureBSROverTime,
    [DatasetId.BSR_BEDROOM_FURNITURE]: BedroomFurnitureBSROverTime,
    [DatasetId.BSR_MATTRESSES_AND_BOX_SPRINGS]: MattressesAndBoxSpringsBSROverTime,
  },
  selectedDatasetId: DatasetId.BSR_FURNITURE,
  rankRange: {
    min: RankBoundry.MIN,
    max: RankBoundry.MAX
  },
  dateRange: {
    startDate: '11/30/2019',
    endDate: '12/06/2019'
  }
}

@State<AppStateModel>({
  name: 'app',
  defaults
})
@Injectable()
export class AppState {
  constructor() {
  }

  @Selector()
  public static selectedDataset(state: AppStateModel): ProductRank[] {
    const dataset = getDataWithinDuration(state.dataset[state.selectedDatasetId], state.dateRange)
    return dataset;
  }

  @Selector()
  public static selectedDatasetId(state: AppStateModel): DatasetId {
    return state.selectedDatasetId;
  }

  @Selector()
  public static rankRange(state: AppStateModel): RankRange {
    return state.rankRange;
  }

  @Selector()
  public static dateRange(state: AppStateModel): DateRange {
    return state.dateRange;
  }

  @Action(AppActions.SelectDataset)
  selectDataset({ patchState }: StateContext<AppStateModel>, { datasetId }: AppActions.SelectDataset) {
    patchState({ selectedDatasetId: datasetId });
  }

  @Action(AppActions.SetDateRange)
  setDateRange({ patchState }: StateContext<AppStateModel>, { range }: AppActions.SetDateRange) {
    patchState({ dateRange: range });
  }

  @Action(AppActions.SetRankRange)
  setRankRange({ patchState }: StateContext<AppStateModel>, { range }: AppActions.SetRankRange) {
    patchState({ rankRange: range });
  }
}
