import { of, delay } from "rxjs";
import {
  activeData,
  dataSource,
  getHistoryData,
  monthPartSaleData,
  monthSales,
  monthVisit,
  paymentData,
  salesData,
  salesDataInPies,
  searchAvageCountData,
  searchCountData,
  visitCountData,
} from "~/__mock__/db/dashboard/analysis";

export const getAnalysisData$ = () => {
  return of({
    one: {
      salesData,
      visitCountData,
      paymentData,
      activeData,
    },
    two: {
      monthSales,
      monthVisit,
      monthPartSaleData,
    },
    three: {
      searchCountData,
      searchAvageCountData,
      dataSource,
      pies: { ...salesDataInPies },
    },
    four: {
      ...getHistoryData(),
    },
  }).pipe(delay(20));
};
