import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import store from "./redux/store";
import App from "./App";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "https://countriesback-production-03c3.up.railway.app/"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // datos frescos por 5 minutos
      retry: 1,
    },
  },
});

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
