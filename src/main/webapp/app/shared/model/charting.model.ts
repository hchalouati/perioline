import { Moment } from 'moment';
import { IPatient } from 'app/shared/model//patient.model';

export interface ICharting {
  id?: number;
  orgId?: string;
  notes?: string;
  date?: Moment;
  patient?: IPatient;
}

export const defaultValue: Readonly<ICharting> = {};
