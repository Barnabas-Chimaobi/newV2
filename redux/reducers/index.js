import userSlice, { userDetails} from './authReducer';
import formSlice, {fieldName, fieldType, generatedForm} from './formReducers'
import schoolSetupSlice, {faculty, department, session, programme} from './schoolSetup'
import invoiceSlice, {invoices} from './invoice'
import studentSlice, {printRegistered} from './studentReducer'
// import networkSlice, {checkNetwork} from './network'

export {
  userSlice,
  userDetails,
  formSlice,
   faculty,
   session,
   department,
   programme,
   schoolSetupSlice,
   fieldName,
   fieldType,
   generatedForm,
   invoiceSlice,
   invoices,
   studentSlice,
   printRegistered
   // networkSlice,
   // checkNetwork,
   // semester,
   // session
};