// backend/server.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()
app.use(cors())
app.use(express.json())
const mangoURI = process.env.MONGO_URI

mongoose.connect(mangoURI, {
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))


let gID = 0;
//let groupID = 0;

const groupschema = new mongoose.Schema({
  group_ID: { type: Number, required: true },
  members: { type: Number , default: 0 },
});

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body
  try {
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const group_ID = gID;
    const group = await Group.findOne({group_ID: gID})
    if(!group){
      const group = await Group.create({ group_ID, members: 0 });
      await User.create({ email, password, groupID : group.group_ID })
      //group.json()
      group.members += 1;
      await group.save();
      return res.json({ message: 'Signup successful' })
    }
    if(group.members > 99){
      
      gID += 1;
      const group = await Group.create({ group_ID, members: 0 });
      await User.create({ email, password,  groupID : group.group_ID })
     
      group.members += 1;
      await group.save();
      return res.json({ message: 'Signup successful' })

    } else {
      group.members += 1;
      await group.save()
      await User.create({ email, password,  groupID : group.group_ID })
      return res.json({ message: 'Signup successful' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    res.json({ message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

app.post('/api/post/:email', async (req, res) => {
  const { content } = req.body
  const P_email = req.params.email
  const { groupID, email} = await User.findOne({ email : P_email })
  const createdAt = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
  try {
    const post = await Post.create({ 
    content : content, 
    groupID : groupID, 
    email: email,
    createdAt: createdAt
   })
    res.json({ message: 'created', post })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/getpost/:email', async (req, res) => {
  const email = req.params.email
  const { groupID } = await User.findOne({ email : email })
  //res.send(group)
  try {
    const posts = await Post.find({ groupID : groupID})
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/postcomment/:postID', async (req, res) => {
  const post_id = req.params.postID
  const { content, email } = req.body
  try {
    const post = await Post.findOne({ _id : post_id })
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    post.comments.push({ content, email })
    await post.save()
    res.json({ message: 'Comment added successfully'})
  } catch (err){
    console.log(err.message)
    res.status(500).json({message : err})
  }
})

app.get('/api/getcomments/:postID', async (req, res) => {
  const post_id = req.params.postID
  try {
    const post = await Post.findOne({ _id : post_id })
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    console.log(post.comments)
    res.json(post.comments)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({message : err.message})
  }
})


app.listen(5000, () => console.log('Backend running on http://localhost:5000'))

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  groupID: { type: Number, required: true },
})

const postSchema = new mongoose.Schema({
  email: String,
  title: String,
  content: String,
  groupID: Number,
  likes : {type: Number, default: 0},
  comments : [
    {
      content: String,
      email: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt : String,
})

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)
const Group = mongoose.model('Group', groupschema);