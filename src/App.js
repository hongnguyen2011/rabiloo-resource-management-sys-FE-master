import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { AppHeader, AppModal, AppNotFound } from "./components";
import { useAppAccount } from "./hooks";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import UsersDetail from "./pages/users-detail/UsersDetail";
import Users from "./pages/users/Users";
import { THEME } from "./utils";
import { SnackbarProvider } from "notistack";
import SubmissionHistory from "./pages/submission-history/SubmissionHistory";
import Question from "./pages/question-list/Question";
import UserInfo from "./pages/user-info/UserInfo";

const theme = createTheme(THEME);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { account } = useAppAccount();

  const renderRoutes = () => {
    if (account.access_token) {
      return (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AppHeader />
                <Outlet />
              </>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UsersDetail />} />
            <Route path="users/:id/friend-list*" element={<UsersDetail />} />
            <Route path="submission-history" element={<SubmissionHistory />} />
            <Route path="question" element={<Question />} />
            <Route path="user-info" element={<UserInfo />} />
            {/* <Route path="show-answer" element={<ShowAnswer />} /> */}
            <Route path="*" element={<AppNotFound />} />
          </Route>
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Login />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <SnackbarProvider
            maxSnack={10}
            autoHideDuration={1500}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Grid>
              <Router>{renderRoutes()}</Router>
              <AppModal />
            </Grid>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
