import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/AuthPage";
import AuthPage from "./pages/AuthPage";
import Feed from "./pages/Feed";
import AppWrapper from "./pages/AppWrapper";
import { Context } from "./Context";
import { supabase } from "../supa_auth";

function App() {
  const [session, setSession] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [post, updatePost] = React.useState(null);
  useEffect(() => {
    function getSession() {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_OUT") {
          setSession(null);
        } else if (session) {
          setSession(session);
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
      setUser(user)
    }
    getUser()
    getSession()
  }, []);


  return (
    <Context.Provider value={ {session, user, post, updatePost }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppWrapper />} />
          <Route index path="/Login" element={<AuthPage />} />
          <Route path="/Home" element={<Feed />} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
