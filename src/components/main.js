import React from 'react';
import AppContent from "../constants/textConstants";
import RiskFactor from "./riskFactor";

const Main = () => (
  <>
    <header className="App-header" >
      {AppContent.title}
    </header>
      <RiskFactor />
  </>
)

export default Main;