import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import patient, {
  PatientState
} from 'app/entities/patient/patient.reducer';
// prettier-ignore
import paymentDetails, {
  PaymentDetailsState
} from 'app/entities/payment-details/payment-details.reducer';
// prettier-ignore
import invoice, {
  InvoiceState
} from 'app/entities/invoice/invoice.reducer';
// prettier-ignore
import cabinet, {
  CabinetState
} from 'app/entities/cabinet/cabinet.reducer';
// prettier-ignore
import practitioner, {
  PractitionerState
} from 'app/entities/practitioner/practitioner.reducer';
// prettier-ignore
import contact, {
  ContactState
} from 'app/entities/contact/contact.reducer';
// prettier-ignore
import charting, {
  ChartingState
} from 'app/entities/charting/charting.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly patient: PatientState;
  readonly paymentDetails: PaymentDetailsState;
  readonly invoice: InvoiceState;
  readonly cabinet: CabinetState;
  readonly practitioner: PractitionerState;
  readonly contact: ContactState;
  readonly charting: ChartingState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  patient,
  paymentDetails,
  invoice,
  cabinet,
  practitioner,
  contact,
  charting,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
