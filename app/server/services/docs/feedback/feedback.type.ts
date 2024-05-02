// types
import type { Prisma } from "@prisma/client";
import type { Observable } from "rxjs";
import type { TPage } from "~/types";

export interface IFeedBack {
  findFeedbackByPage$(data: TPage): Observable<any[]>;
  createFeedback$(data: Prisma.FeedBackCreateArgs): Observable<any>;
  updateFeedBackById$(data: Prisma.FeedBackUpdateArgs): Observable<any>;
  deleteFeedBackByIds$(ids: Prisma.FeedBackDeleteManyArgs): Observable<any>;
  getFeedBackCount$(): Observable<any>;
}
