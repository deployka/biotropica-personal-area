import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,

} from 'react-router-dom';
import { ErrorPage } from './pages/404/containers/404';
import { Goals } from './pages/Goals/containers/Goals';
import { Home } from './pages/Home/containers/Home';
import { Profile } from './pages/Profile/containers/Profile';
import { Questionnaire } from './pages/Questionnaire/containers/Questionnaire';
import { Edit } from './pages/Profile/pages/Edit/container/Edit';
import { Tariffs } from './pages/Tariffs/containers/Tariffs';
import { Services } from './pages/Services/containers/Services';
import {
  RestoreForm,
  Type,
} from './pages/Auth/components/RestoreForm/RestoreForm';
import { ForgotForm } from './pages/Auth/components/ForgotForm/ForgotForm';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectIsAuth,
  selectUserLoadingStatus,
} from "./store/ducks/user/selectors";
import { SigninForm } from "./pages/Auth/components/SigninForm/SigninForm";
import { SignupForm } from "./pages/Auth/components/SignupForm/SignupForm";
import {
  fetchUserData,
  setUserLoadingStatus,
  setUserResponse,
} from "./store/ducks/user/actionCreators";
import { LoadingStatus } from "./store/types";

import { Loader } from "./shared/Global/Loader/Loader";
import { Header } from "./shared/Global/Header/Header";
import { Sidebar } from "./shared/Global/Sidebar/Sidebar";

import "./styles/global.scss";
import { SidebarChat } from "./shared/Global/SidebarChat/SidebarChat";
import { SidebarNotifications } from "./shared/Global/SidebarNotifications/SidebarNotifications";
import { AddGoal } from "./pages/Goals/components/AddGoal/AddGoal";
import { fetchGoalsData } from "./store/ducks/goals/actionCreators";
import { EditGoalForm } from "./pages/Goals/components/EditGoalForm/EditGoalForm";
import { selectGoalsLoadingStatus } from "./store/ducks/goals/selectors";
import { selectGoalLoadingStatus } from "./store/ducks/goal/selectors";

import { store } from 'react-notifications-component';

import { Modals } from './modals/Modals';


function App() {
  const isAuth = useSelector(selectIsAuth);
  const loadingUser = useSelector(selectUserLoadingStatus);
  const loadingGoals = useSelector(selectGoalsLoadingStatus);
  const loadingGoal = useSelector(selectGoalLoadingStatus);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();


  const [page, setPage] = useState<string>('Главная');

  const [sidebarNotificationsOpen, setSidebarNotificationsOpen] =
    useState<boolean>(false);
  const [chatNotificationsOpen, setSidebarChatOpen] = useState<boolean>(false);

  const currentPath = location.pathname;
  const authPaths = ["/signin", "/signup"];

  useEffect(() => {
    dispatch(fetchUserData());
    if (isAuth) {
      dispatch(fetchGoalsData());
    }
  }, [isAuth, dispatch]);

  useEffect(() => {
    dispatch(setUserLoadingStatus(LoadingStatus.LOADED));
    dispatch(setUserResponse(undefined));
    store.removeNotification('delete-notification');
  }, [location.pathname]);

  useEffect(() => {
    if (isAuth && authPaths.includes(currentPath)) {

      history.push('/');
    } else if (loadingUser === LoadingStatus.SUCCESS && isAuth) {

      history.push(currentPath);
    }
  }, [isAuth, loadingUser]);

  function getLoading() {
    return (
      loadingUser === LoadingStatus.LOADING ||
      loadingUser === LoadingStatus.NEVER ||
      loadingGoals === LoadingStatus.LOADING ||
      loadingGoal === LoadingStatus.LOADING
    );
  }

  if (!isAuth) {
    return (
      <>
        {getLoading() && <Loader />}
        <div className="auth__container">
          <Switch>
            <Route exact path="/signin">
              <SigninForm />
            </Route>

            <Route exact path="/signup">
              <SignupForm />
            </Route>

            <Route exact path="/forgot-password">
              <ForgotForm />
            </Route>

            <Route exact path="/restore-password">
              <RestoreForm type={Type.CHANGE} />
            </Route>

            <Route exact path="/create-password">
              <RestoreForm type={Type.CREATE} />
            </Route>

            <Route render={() => <Redirect to="/signin" />} />
          </Switch>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="global__container">
        {getLoading() && <Loader />}
        <Modals />
        <Sidebar
          setSidebarNotificationsOpen={setSidebarNotificationsOpen}
          setSidebarChatOpen={setSidebarChatOpen}
          chatNotificationsOpen={chatNotificationsOpen}
          setPage={setPage}
        />
        <SidebarChat
          open={chatNotificationsOpen}
          setOpen={setSidebarChatOpen}
        />
        <SidebarNotifications
          open={sidebarNotificationsOpen}
          setOpen={setSidebarNotificationsOpen}
        />
        <div className="container">
          <Header
            setSidebarChatOpen={setSidebarChatOpen}
            setSidebarNotificationsOpen={setSidebarNotificationsOpen}
            page={page}
          />
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/questionnaire" component={Questionnaire} />

            <Route exact path="/profile" component={Profile} />

            <Route exact path="/video" component={Consultations} />

            <Route exact path="/profile/edit" component={Edit} />

            <Route exact path="/goals" component={Goals} />
            <Route exact path="/goals/add" component={AddGoal} />
            <Route exact path="/goals/:id" component={Goals} />
            <Route exact path="/goals/edit/:id" component={EditGoalForm} />

            <Route path="/tariffs" component={Tariffs} />

            <Route path="/services" component={Services} />

            <Route component={ErrorPage} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
