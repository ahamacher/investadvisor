import { connect } from 'react-redux'
import React, { Component } from 'react'
import { submitProfile } from '../actions/formActions'
import AppContent from '../constants/textConstants'

const mapStateToProps = state => ({
  risk: state.user.riskprofile
})

const mapDispatchToProps = dispatch => ({
  submitProfile: payload => dispatch(submitProfile(payload))
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(){
    const { stock, bond, gold, cash, realEstate, valid } = this.state;
    const stateArr = [stock, bond, gold, cash, realEstate];
    const { submitProfile } = this.props;
    if (!valid) {
      return;
    } else {
      // this solves a blank input issue
      for (let i = 0; i < stateArr.length; i++) {
        const ele = stateArr[i];
        if (ele === "") {
          stateArr[i] = "0";
        };
      }
      const payload = {
        stock: stateArr[0],
        bond: stateArr[1],
        gold: stateArr[2],
        cash: stateArr[3],
        realEstate: stateArr[4]
      }
      submitProfile(payload);
    }
    
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
      <p className="input-err">{AppContent.profile.error}</p>
    )
  }

  form(){
    return(
      <form className="portfolio-form text-main">
        {this.state.valid ? "" : this.formError()}
        <p className="input-head">{AppContent.profile.profileSub}</p>
        {this.inputField("stock")}
        {this.inputField("bond")}
        {this.inputField("gold")}
        {this.inputField("cash")}
        {this.inputField("realEstate")}
        <div onClick={this.handleSubmit} className="portfolio-sub">{AppContent.profile.submit}</div>
      </form>
    );
  }

  render(){
    const { active } = this.state;
    return (
      <div className='portfolio-container'>
        <h4 onClick={this.toggle} className="text-main dropdown">
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
