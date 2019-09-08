import { connect } from 'react-redux'
import React, { Component } from 'react'
import { receiveRisk } from '../actions/riskActions'
import AppContent from '../constants/textConstants'

const mapStateToProps = state => ({
  risk: state.user.riskprofile
})

const mapDispatchToProps = dispatch => ({
  receiveRisk: risk => dispatch(receiveRisk(risk))
})

class PortfolioForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      stock: "",
      bond: "",
      gold: "",
      cash: "",
      realEstate: "",
      active: false,
      valid: true
    }
    this.toggle = this.toggle.bind(this);
    this.isValid = this.isValid.bind(this);
  }
   
  toggle() {
    const { active } = this.state;
    this.setState({ active: !active })
  }
  
  isValid(){
    const {stock, bond, gold, cash, realEstate} = this.state;
    const fields = [stock, bond, gold, cash, realEstate];
    if (fields.every(this.validateForm)) {
      this.setState({valid: true})
    } else {
      this.setState({valid: false})
    }
  }

  validateForm(input){
    if (/\D/.test(input)) {
      return false;
    }
    return true;
  }

  setUpdate(field, e) {
    this.setState({ [field]: e.currentTarget.value })
    setTimeout(this.isValid, 10);
  }
  
  update(field){
    return e => this.setUpdate(field, e);
  }

  inputField(field){
    return(
      <div className="form-item-container">
      <label className="portfolio-label text-main">{AppContent.investments[field]}</label>
        <input 
          type="text"
          className="portfolio-input text-main"
          onChange={this.update(field)}
          placeholder={AppContent.profile.placeholder}
          value={this.state[field]} />
      </div>
    )
  }

  formError(){
    return (
      <p>{AppContent.profile.error}</p>
    )
  }

  form(){
    return(
      <form className="portfolio-form text-main">
        {this.state.valid ? "" : this.formError()}
        {this.inputField("stock")}
        {this.inputField("bond")}
        {this.inputField("gold")}
        {this.inputField("cash")}
        {this.inputField("realEstate")}
        <input type="submit" onClick={this.handleSubmit} className="portfolio-sub"/>
      </form>
    );
  }

  render(){
    const { active } = this.state;
    return (
      <div className='portfolio-container'>
        <h4 onClick={this.toggle} className="text-main">
          {active ? "-" : "+"} {AppContent.profile.title}
        </h4>
        {active ? this.form() : ""}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioForm)
