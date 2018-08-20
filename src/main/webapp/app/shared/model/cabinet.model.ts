import { IContact } from 'app/shared/model//contact.model';
import { IInvoice } from 'app/shared/model//invoice.model';
import { IPractitioner } from 'app/shared/model//practitioner.model';
import { IPaymentDetails } from 'app/shared/model//payment-details.model';

export interface ICabinet {
  id?: number;
  orgId?: string;
  name?: string;
  activity?: string;
  website?: string;
  logoContentType?: string;
  logo?: any;
  cabinet?: IContact;
  cabinets?: IInvoice[];
  cabinets?: IPractitioner[];
  cabinets?: IPaymentDetails[];
  cabinets?: IPractitioner[];
}

export const defaultValue: Readonly<ICabinet> = {};
