import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import './assets/style/main.scss';
import {store} from "./service/store.ts";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
)
