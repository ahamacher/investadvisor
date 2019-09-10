import { connect } from 'react-redux';
import React from 'react';
import AppContent from '../constants/textConstants';
import appColors from '../constants/colorConstants';

const mapStateToProps = state => ({
  userProfile: state.user.userProfile,
  investment: state.investment,
  risk: state.user.riskprofile
})

const mapDispatchToProps = dispatch => ({})


// general functions not relying on the components props
function wholePercent (amount, total) {
  const number = Math.round(amount / total * 100) ;

  return number;
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
  // find the total amount invested
  let totalInvested = 0;
  let invested = [];
  if (props.userProfile) {
    invested = [
      parseInt(props.userProfile.stock), 
      parseInt(props.userProfile.bond), 
      parseInt(props.userProfile.gold), 
      parseInt(props.userProfile.cash), 
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
  let changeAmount = {}
  if (props.userProfile){
    imbalance = findImbalance(investmentsPercent, props.investment);
    // if an imbalance exists determine how much is needed to move
    if (Object.keys(imbalance).length > 0){
      const imbaKeys = Object.keys(imbalance);
      for (let i = 0; i < imbaKeys.length; i++) {
        const key = imbaKeys[i];
        const changeValue =  Math.round(totalInvested * (imbalance[key] / 100) * 100) / 100;
        changeAmount[key] = changeValue;
      }
    }
  }

  // send the amount from one item to another
  let moved = [];
  if (Object.keys(changeAmount).length > 0){
    const needsChange = Object.keys(changeAmount);
    let needsMoreFunding = [];
    let needsLessFunding = [];

    // split into 2 arrays one positive one negative
    for (let i = 0; i < needsChange.length; i++) {
      let change = {};
      const ele = needsChange[i];
      change[ele] = changeAmount[ele];
      if (changeAmount[ele] > 0) {
        needsMoreFunding.push(change);
      } else {
        needsLessFunding.push(change);
      }
    }

    // until the arrays are empty move and record what was moved
    let j = 0;
    let k = 0;

    while (j < needsLessFunding.length && k < needsMoreFunding.length) {
      let source = needsLessFunding[j];
      let destination = needsMoreFunding[k];
      let sourceCatagory = Object.keys(needsLessFunding[j])[0];
      let destinationCatagory = Object.keys(needsMoreFunding[k])[0];
      let sourceAmount = source[sourceCatagory];
      let destinationAmount = destination[destinationCatagory];
      let movedChange = 0;
      let history = {};
    
      // compare the 2 values and iterate through the values array accordingly
      // this also records the source, destination and amount to history

      if (Math.abs(sourceAmount) - destinationAmount > 0){
        needsLessFunding[j][sourceCatagory] = Math.abs(sourceAmount) - destinationAmount;
        movedChange = Math.abs(destinationAmount);
        history = {sourceCatagory, movedChange, destinationCatagory};
        k += 1;
      } else if (Math.abs(sourceAmount) - destinationAmount === 0){
        movedChange = destinationAmount;
        history = { sourceCatagory, movedChange, destinationCatagory }
        j += 1;
        k += 1;
      } else {
        movedChange = Math.abs(sourceAmount);
        needsMoreFunding[k][destinationCatagory] = destinationAmount - Math.abs(sourceAmount);
        needsLessFunding[j][sourceCatagory] = 0;
        history = { sourceCatagory, movedChange, destinationCatagory}
        j += 1
      }
      moved.push(history);
    }
  }

  const movedList = moved.map( (move, idx) => {

    return(
      <li key={idx} className="move-item">
        {AppContent.comparison.move}{" "}
        ${move.movedChange.toFixed(2)} from{" "}
        <div 
          className="color-swatch" 
          style={{background: appColors.graph.balance[move.sourceCatagory]}}
        />
        {AppContent.investments[move.sourceCatagory]}
        {" "}to{" "}
        <div 
          className="color-swatch" 
          style={{background: appColors.graph.balance[move.destinationCatagory]}}
        />
        {AppContent.investments[move.destinationCatagory]}.
      </li>
    )
  })

  if (!props.userProfile || props.risk == 0){
    return null;
  } else {
    return ( 
      <div className="move-pane">
        <div className="move-title">
          {AppContent.comparison.title}
        </div>
        <ul className='investment-move'>
          {movedList}
        </ul>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveInvest)
