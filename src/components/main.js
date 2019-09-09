import React from 'react';
import AppContent from "../constants/textConstants";
import RiskFactor from "./riskFactor";
import PortfolioForm from "./form";
import InvestGraph from "./graphDisplay";

const Main = () => (
  <>
    <header className="App-header app-blue" >
      {AppContent.title}
    </header>
      <PortfolioForm />
      <RiskFactor />
      <InvestGraph />
  </>
)

export default Main;