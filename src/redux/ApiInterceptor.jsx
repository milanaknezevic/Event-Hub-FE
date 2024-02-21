// import axios from "axios";
// // import {LOCAL_STORAGE_TOKEN, logout, setLoginModalState} from '../redux-store/auth.jsx';
// // import {ResponseStatus} from "./responseStatus.jsx";
// // import {FORBIDDEN_ERROR_MESSAGE} from "../constants/messages.jsx";
//
import axios from "axios";


//
// axios.defaults.headers.common['Accept-Language'] = localStorage.getItem("i18nextLng")
//
// const interceptor = store => {
//     api.interceptors.request.use(async request => {
//         const token = localStorage.getItem("token");
//         request.url = `/api${request.url}`;
//         request.headers.Authorization = `Bearer ${token}`;
//         request.headers["Accept-Language"] = localStorage.getItem("i18nextLng")
//         return request
//     })
//
//     // api.interceptors.response.use(response => {
//     //     return response
//     // }, error => {
//     //     if (error.response && error.response.status === ResponseStatus.UNAUTHORIZED) {
//     //         store.dispatch(logout({token_invalid: true, token_message: error.response.data?.messages[0]?.message}))
//     //     } else if (error.response && error.response.status === ResponseStatus.INTERNAL_ERROR) {
//     //         store.dispatch(setAutoRedirect(ResponseStatus.INTERNAL_ERROR));
//     //     } else if (error.response && error.response.status === ResponseStatus.FORBIDDEN) {
//     //         if (error.response?.data?.detail === FORBIDDEN_ERROR_MESSAGE) {
//     //             store.dispatch(setLoginModalState({modalOpen: true}));
//     //         } else {
//     //             store.dispatch(setAutoRedirect(ResponseStatus.FORBIDDEN));
//     //         }
//     //     }
//     //     return Promise.reject(error);
//     // })
// }
//
// export default api;
// export {interceptor}
