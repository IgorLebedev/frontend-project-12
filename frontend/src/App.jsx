import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import * as leo from 'leo-profanity';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/NotFoundPage.jsx';
import MainPage from './components/MainPage.jsx';
import Login from './components/LoginPage.jsx';
import Navigation from './components/Navbar.jsx';
import SignUp from './components/SignUpPage.jsx';
import initI18n from './i18n';

const MainRoute = ({ children }) => {
  const { user } = localStorage;
  return (
    user ? children : <Navigate to="/login" />
  );
};

const App = () => {
  const i18nInst = initI18n();
  leo.loadDictionary('en');
  leo.add(leo.getDictionary('ru'));
  return (
    <I18nextProvider i18n={i18nInst}>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={(
                <MainRoute>
                  <MainPage />
                </MainRoute>
              )}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </I18nextProvider>
  );
};

export default App;
