import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Feed from "./Feed";
import { Analytics } from "@vercel/analytics/react";
import { supabase } from "../../supa_auth.js";
import { Context } from "../Context.jsx";

function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (data && !error) {
      return navigate("/Home");
    }
    if (error) {
      setMessage("");
      setMessage(error.message);
    }
  };
  
      const session = useContext(Context)
      //console.log('session', session);
      
      useEffect(()=>{
        if(session.session != null){
          navigate('/Home')
        } 
      },[session, navigate])

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-xl  w-full max-w-sm border-dotted border-2 border-gray-300"
    >
      <Analytics />
      <h2 className="text-4xl font-extrabold mb-5 text-gray-500 text-center">
        Login
      </h2>
      <div className="mb-4">
        <label className="text-xl mb-1 text-black">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border-2 border-gray-300 border-dotted rounded focus:outline-none focus:ring focus:border-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="text-xl mb-1 text-black">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded border-dotted focus:outline-none focus:ring focus:border-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {message && (
        <p className="flex w-full justify-center items-center text-red-500 p-2 font-semibold">
          {message}
        </p>
      )}
      <button
        type="submit"
        className="w-full border-2 border-dotted border-purple-700 text-gray-500 py-2 rounded hover:border-purple-900 hover:bg-purple-400 hover:text-amber-50 transition"
      >
        Login
      </button>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={onSwitch}
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}

function Signup({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          group: null,
        },
      },
    });
    if (error) return setMessage(error.message);
    else setMessage("Account created successfully");

    const { data: currentGroupData, error: currentGroupError } = await supabase
      .from("group_pointer")
      .select("")
      .eq("id", 1);
    const current_group = currentGroupData[0].current_group;

    const { data: groupdata, error: grouperror } = await supabase
      .from("groups")
      .select("")
      .eq("group_ID", current_group);
    let group_members = groupdata[0].members;
    let usergroup;
    if (group_members < 100) {
      const { data, error } = await supabase
        .from("groups")
        .update({ members: group_members + 1 })
        .eq("group_ID", current_group);
      usergroup = current_group;
      const { data: userData, error: userError } =
        await supabase.auth.updateUser({
          data: {
            group: usergroup,
          },
        });
    } else {
      const { error } = await supabase
        .from("groups")
        .insert({ group_ID: current_group + 1, members: 0 })
        .select();
      const { data, error: creategrouperror } = await supabase
        .from("group_pointer")
        .update({ current_group: current_group + 1 })
        .eq("id", 1)
        .select();
      usergroup = current_group + 1;
      const { data: userData, error: userError } =
        await supabase.auth.updateUser({
          data: {
            group: usergroup,
          },
        });
    }

    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    navigate("/Home");
  };

  useEffect(()=> {

  },[])

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm border-dotted border-2 border-gray-300"
    >
      <h2 className="text-4xl font-extrabold mb-5 text-gray-500 text-center">
        Sign Up
      </h2>
      <div className="mb-4">
        <label className="text-xl mb-1 text-black">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border-2 border-gray-300 border-dotted rounded focus:outline-none focus:ring focus:border-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-xl mb-1 text-black">Username</label>
        <input
          type="text"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded border-dotted focus:outline-none focus:ring focus:border-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-xl mb-1 text-black">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded border-dotted focus:outline-none focus:ring focus:border-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="text-xl mb-1 text-black">Confirm Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded border-dotted focus:outline-none focus:ring focus:border-blue-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {message && (
        <p className="flex w-full justify-center items-center text-red-500 p-2 font-semibold">
          {message}
        </p>
      )}
      <button
        type="submit"
        className="w-full border-2 border-dotted border-purple-700 text-gray-500 py-2 rounded hover:border-purple-900 hover:bg-purple-400 hover:text-amber-50 transition"
      >
        Sign Up
      </button>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={onSwitch}
        >
          Login
        </button>
      </p>
    </form>
  );
}

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {showLogin ? (
        <Login onSwitch={() => setShowLogin(false)} />
      ) : (
        <Signup onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  );
}
