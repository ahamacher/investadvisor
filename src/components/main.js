import React from 'react';
import AppContent from "../constants/textConstants";
import RiskFactor from "./riskFactor";
import PortfolioForm from "./form";
import InvestGraph from "./graphDisplay";
import Investment from "./investment";
import MoveInvest from "./moveInvest";

const Main = () => (
  <>
    <header className="App-header app-blue" >
      {AppContent.title}
    </header>
      <PortfolioForm />
      <RiskFactor />
      <InvestGraph />
      <Investment />
      <MoveInvest />
  </>
)

export default Main;