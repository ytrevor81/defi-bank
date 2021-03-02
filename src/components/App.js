import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react';
import Token from '../abis/Token.json'
import Web3 from 'web3';
import './App.css';

//h0m3w0rk - add new tab to check accrued interest

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if(typeof window.ethereum!=='undefined'){
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();

      if(typeof accounts[0]!=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0]);
        this.setState({ account: accounts[0], balance: balance, web3: web3 })

        console.log(balance);
      }
      else {
        window.alert('Please login to MetaMask.')
      }

      //load contracts
      try {
        const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address);
        const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address);
        const dBankAddress = dBank.networks[netId].address;
        this.setState({ token: token, dbank: dbank, dBankAddress: dBankAddress });
      } catch (e) {
        console.log('Error', e);
        window.alert('Contracts not deployed to the current network.');
      }

    }
    else {
      window.alert('This is a blockchain website. Please install the MetaMask browser extension to continue.')
    }


      //assign to values to variables: web3, netId, accounts

      //check if account is detected, then load balance&setStates, elsepush alert

      //in try block load contracts

    //if MetaMask not exists push alert
  }

  async deposit(amount) {
    //check if this.state.dbank is ok
      //in try block call dBank deposit();
  }

  async withdraw(e) {
    //prevent button from default click
    //check if this.state.dbank is ok
    //in try block call dBank withdraw();
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null
    }
  }

  render() {
    return (
      <div className='text-monospace'>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <h1>Welcome to Trev's DeFi Bank</h1>
          <h3>Account: {this.state.account}</h3>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                {/*add Tab deposit*/}
                {/*add Tab withdraw*/}
              </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
