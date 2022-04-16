import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.scss";
import "./styles/auth.scss";
import App from "./App";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import clayful from "clayful/client-js";
import axios from "axios";

clayful.config({
  client:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImYzY2Y0NmJkNDBlMGJmNmMxMmZjNTg0N2U4OWNhMGVjMjg0MTNkZTlkMjFmZTAzZDNhZmQzYzE2ZTVlMDc1NzgiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjQwOTYxNDI4LCJzdG9yZSI6IlVUQTdKQ0tVS0JWNS5HQ1M4QVRVSEhMRFoiLCJzdWIiOiIyUDVFSFlIVllNWlkifQ.8lzKg2GFhYC6zJr8NY6MZm2fnly6sE9eQNylYDjpdjE",
});
clayful.install("request", require("clayful/plugins/request-axios")(axios));

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </StrictMode>
);
