import React, { useContext, useState, useEffect } from "react";
import { Context } from "./Context";
import { supabase } from "../supa_auth";
import { Outlet, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function ProtectedRoute() {
  const session = useContext(Context);
  return session.session !== null ? <Outlet /> : <AuthPage />
}
export default ProtectedRoute;
