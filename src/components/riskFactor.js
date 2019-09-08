import { connect } from "react-redux";
import React from "react";
import { receiveRisk } from "../actions/riskActions";

const mapStateToProps = (state) => ({
  risk: state.user.riskprofile,
  investment: state.investment
});

const mapDispatchToProps = dispatch => ({
  receiveRisk: risk => dispatch(receiveRisk(risk))
})

class RiskFactor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0
    }
  }

  handleChange = e => {
    const { receiveRisk } = this.props;
    this.setState({value: e.target.value});
    receiveRisk(e.target.value);
  }

  render(){
    return(
      <div className="slide-container">
        <input 
          id="risk-slide"
          type="range" 
          min="0" max="10" 
          value={this.state.value} 
          onChange={this.handleChange}
          step="1"/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RiskFactor);
