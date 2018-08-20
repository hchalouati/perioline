import { Moment } from 'moment';
import { IContact } from 'app/shared/model//contact.model';
import { ICharting } from 'app/shared/model//charting.model';
import { IPractitioner } from 'app/shared/model//practitioner.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface IPatient {
  id?: number;
  orgId?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  birthDate?: Moment;
  civility?: string;
  profession?: string;
  note?: string;
  patient?: IContact;
  patiens?: ICharting[];
  practitioner?: IPractitioner;
}

export const defaultValue: Readonly<IPatient> = {};
