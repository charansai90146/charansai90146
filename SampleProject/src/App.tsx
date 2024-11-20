import LoginPage from './Loginpage';
import MainComponent from './MainComponent';
import { useUser } from './UserContext';

const App = () => {
  const { user } = useUser();
  return (
    <div>
      {user?<MainComponent />:<LoginPage/>}
    </div>
  );
};

export default App;