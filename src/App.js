import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import { makeStyles } from '@material-ui/core';

function App() {
  // Define Material-UI styles for the App component
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      {/* Use the 'className' attribute instead of 'class' */}
      <div className={classes.App}>
        {/* Include the Header component */}
        <Header />
        {/* Define routes */}
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={Coinpage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
