import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store from "./redux/store";
import App from "./App";
import "./index.css";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
