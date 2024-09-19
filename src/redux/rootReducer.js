import authSlice from "./reducers/authReducer";
import configSlice from "./reducers/configReducer";
import toastifySlice from "./reducers/toastReducer";


export const rootReducer = {
    configState: configSlice,
    authState: authSlice,
    toastifyState: toastifySlice,
}