import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginComponent from './src/components/LoginComponent';
import HomeComponent from './src/components/HomeComponent';
import LessonsComponent from './src/components/LessonsComponent';
import ProfileComponent from './src/components/ProfileComponent';
import StudentListComponent from './src/components/StudentListComponent.js';

const MainNavigator = createStackNavigator({
  
  Home: {screen: LoginComponent},
  Main: {screen: HomeComponent},
  Lessons:{screen:LessonsComponent},
  Profile:{screen:ProfileComponent},
  StudentList:{screen:StudentListComponent},
});
//navigation
const App = createAppContainer(MainNavigator);

export default App;