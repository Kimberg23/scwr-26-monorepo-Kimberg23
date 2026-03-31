import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router";
import 'aws-amplify/ui-react/styles.css';
import 'antd/dist/antd.css';

import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";

Amplify.configure(config);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>
);

