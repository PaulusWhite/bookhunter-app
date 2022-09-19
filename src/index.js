import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

//Contexts
import { StoreProvider } from "./context/Context";
import { CustomTextContextProvide } from "./context/CustomTextContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <StoreProvider>
      <CustomTextContextProvide>
        <App />
      </CustomTextContextProvide>
    </StoreProvider>
  // </React.StrictMode>
);