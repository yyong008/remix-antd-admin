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
import { delay, of } from "rxjs";

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
