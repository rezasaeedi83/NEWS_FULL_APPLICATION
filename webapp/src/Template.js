import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/userSlice';
import { useEffect } from 'react';


const Template = ({ children }) => {
  const state = useSelector(selectUser);

  useEffect(() => {
    console.log("🚀 ~ file: Template.js:77 ~ Template ~ name:", state.user.name);

  }, []);
  
  return (
    <div className="app-container">
      <div className="app-header">
      <Link to="/login">
        <div
          className={state.user.isLoggedIn ? 'account-box loggedIn' : 'account-box'}
        >
          <span className="defaultText">
            {
              state.user.name || 'Login / Register'
            }
          </span>

          <span className="signOutText">
            {
              'Logout'
            }
          </span>
        </div>
      </Link>

        <Link to="/">
          <h1 className="app-title">
            News
          </h1>
        </Link>


          <Link to="/news">
              <svg
                className="magnifyermagnifyer"
                viewBox="0 0 32 32" width="1em" height="1em" class="ssrcss-xi5oyi-StyledIcon e161cein1" focusable="false" aria-hidden="true"><path d="m30.6 28.1-8.3-8.3c1.5-2 2.4-4.4 2.4-7.2C24.7 6 19.6 1 13 1S1.4 6.1 1.4 12.7 6.5 24.3 13 24.3c2.3 0 4.4-.6 6.2-1.8l8.5 8.5 2.9-2.9zM4 12.6c0-5.2 3.9-9.1 9-9.1s9 3.9 9 9.1c0 5.2-3.9 9.1-9 9.1s-9-3.9-9-9.1z"></path></svg>
          </Link>
      </div>

      <div className="app-content">
        {children}
      </div>
    </div>
  );
}
export default Template;
