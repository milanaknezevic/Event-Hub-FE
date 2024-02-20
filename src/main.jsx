import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Provider } from "react-redux";
import { store } from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById('root'))
//interceptor(store);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)