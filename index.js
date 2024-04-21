 const express = require("express");
 const app = express();
 const port = 7070;
 const path = require("path");
 const { v4: uuidv4 } = require('uuid');
 const methodOverride = require('method-override')

 app.set("view engine", "ejs");
//  app,set("views", path.join(__dirname,"views"));

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

 app.listen(port,() =>{
   console.log(`the app is listening port ${port}`);
 });

 let posts = [
   {
      id : uuidv4(),
      username : "sai sirimarthi",
      content : "i have intrest to do MERN Stack Web Dev"
   },
   {
      id : uuidv4(),
      username : "sumanth",
      content : "ipl bettings his intrest"
   },
   {
      id : uuidv4(),
      username : "rajesh",
      content : "his intrest on python"
   }
 ]

 app.get("/posts", (req,res) =>{
   res.render("view.ejs", {posts});
 });

 app.get("/posts/new",(req,res) =>{
   res.render("new.ejs");
 });

 app.post("/posts", (req,res) =>{
   const {username , content} = req.body;
   let id = uuidv4();
   posts.push({username , content , id});
   res.redirect("/posts");
   
 });

 app.get("/post/:id",(req,res) =>{
   let {id} = req.params;
   let post = posts.find( (p)=> id===p.id );
   res.render("see.ejs", {post});
 });

 app.get("/post/:id/edit", (req,res) =>{
   let {id} = req.params;
   let post = posts.find( (p)=> id===p.id );
   res.render("edit.ejs", {post});
 });

 app.patch("/post/:id", (req,res) =>{
   let {id} = req.params;
   let newContent = req.body.content;
   let post = posts.find( (p)=> id===p.id );
   post.content = newContent;
   res.redirect("/posts");

 });

 app.delete("/post/:id", (req,res) =>{
  let {id} = req.params;
    posts = posts.filter( (p) => id !== p.id);
   res.redirect("/posts");
  res.send("deleted");
 })