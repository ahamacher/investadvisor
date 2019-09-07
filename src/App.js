import React from 'react';
import { Provider } from "react-redux";
import './App.css';
import Main from "./components/main";

const App = ({ store }) => (
    <Provider store={ store }>
      <Main />
    </Provider>
);

export default App;
