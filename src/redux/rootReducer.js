import authSlice from "./reducers/authReducer";
import configSlice from "./reducers/configReducer";
import lessonSlice from "./reducers/lessonReducer";
import mediaSlice from "./reducers/mediaReducer";
import toastifySlice from "./reducers/toastReducer";
import userSlice from "./reducers/userReducer";


export const rootReducer = {
    configState: configSlice,
    toastifyState: toastifySlice,
    authState: authSlice,
    mediaState: mediaSlice,
    userState: userSlice,
    lessonState: lessonSlice,
}