import { ICabinet } from 'app/shared/model//cabinet.model';

export const enum CardType {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS'
}

export interface IPaymentDetails {
  id?: number;
  orgId?: string;
  type?: CardType;
  number?: string;
  expirationMonth?: number;
  expirationYear?: number;
  securityCode?: number;
  defaultCard?: boolean;
  cabinet?: ICabinet;
}

export const defaultValue: Readonly<IPaymentDetails> = {
  defaultCard: false
};
