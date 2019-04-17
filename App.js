import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginComponent from './src/components/LoginComponent';
import HomeComponent from './src/components/HomeComponent';
import LessonsComponent from './src/components/LessonsComponent';
import ProfileComponent from './src/components/ProfileComponent';

const MainNavigator = createStackNavigator({
  
  Home: {screen: LoginComponent},
  Main: {screen: HomeComponent},
  Lessons:{screen:LessonsComponent},
  Profile:{screen:ProfileComponent},
});
//navigation
const App = createAppContainer(MainNavigator);

export default App;