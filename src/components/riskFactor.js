import { connect } from "react-redux";
import React from "react";
import { receiveRisk } from "../actions/riskActions";
import AppContent from "../constants/textConstants";

const mapStateToProps = (state) => ({
  risk: state.user.riskprofile
});

const mapDispatchToProps = dispatch => ({
  receiveRisk: risk => dispatch(receiveRisk(risk))
})

function RiskFactor(props) {
  const handleChange = e => {
    const { receiveRisk } = props;
    receiveRisk(e.target.value);
  }

  const { risk } = props;

  return(
    <div className="slide-container">
      <h4 className="risk-title text-main">{AppContent.risk} : <span 
        className="risk-count">
        {risk}
        </span>
      </h4>
      <input 
        type="range" 
        min="0" max="10" 
        value={risk} 
        onChange={handleChange}
        step="1"/>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RiskFactor);
