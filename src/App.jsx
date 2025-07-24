import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/AuthPage";
import AuthPage from "./pages/AuthPage";
import Feed from "./pages/Feed";
import AppWrapper from "./pages/AppWrapper";
import { Context } from "./Context";
import { supabase } from "../supa_auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [session, setSession] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [post, updatePost] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  let updateSession;
  useEffect(() => {
    function getSession() {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_OUT") {
          setSession(null);
        } else if (session) {
          setSession(session);
          setUser(session.user);
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //setUser(user)
    }
    updateSession = getSession;
    getUser();
    getSession();
  }, [refresh]);

  return (
    <Context.Provider
      value={{ session, user, post, updatePost, refresh, setRefresh }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppWrapper />} />
          <Route index path="/Login" element={<AuthPage />} />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/Home" element={<Feed />} />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
