
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './UserContext'; 
import ReactDOM from 'react-dom';


ReactDOM.render(
  <UserProvider>
      <App />
  </UserProvider>,
  document.getElementById('root')
);
