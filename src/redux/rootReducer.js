import authSlice from "./reducers/authReducer";
import configSlice from "./reducers/configReducer";
import mediaSlice from "./reducers/mediaReducer";
import toastifySlice from "./reducers/toastReducer";


export const rootReducer = {
    configState: configSlice,
    toastifyState: toastifySlice,
    authState: authSlice,
    mediaState: mediaSlice,
}