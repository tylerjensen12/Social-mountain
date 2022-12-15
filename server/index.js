require('dotenv').config()
const  express = require('express')
const cors = require('cors')

const {PORT} = process.env
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/post')
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')
const {db} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/post')

const server = express()

User.hasMany(Post)
Post.belongsTo(User)

server.use(express.json())
server.use(cors())

//Auth
server.post('/register', register)
server.post('/login', login)

//Get Posts
server.get('/posts', getAllPosts)

//Crud Posts
server.get('/userposts/:userId', getCurrentUserPosts)
server.post('/posts', isAuthenticated, addPost)
server.put('/posts/:id', isAuthenticated, editPost)
server.delete('/posts/:id', isAuthenticated, deletePost)


db.sync().then(() => server.listen(PORT, () => console.log(`Server is up on ${PORT}`)))
