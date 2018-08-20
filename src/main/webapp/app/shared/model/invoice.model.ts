import { Moment } from 'moment';
import { ICabinet } from 'app/shared/model//cabinet.model';

export interface IInvoice {
  id?: number;
  orgId?: string;
  productName?: string;
  date?: Moment;
  total?: number;
  invoicePDF?: string;
  cabinet?: ICabinet;
}

export const defaultValue: Readonly<IInvoice> = {};
