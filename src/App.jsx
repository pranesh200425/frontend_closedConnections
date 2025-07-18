import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/AuthPage";
import AuthPage from "./pages/AuthPage";
import Feed from "./pages/Feed";
import AppWrapper from "./pages/AppWrapper";
import { Context } from "./Context";

function App() {
  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userInfo = user
  }

  return (
    <Context.Provider value={{ getUser }}>
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
