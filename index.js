const express=require("express")
const dotenv=require("dotenv").config()
const cors=require("cors")
const bodyParser=require('body-parser')

const port =process.env.PORT||5000
const connectDB=require("./database/db")
const userRoutes=require("./routes/userRoutes")
const blogRoutes=require("./routes/blogRoutes")

const app=express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
connectDB()

app.get('/', (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Documentation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
            }
            h1 {
                color: #333;
            }
            .endpoint {
                background-color: #fff;
                border: 1px solid #ddd;
                margin-bottom: 10px;
                padding: 15px;
                border-radius: 5px;
            }
            .endpoint h3 {
                margin-top: 0;
            }
            code {
                background-color: #eee;
                padding: 5px 10px;
                border-radius: 3px;
                display: inline-block;
            }
            .description {
                color: #555;
            }
        </style>
    </head>
    <body>
        <h1>API Documentation</h1>
        
        <div class="endpoint">
            <h3>Register a User</h3>
            <p><code>POST /api/users/register</code></p>
            <p class="description">Registers a new user. The password is hashed and a JWT token is generated.</p>
        </div>
        
        <div class="endpoint">
            <h3>Login a User</h3>
            <p><code>POST /api/users/login</code></p>
            <p class="description">Authenticates a user and returns a JWT token upon successful login.</p>
        </div>
        
        <div class="endpoint">
            <h3>Get User by ID</h3>
            <p><code>GET /api/users/:id</code></p>
            <p class="description">Retrieves a specific user's information by their ID.</p>
        </div>
        
        <div class="endpoint">
            <h3>Create a Blog</h3>
            <p><code>POST /api/blog</code></p>
            <p class="description">Creates a new blog post with title, content, category, and user.</p>
        </div>
        
        <div class="endpoint">
            <h3>Get All Blogs</h3>
            <p><code>GET /api/blog?page=1&search=optional_search_term</code></p>
            <p class="description">Retrieves all blogs with pagination and optional search functionality.</p>
        </div>
        
        <div class="endpoint">
            <h3>Get Blogs by a Specific User</h3>
            <p><code>GET /api/blog/user/:userId?page=1&search=optional_search_term</code></p>
            <p class="description">Retrieves blogs by a specific user with pagination and search functionality.</p>
        </div>
        
        <div class="endpoint">
            <h3>Add a Comment to a Blog</h3>
            <p><code>POST /api/blog/:id/comments</code></p>
            <p class="description">Adds a comment to a specific blog post.</p>
        </div>
        
        <div class="endpoint">
            <h3>Like a Blog</h3>
            <p><code>POST /api/blog/:id/like</code></p>
            <p class="description">Likes a blog post. Prevents liking a post multiple times by the same user.</p>
        </div>
        
        <div class="endpoint">
            <h3>Delete Blog</h3>
            <p><code>DELETE /api/blogs/:id</code></p>
            <p class="description">Deletes a specific blog post by its ID.</p>
        </div>
        
        <div class="endpoint">
            <h3>Forget Password</h3>
            <p><code>POST /api/users/forget-password</code></p>
            <p class="description">Sends a password reset email with a reset token.</p>
        </div>

        <div class="endpoint">
            <h3>Reset Password</h3>
            <p><code>POST /api/users/reset-password</code></p>
            <p class="description">Changes password with new one.</p>
        </div>

    </body>
    </html>
    `;

    res.send(htmlResponse);
});

app.use("/api/user",userRoutes)
app.use("/api/blog",blogRoutes)

app.listen(port,()=>{
    console.log(`server is running on at: localhost:${port}`)
})