import { connect } from 'react-redux'
import React from 'react'
import AppContent from '../constants/textConstants'
import appColors from '../constants/colorConstants'

const mapStateToProps = state => ({
  userProfile: state.user.userProfile,
  investment: state.investment
})

const mapDispatchToProps = dispatch => ({})


// general functions not relying on the components props
function wholePercent (amount, total) {
  return Math.floor((amount / total) * 100)
}

function arrSum (arr) {
  return arr.reduce((a, b) => a + b, 0)
}

function findImbalance (investmentsPercent, investment) {
  let imbalance = {};
  const investCata = Object.keys(investment);
  for (let i = 0; i < investCata.length; i++) {
    const element = investCata[i];
    if (investment[element] !== investmentsPercent[element]) {
      imbalance[element] = investment[element] - investmentsPercent[element];
    };
  };
  return imbalance;
}


// React component of the investment movement recommendation
function MoveInvest (props) {
  const lineItem = type => (
    <li className='investment-item'>
    </li>
  )

  // find the total amount invested
  let totalInvested = 0;
  let invested = [];
  if (props.userProfile) {
    invested = [
      parseInt(props.userProfile.stock), 
      parseInt(props.userProfile.bond), 
      parseInt(props.userProfile.cash), 
      parseInt(props.userProfile.gold), 
      parseInt(props.userProfile.realEstate)
    ]
    totalInvested = arrSum(invested);
  }

  // get the percent of what each category is currently
  let investmentsPercent = {};
  if (invested.length > 0) {
    const categories = Object.keys(props.userProfile);
    for (let i = 0; i < categories.length; i++) {
      const percent = wholePercent(invested[i], totalInvested)
      investmentsPercent[categories[i]] = percent;
    }
  }

  // compare the 2 investments and find the imbalance
  let imbalance = {};
  if (props.userProfile){
    imbalance = findImbalance(investmentsPercent, props.investment);
  }

  // if an imbalance exists determine how much is needed to move and to where
  if (Object.keys(imbalance) > 0){
    
  }

  if (!props.userProfile){
    return null;
  } else {
    return (
      <ul className='investment-move'>
        <li>{totalInvested}</li>
      </ul>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveInvest)
