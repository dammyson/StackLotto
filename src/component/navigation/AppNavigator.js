import { createStackNavigator, createAppContainer } from 'react-navigation';

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
import Confirm from '../../screen/game/Confirm';
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
import ConfirmTwo from '../../screen/game/ConfirmTwo';
import ConfirmThree from '../../screen/game/ConfirmThree';
import ConfirmFour from '../../screen/game/ConfirmFour';
import ConfirmBFour from '../../screen/game/ConfirmBFour';
import ConfirmFive from '../../screen/game/ConfirmFive';

const AppNavigator = createStackNavigator({
  /* */
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null
    }
  },
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      header: null
    }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      header: null
    }
  },
  Verify: {
    screen: Verify,
    navigationOptions: {
      header: null
    }
  },
  Account: {
    screen: Account,
    navigationOptions: {
      header: null
    }
  },
  CreateWithdrawer: {
    screen: CreateWithdrawer,
    navigationOptions: {
      header: null
    }
  },
  WithdrawerOrder: {
    screen: WithdrawerOrder,
    navigationOptions: {
      header: null
    }
  },
  WalletTransactions: {
    screen: WalletTransactions,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  How: {
    screen: How,
    navigationOptions: {
      header: null
    }
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      header: null
    }
  },
  Support: {
    screen: Support,
    navigationOptions: {
      header: null
    }
  },
  SelectNumber: {
    screen: SelectNumber,
    navigationOptions: {
      header: null
    }
  },
  Confirm: {
    screen: Confirm,
    navigationOptions: {
      header: null
    }
  },
  BankPayment: {
    screen: BankPayment,
    navigationOptions: {
      header: null
    }
  },
  TicketCheck: {
    screen: TicketCheck,
    navigationOptions: {
      header: null
    }
  },
  Result: {
    screen: Result,
    navigationOptions: {
      header: null
    }
  },
  History3: {
    screen: History3,
    navigationOptions: {
      header: null
    }
  },
  ResultDetails: {
    screen: ResultDetails,
    navigationOptions: {
      header: null
    }
  },
  Game: {
    screen: Game,
    navigationOptions: {
      header: null
    }
  },
  Match: {
    screen: Match,
    navigationOptions: {
      header: null
    }
  },
  MatchThree: {
    screen: MatchThree,
    navigationOptions: {
      header: null
    }
  },
  MatchTwo: {
    screen: MatchTwo,
    navigationOptions: {
      header: null
    }
  },
  SelectFiveNumber: {
    screen: SelectFiveNumber,
    navigationOptions: {
      header: null
    }
  },
  SelectFourNumber: {
    screen: SelectFourNumber,
    navigationOptions: {
      header: null
    }
  },
  ConfirmTwo: {
    screen: ConfirmTwo,
    navigationOptions: {
      header: null
    }
  },
  ConfirmThree: {
    screen: ConfirmThree,
    navigationOptions: {
      header: null
    }
  },
  ConfirmFour: {
    screen: ConfirmFour,
    navigationOptions: {
      header: null
    }
  },
  ConfirmBFour: {
    screen: ConfirmBFour,
    navigationOptions: {
      header: null
    }
  },
  ConfirmFive: {
    screen: ConfirmFive,
    navigationOptions: {
      header: null
    }
  },

}
);

const App = createAppContainer(AppNavigator);

export default App;

const prevGetStateForActionHomeStack = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
  if (state && action.type === 'ReplaceCurrentScreen') {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return prevGetStateForActionHomeStack(action, state);
}


