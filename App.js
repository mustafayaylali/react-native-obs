import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginComponent from './src/components/LoginComponent';
import ProfileComponent from './src/components/ProfileComponent';
import LessonsComponent from './src/components/LessonsComponent';

const MainNavigator = createStackNavigator({
  Home: {screen: LoginComponent},
  Profile: {screen: ProfileComponent},
  Lessons:{screen:LessonsComponent},
});
//navigation
const App = createAppContainer(MainNavigator);

export default App;