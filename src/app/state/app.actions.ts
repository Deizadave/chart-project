import { DatasetId } from '../models/dataset-id.enum';
import { DateRange } from '../models/date';
import { Rank, RankRange } from '../models/rank.interface';

export namespace AppActions {
  export class SelectDataset {
    static readonly type = '[App] select dataset';
    constructor(public datasetId: DatasetId) { }
  }

  export class SetDateRange {
    static readonly type = '[App] set date range';
    constructor(public range: DateRange) { }
  }

  export class SetRankRange {
    static readonly type = '[App] set rank range';
    constructor(public range: RankRange) { }
  }
}
