import './App.css';
import InputField from './components/InputField';
import NotesBody from './components/NotesBody';
import Favourites from './components/pages/Favourites';
import BasicPopover from './components/PopOver';
import ResponsiveAppBar from './components/ResponsiveAppBar'
import NoteState from './context/NoteState';
import DesignState from './context/DesignState';
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom'
import Profile from './components/pages/Profile';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import UserState from './context/UserState';
import Account from './components/pages/Account';
import MyAlert from './components/MyAlert';

function App() {
  return (
    <BrowserRouter basename='/'>
      <DesignState>
        <NoteState>
          <UserState>
                <MyAlert/>
                
                <ResponsiveAppBar/>
              <Routes>
                <Route path="/" element={
                  <div className='app'>
                      <InputField/>
                      <NotesBody/>
                      <BasicPopover/>
                  </div>
                }/>
                <Route path="/favourites" element={
                  <div className='app'>
                    <Favourites/>
                    <BasicPopover/>
                  </div>
                }/>
                <Route path="/profile" element={
                  <div className='app' style={{display:"flex", justifyContent:"center"}}>
                    <Profile />
                  </div>
                } />
                <Route path="/register" element={
                <div className='reg'>
                  <Register/>
                </div>
                }/>
                <Route path="/login" element={
                  <div className='reg'>
                    <Login />
                  </div>
                } />
                <Route path="/Account" element={
                  <div className='reg'>
                    <Account />
                  </div>
                } />
              </Routes>
          </UserState>
        </NoteState>
      </DesignState>
    </BrowserRouter>
  );
}

export default App;
