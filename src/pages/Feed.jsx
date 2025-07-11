import React, { useState } from "react";
import "../App.css";
import Post from "./Components/Post";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PostModal from "./Components/PostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBackward } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Components/Nav";
import { supabase } from "../../supa_auth.js";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [isPost, setPost] = useState(false);
  const [userdata, setuserdata] = useState({});

  const navigate = useNavigate();

  /* useEffect(() => {
  
  const isLoggedIn = localStorage.getItem('token') !== null
    
    if(!isLoggedIn){
    console.log('Redirecting to login page...'); 
    console.log(isLoggedIn);
    navigate('/Login')
    }
}, [navigate]) */

  let render = 0;

  // Example user info
  /* const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if(!userInfo)
  return null */
  const user = {
    username: "userInfo.email",
    profilePic: "https://ui-avatars.com/api/?name=You&background=random",
    bio: "Just another user.",
    posts: posts.filter((p) => p.user === "You").length,
    joined: "June 2025",
  };

  const localURL = "http://localhost:5000";
  const backendURL = "https://backend-closedconnections-tq1k.onrender.com";
  /*   console.log('logs here',userInfo) */

  const getPosts = () => {
    fetch(`${backendURL}/api/getpost/${userdata.email}`, )
    .then(res => res.json())
    .then(data => {
      
      setPosts(data)
    })
    
    console.log(posts)
  } 

  /*  useEffect(()=>{
    getPosts()
    console.log("post fetched here")
  }, [])  */

   const handlePost =  (e) => {
    e.preventDefault()

     fetch(`${backendURL}/api/post/${userdata.email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: input })
    })
    .then(res => res.json())
    .then(data => {
      //console.log('Post created:', data)
    })
    .catch(err => console.error('Error creating post:', err))

    if (input.trim() === '') return
    
    getPosts()
    setInput('')
  } 
  //console.log('renders')
  //getPosts()
  //console.log(posts)

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user.user_metadata);

      setuserdata(user.user_metadata);
      console.log(userdata);
    }
    getUser();
  }, []);

  useEffect(() => {
    console.log("Updated userdata:", userdata);
  }, [userdata]);


  const singout = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut()
    navigate("/Login");

  }

 /*  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/Login");
    window.location.reload();
  } */
  const style_sm =
    "flex p-2 w-[90%] absolute top-2 bg-white font-semibold rounded-xl z-50 justify-center items-center p-3 border border-dotted";
  const [isside, setSide] = useState(false);

  const style_md =
    "flex w-[95%] text-xl pt-4 pb-4 pr-4 pl-2 font-semibold border-2 border-dotted border-black rounded-3xl mt-2 justify-end";
  return (
    <div
      className="flex  items-center h-screen overflow-none bg-white w-[100%] pt-14 relative"
      id="main-feed"
    >
      <Nav style={style_sm} />
      {!isPost && (
        <div id="hamMenu" className="hidden  absolute z-50  top-3 left-7 ">
          {!isside && (
            <div className="p-3 rounded-2xl " onClick={() => setSide(true)}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          )}
          {isside && (
            <div className="flex flex-col p-4  border border-dotted border-gray-300 rounded bg-gray-50 ease-in-out duration-200 ">
              <div
                className="flex  w-full items-center justify-end text-lg cursor-pointer font-semibold "
                onClick={() => setSide(false)}
              >
                <FontAwesomeIcon icon={faBackward} />
              </div>
              <div className="flex p-2 w-full items-center justify-center text-xl font-semibold ">
                <h1>{userdata.username}</h1>
              </div>
              <div>
                <h1 className="pt-2 pb-2">{user.bio}</h1>
              </div>
              <div>
                <p className="pt-2 pb-2">{user.posts}</p>
              </div>
              <div>
                <p className="pt-2 pb-2">{user.joined}</p>
              </div>
              <div className="flex w-full justify-start">
                <button
                  className=" cursor-pointer mt-16 bg-gray-500 rounded p-3 text-white hover:bg-gray-300 hover:text-gray-700 font-bold duration-150 ease-in-out  pt-2 pb-2"
                  onClick={singout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Sidebar for profile info */}
      <div
        className="md:flex  flex-col items-start h-full md:w-[22%] w-11 bg-white p-6 shadow border-dotted border-r-2 border-gray-300  self-start"
        id="sidebar"
      >
        <Nav style={style_md} />
        <div className="text-2xl font-bold w-full mt-4 mb-4 text-gray-700  ">
          {userdata.username}
        </div>
        <div className="text-gray-500 mb-2 text-center">{user.bio}</div>
        <div className="flex flex-col gap-1 text-sm text-gray-600 w-full">
          <div>
            {/* <span className="font-semibold">Posts:</span> {user.posts} */}
            <h1>{user.posts}</h1>
          </div>
          <div>
            <span className="font-semibold">Joined:</span> {user.joined}
          </div>
        </div>
        <div>
          <button
            className="flex cursor-pointer mt-16 bg-gray-500 rounded p-3 text-white hover:bg-gray-300 hover:text-gray-700 font-bold duration-150 ease-in-out  "
            onClick={singout}
          >
            Log out
          </button>
        </div>
      </div>
      {/* Main feed */}
      <div className="md:w-[50%] flex w-full grow h-3/4 md:h-full border-dotted border-r-2 pr-2 pl-2 border-gray-300 relative">
        {!isPost && (
          <div className="flex w-[98%] absolute bottom-0" /* id='postForm' */>
            <form className="flex pr-6 pl-6 pt-2 pb-2 rounded-lg w-full shadow border-dotted bg-gray-100   border-yellow-300 ">
              <div className="flex w-full gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 outline-none py-2 border-2 bg-white border-gray-300 border-dotted rounded-3xl "
                  placeholder="What's on your mind?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="border-2 border-dotted bg-white border-yellow-500 text-gray-500 px-4 py-2 hover:border-yellow-500 hover:bg-yellow-400 rounded-4xl hover:text-amber-50 font-semibold cursor-pointer transition"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        )}
        {!isPost && (
          <div className=" flex w-full h-[85%]  ">
            <div
              className=" flex flex-col w-full h-full   space-y-4 overflow-y-scroll"
              id="feed"
            >
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={post._id}
                    content={post.content}
                    user={post.user}
                    email={post.email}
                    time={post.createdAt}
                    postid={post._id}
                    setPost={setPost}
                  />
                ))
              ) : (
                <div className="flex w-1/2 rounded-3xl m-auto justify-center items-center p-4 bg-slate-300  ">
                  <h1 className="text-3xl">Oops! No posts available</h1>
                </div>
              )}
            </div>
          </div>
        )}
        {isPost && (
          <div className="flex flex-col w-full h-full">
            <PostModal setPost={setPost} />
          </div>
        )}
      </div>
    </div>
  );
}
