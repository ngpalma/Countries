import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store from "./redux/store";
import App from "./App";
import "./index.css";
import axios from "axios"

// axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.baseURL = "https://countriesback-production-03c3.up.railway.app/"

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
