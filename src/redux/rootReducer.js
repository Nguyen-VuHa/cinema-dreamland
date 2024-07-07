import authSlice from "./reducers/authReducer";
import toastifySlice from "./reducers/toastReducer";


export const rootReducer = {
    authState: authSlice,
    toastifyState: toastifySlice,
}