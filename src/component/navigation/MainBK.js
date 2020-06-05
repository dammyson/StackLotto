/**
* This is the Main file
* This file contains the routes of all the pages
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router,Reducer,getInitialState, Actions } from 'react-native-router-flux';



import Splash from '../../screen/onboarding/Splash';
import Welcome from '../../screen/user/Welcome';
import Login from '../../screen/user/Login';
import Register from '../../screen/user/Register';
import Account from '../../screen/setting/Account';
import ForgetPassword from '../../screen/user/ForgetPassword';
import ChangePassword from '../../screen/user/ChangePassword';
import CreateWithdrawer from '../../screen/wallet/CreateWithdrawer';
import WithdrawerOrder from '../../screen/wallet/WithdrawerOrder';
import WalletTransactions from '../../screen/wallet/WalletTransactions';
import Home from '../../screen/user/Home';
import How from '../../screen/wallet/How';
import Notifications from '../../screen/user/Notification';
import Support from '../../screen/user/Support';

import SelectNumber from '../../screen/game/SelectNumber';
import BankPayment from '../../screen/wallet/BankPayment';
import TicketCheck from '../../screen/game/TicketCheck';
import Result from '../../screen/game/Result';
import History3 from '../../screen/game/History';
import ResultDetails from '../../screen/game/ResultDetails';
import Game from '../../screen/game/Game';
import Match from '../../screen/game/Match';
import SelectFiveNumber from '../../screen/game/SelectFiveNumber';
import SelectFourNumber from '../../screen/game/SelectFourNumber';
import MatchThree from '../../screen/game/MatchThree';
import MatchTwo from '../../screen/game/MatchTwo';
import Verify from '../../screen/user/Verify';
import Logout from '../../screen/user/Logout';

import ConfirmPlay from '../../screen/game/ConfirmPlay';
import TransactionsHistory from '../../screen/wallet/TransactionsHistory';
import FundWallet from '../../screen/setting/FundWallet';



export default class Main extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    switch (Actions.currentScene) {
      case 'home':
        BackHandler.exitApp()
        break

      default: Actions.pop()
    }

    return true
  }

  render() {
   
    return(
      <Root>
        <Router 
        >
          <Scene key="root">
            <Scene initial key="splash" component={Splash} hideNavBar />
            <Scene key="welcome" component={Welcome} hideNavBar />
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="reg" component={Register} hideNavBar />
            <Scene key="logout" component={Logout} hideNavBar />
            <Scene key="otp" component={Verify} hideNavBar />
            <Scene key="account" component={Account} hideNavBar />
            <Scene key="forgetpass" component={ForgetPassword} hideNavBar />
            <Scene key="changepass" component={ChangePassword} hideNavBar />
             <Scene key="createW" component={CreateWithdrawer} hideNavBar />
             <Scene key="orderW" component={WithdrawerOrder} hideNavBar />
             <Scene key="transW" component={WalletTransactions} hideNavBar />
             <Scene key="transH" component={TransactionsHistory} hideNavBar />
             <Scene key="home" component={Home} hideNavBar onBack={()=>{ this.showToast() }} back={true} />
             <Scene key="how" component={How} hideNavBar />
             <Scene key="noti" component={Notifications} hideNavBar />
             <Scene key="sup" component={Support} hideNavBar />
             <Scene key="sg" component={SelectNumber} hideNavBar  onBack={()=>{this.showToast()}} back={true} />
             <Scene key="bp" component={BankPayment} hideNavBar />
             <Scene key="tc" component={TicketCheck} hideNavBar />
             <Scene key="r" component={Result} hideNavBar />
             <Scene key="h" component={History3} hideNavBar />
             <Scene key="rd" component={ResultDetails} hideNavBar />
             <Scene key="game" component={Game} hideNavBar />
             <Scene key="match" component={Match} hideNavBar />
             <Scene key="matchthree" component={MatchThree} hideNavBar />
             <Scene key="matchtwo" component={MatchTwo} hideNavBar />
             <Scene key="selectFive" component={SelectFiveNumber} hideNavBar />
             <Scene key="selectFour" component={SelectFourNumber} hideNavBar />
             <Scene key="confirmplay" component={ConfirmPlay} hideNavBar />
             <Scene key="fundwallet" component={FundWallet} hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }

}
