import { Moment } from 'moment';
import { ICabinet } from 'app/shared/model//cabinet.model';
import { IContact } from 'app/shared/model//contact.model';
import { IPatient } from 'app/shared/model//patient.model';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface IPractitioner {
  id?: number;
  gender?: Gender;
  firstName?: string;
  lastName?: string;
  birthDate?: Moment;
  civility?: string;
  diploma?: string;
  photoContentType?: string;
  photo?: any;
  signature?: string;
  cabinet?: ICabinet;
  practitioner?: IContact;
  practitioners?: IPatient[];
  practitioners?: ICabinet[];
}

export const defaultValue: Readonly<IPractitioner> = {};
