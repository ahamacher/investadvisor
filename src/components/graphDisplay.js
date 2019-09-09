import { connect } from 'react-redux'
import React from 'react';
import AppContent from '../constants/textConstants';
import appColors from '../constants/colorConstants';
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory';

const mapStateToProps = state => ({
  riskProfile: state.user.riskprofile,
  userProfile: state.user.userProfile,
  investment: state.investment
})

const mapDispatchToProps = dispatch => ({
})

function CustomLabel(props) {
  return (
    <g>
      <VictoryLabel {...props} />
      <VictoryTooltip
        {...props}
        x={200}
        y={250}
        orientation='top'
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: appColors.app.secondary, stroke: "none" }}
        style={{ fill: "white", fontSize: "18px" }}
      />
    </g>
  )
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents


function InvestGraph(props) {
  const { stock, bond, cash, gold, realEstate } = props.investment;
  const { riskProfile } = props;
  const data = [
    { y: stock, label: AppContent.investments.stock},
    { y: bond, label: AppContent.investments.bond},
    { y: cash, label: AppContent.investments.cash},
    { y: gold, label: AppContent.investments.gold},
    { y: realEstate, label: AppContent.investments.realEstate}
  ]

  const { balance } = appColors.graph;
  const colorScale = [
    balance.stock, 
    balance.bond, 
    balance.cash, 
    balance.gold, 
    balance.realEstate
  ];

    if (riskProfile != 0) {
      return(
        <div className="graph-container">
          <VictoryPie 
          style={{ labels: {display: "none"} }}
          data={data} 
          animate={{duration: 1000}} 
          colorScale={colorScale}
          innerRadius={100}
          labelRadius={120}
          labelComponent={<CustomLabel />}
          />
        </div>
      );
    } else {
      return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestGraph);
