import { connect } from 'react-redux'
import React from 'react'
import AppContent from '../constants/textConstants'
import appColors from '../constants/colorConstants'

const mapStateToProps = state => ({
  riskProfile: state.user.riskprofile,
  userProfile: state.user.userProfile,
  investment: state.investment
})

const mapDispatchToProps = dispatch => ({})

function Investment(props) {

  const lineItem = (type) => (
    <li className="investment-item">
        <div className="left-investment">
          <div 
          className="color-swatch" 
          style={{background: appColors.graph.balance[type]}}/>
          <span className="text-main">{AppContent.investments[type]}</span>
        </div>
        <div className="right-investment">
          <span className="text-main">{props.investment[type]}%</span>
        </div>
      </li>
  );

  if (props.riskProfile !=0) {
    return (
      <ul className="investment-list">
        {lineItem("stock")}
        {lineItem("bond")}
        {lineItem("gold")}
        {lineItem("cash")}
        {lineItem("realEstate")}
      </ul>
  );
  } else {
    return null;
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Investment);
