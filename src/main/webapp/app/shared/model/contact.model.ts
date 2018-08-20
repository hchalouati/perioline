export interface IContact {
  id?: number;
  phone1?: string;
  email1?: string;
  phone2?: string;
  email2?: string;
  streetAddress?: string;
  postalCode?: string;
  country?: string;
  city?: string;
  stateProvince?: string;
}

export const defaultValue: Readonly<IContact> = {};
