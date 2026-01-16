import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import NotificationPage from "./pages/NotificationPage";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import useApp from "./store/useApp";
import Layout from "./components/Layout";

const App = () => {
  const { authUser: authData, isLoading } = useAuthUser();
  const { theme } = useApp();
  const isAuthenticated = Boolean(authData);
  const isOnboarded = authData?.isOnboarding;
  if (isLoading) {
    return <PageLoader />
  }
  return (
    <div className='h-screen' data-theme={`${theme}`}>
      <Routes>
        <Route path="/auth/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/auth/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route
          path="/"
          element={isAuthenticated && isOnboarded ?
            <Layout showSidebar={true}>
              <HomePage />
            </Layout> :
            <Navigate to={!isAuthenticated ? "/auth/login" : "/onboarding"}
            />}
        />

        <Route path="/chat/:id"
          element={isAuthenticated && isOnboarded ?
            <Layout showSidebar={false}>
              <ChatPage />
            </Layout> :
            <Navigate to={!isAuthenticated ? "/auth/login" : "/onboarding"} />}
        />
        <Route path="/call/:id" element={isAuthenticated && isOnboarded ? <CallPage /> : <Navigate to={!isAuthenticated ? "/auth/login" : "/onboarding"} />} />
        <Route path="/notifications"
          element={isAuthenticated && isOnboarded ?
            <Layout showSidebar>
              <NotificationPage />
            </Layout> : <Navigate to={!isAuthenticated ? "/auth/login" : "/onboarding"} />} />
        <Route
          path="/onboarding"
          element={isAuthenticated ? (
            !isOnboarded ? <OnboardingPage /> : <Navigate to="/" />
          ) : <Navigate to="/auth/login" />}
        />
      </Routes>
      <Toaster toastOptions={{ duration: 2000, position: "top-right" }} />
    </div>
  )
}

export default App