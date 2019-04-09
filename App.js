import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginComponent from './src/components/LoginComponent';
import ProfileComponent from './src/components/ProfileComponent';

const MainNavigator = createStackNavigator({
  Home: {screen: LoginComponent},
  Profile: {screen: ProfileComponent},
});
//navigation
const App = createAppContainer(MainNavigator);

export default App;