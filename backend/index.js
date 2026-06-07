const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { Pool } = require("pg");


const cors = require("cors");






//formatting created_at time: 
const { GraphQLScalarType, Kind } = require("graphql");

const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "Formatted date-time scalar",

  serialize(value) {
    // value coming from DB → Date object
    return new Date(value).toISOString(); // or any format you want
  },

  parseValue(value) {
    // value from client → server
    return new Date(value);
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});


// PostgreSQL connection works only on local host not deployment
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "DB2026",
//   password: "password",
//   port: 5432,
// });

//connection string from neon 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// GraphQL schema
/*
type Mutation
In GraphQL, there are two main types of operations:
Query → used to read/fetch data (like getting users, chats, requests)
Mutation → used to change/write data (like creating a chat, updating a request, or signing in)
*/



  //   type Query {
  //   hello: String
  //   users: [User]
  //   chat:[Chat]
  //   admins: [Admin]
  //   userrequests(username: String!): [Request]
  //   allrequests:[Request]
  //   requestbyid(id:ID!):Request
  //   sentmessages(user1:String!,user2:String!):[Chat]
  //   receivedmessages(user1:String!,user2:String!):[Chat]
  //   allcontacts(user:String!):[Contact]
  //   allmessages(user1:String! , user2:String!):[Chat]
  //   allreceivedmessages(user:String!):[Chat]
  //   allinboxmessages(user:String!):[Chat]
  //   requestsbycategory(category:String!):[Request]
  //   getallevents:[Event]
  //   geteventbyid(id:ID!):Event
  // }

  // type Mutation {
//   signin(email: String!, password: String!): SignInResponse
//   createRequest(title: String!, description: String!, bonus:String!, reqby:String!,location:String!, jobtype: String! ,worklocation: String! ,experience: String!, category: String! , isurgent:Boolean!): Request
//   sendMessage(user1: String!, user2 : String!, content: String!):Chat
//   createContact(user1:String! , firstname:String! ,lastname:String!, gmail:String! ): Contact
//   setrequesturgent(id:ID!): Request
//   changestatus(id:ID! , newstatus: String!):Request
//   createevent(title:String! , description:String! ,location:String!, date:DateTime, start_time:Time , end_time:Time , organizer:String!):Event
//   deletereqbyid(id:ID!):DeleteResponse
//   deleteeventbyid(id:ID!):DeleteResponse
//   signup(name: String!, email: String!, password: String!): SignInResponse
//   }

const schema = buildSchema(`
    scalar DateTime
    scalar Time
  type Query {
    hello: String
    users: [User]
    chat:[Chat]
    admins: [Admin]
    userrequests: [Request]
    allrequests:[Request]
    requestbyid(id:ID!):Request
    sentmessages(user2:String!):[Chat]
    receivedmessages(user2:String!):[Chat]
    allcontacts:[Contact]
    allmessages(user2:String!):[Chat]
    allreceivedmessages:[Chat]
    allinboxmessages:[Chat]
    requestsbycategory(category:String!):[Request]
    getallevents:[Event]
    geteventbyid(id:ID!):Event
  }



  type Request {
  id: ID
  description: String
  reqby: String
  title: String 
  bonus: String
  location: String
  jobtype: String 
  worklocation: String 
  experience: String 
  created_at: DateTime
  category: String
  isurgent: Boolean
  status: String
  }

  type Event{
  id: ID
title:String
description:String
location:String
date:DateTime
organizer:String
start_time:Time
end_time:Time
created_at:DateTime
  }

  type User {
    
    name: String
    email: String
    password:String
    created_at: DateTime
  }

    type Admin {
  
    name: String
    email: String
    password:String
    created_at: DateTime
  }

  type Chat {
  id:ID
  user1 : String
  user2 : String
  content: String
  created_at:DateTime
  }


  type Contact{
  firstname :String
  lastname :String 
  gmail :String
  }

  
type Mutation {
  signin(email: String!, password: String!): SignInResponse
  createRequest(title: String!, description: String!, bonus:String!,location:String!, jobtype: String! ,worklocation: String! ,experience: String!, category: String! , isurgent:Boolean!): Request
  sendMessage( user2 : String!, content: String!):Chat
  createContact(firstname:String! ,lastname:String!, gmail:String! ): Contact
  setrequesturgent(id:ID!): Request
  changestatus(id:ID! , newstatus: String!):Request
  createevent(title:String! , description:String! ,location:String!, date:DateTime, start_time:Time , end_time:Time , organizer:String!):Event
  deletereqbyid(id:ID!):DeleteResponse
  deleteeventbyid(id:ID!):DeleteResponse
  deletecontact(gmail:String!):DeleteResponse
  signup(email: String!, password: String!): SignInResponse
  }

    


type SignInResponse {
  role: String   # "admin" or "user"
  message: String
  token: String
}

type DeleteResponse {
  message: String
}
  

`);

// import cors from "cors";

// app.use(
//   cors({
//     origin: "https://your-project.vercel.app",
//     credentials: true,
//   })
// );
const app = express();
  // const allowedorigin=["http://localhost:5173", // React app for local host 
  //   "http://localhost:3000"];
  const allowedorigin=["https://local-community-dashboard.vercel.app"];
// app.use(cors({
// origin :allowedorigin,
//   credentials: true
// }));

// const corsOptions = {
//   origin: "https://local-community-dashboard.vercel.app",
//   credentials: true,
// };

// const allowedOrigins = [
//   "https://local-community-dashboard.vercel.app"
// ];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// const corsOptions = {
//   origin: allowedOrigin,
//   credentials: true,
//   methods: ["GET", "POST", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));






const http = require("http");
const { Server } = require("socket.io");
const { error } = require("console");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedorigin,
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

});


const jwt = require("jsonwebtoken");

function auth(context) {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    throw new Error("Not authenticated");
  }

  const token = authHeader.split(" ")[1];

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}


const bcrypt = require("bcrypt");


require("dotenv").config();

console.log(process.env.JWT_SECRET);
// Resolvers
const root = (io)=>({
    DateTime:DateTime,
  hello: () => "Hello from Express + GraphQL 👋",
  users: async () => {
    const res = await pool.query("SELECT * FROM users");
    return res.rows;
  },
    admins: async (args , context ) => {

let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);

if (decoded.role !== "admin") {
   throw new Error("Forbidden");
}
    const res = await pool.query("SELECT * FROM users where role = 'admin' ");
    return res.rows;
  },
    chat: async () => {
    const res = await pool.query("SELECT user1,user2 FROM chat");
    return res.rows;
  },
      userrequests: async (args,context) => {

let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);

if (decoded.role !== "user") {
   throw new Error("Forbidden");
}
    const res = await pool.query("SELECT * FROM requests where reqby = $1",[decoded.email]);
    return res.rows;
  },
        allrequests: async (args,context) => {
let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}


    const res = await pool.query("SELECT * FROM requests ");
    return res.rows;
  },

        createRequest: async ({title, description, bonus,location, jobtype ,worklocation ,experience , category,isurgent},context) => {
let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded); 
if(decoded.role !=="user"){
  throw new Error("Forbidden");
}
    const res = await pool.query(  `INSERT INTO requests (title, description, bonus, reqby,location, jobtype ,worklocation ,experience, category,isurgent)
     VALUES ($1, $2, $3, $4,$5,$6,$7,$8 ,$9,$10)
     RETURNING *`,
    [title, description, bonus, decoded.email,location,jobtype,worklocation,experience, category,isurgent]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
   
   
    //return res.rows;
      return res.rows[0];  // IMPORTANT
  },

 requestsbycategory: async ({category})=>{
  const res = await pool.query(`Select * From requests where category = $1`,[category]);
  return res.rows;
 }
  ,

  sendMessage:async ({ user2,content },context) =>{
let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);

        const res = await pool.query(  `INSERT INTO chat (user1 , user2 , content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [decoded.email ,user2 ,content]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
   
   const message = res.rows[0];
      // 🔥 Emit real-time event
  io.emit("receiveMessage", message);

    //return res.rows;
      return message;  // IMPORTANT
  }
  ,
sentmessages:async ({user2 },context)=>{
let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
    const res = await pool.query(  `Select * from chat where user1 = $1 and user2 = $2`,
    [decoded.email, user2]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection

    //return res.rows;
      return res.rows;  // IMPORTANT
}
,
receivedmessages:async ({user2 }, context)=>{
let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
    const res = await pool.query(  `Select * from chat where user1 = $1 and user2 = $2`,
    [user2, decoded.email]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection

    //return res.rows;
      return res.rows;  // IMPORTANT
}
  ,

  allmessages:async ({user2},context)=>{
//                     const authHeader =
//    context.req.headers.authorization;

//      if (!authHeader) {
//     throw new Error("Not authenticated");
//   }
  
// const token =
//    authHeader.split(" ")[1];

// // const decoded = jwt.verify(
// //    token,
// //    process.env.JWT_SECRET
// // );

// try {
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
// } catch (err) {
//   throw new Error("Invalid or expired token");
// }
let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
    const res = await pool.query(  `Select * from chat where user1 = $1 and user2 = $2 OR user1 = $2 and user2 =$1 order by created_at asc`
      ,[decoded.email, user2]
    );//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection

    //return res.rows;
      return res.rows;  // IMPORTANT
}

,

  getallevents:async (args , context)=>{
                   let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
    const res = await pool.query(  `Select * from events order by created_at asc`);
    //using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
    //return res.rows;
      return res.rows;  // IMPORTANT
}
,
geteventbyid:async ({id}, context )=>{
        let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
    const res = await pool.query(  `Select * from events where id = $1`,[id]);
    //using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
    //return res.rows;
      return res.rows[0];  // IMPORTANT
}
,
  allreceivedmessages:async (args,context)=>{
                let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
    const res = await pool.query(  `Select * from chat where user2 = $1 `
      ,[decoded.email]
    );//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection

    //return res.rows;
      return res.rows;  // IMPORTANT
}
,

  allinboxmessages:async (args,context)=>{
      let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
    const res = await pool.query(  `Select * from chat where user1 = $1 OR user2 = $1 `
      ,[decoded.email]
    );//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection

    //return res.rows;
      return res.rows;  // IMPORTANT
}
,
  createContact:async ({ firstname ,lastname, gmail},context)=>{
                  let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
     const res = await pool.query(  `INSERT INTO contacts (user1 , firstname , lastname , gmail)
     VALUES ($1, $2, $3,$4)
     RETURNING *`,
    [decoded.email ,firstname,lastname,gmail]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
   
   
    //return res.rows;
      return res.rows[0];  // IMPORTANT
 
  }
 

  ,

createevent: async ({title , description ,location, date, start_time, end_time, organizer},context)=>{
                  let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
if(decoded.role !="admin"){
  throw new Error ("Forbidden");
}

     const res = await pool.query(  `INSERT INTO events (title ,description,location , date,start_time ,end_time ,organizer)
     VALUES ($1, $2, $3,$4,$5,$6,$7)
     RETURNING *`,
    [title ,description,location,date,start_time,end_time,organizer]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
   
   
    //return res.rows;
      return res.rows[0];  // IMPORTANT
 
  }
 

  ,
deletereqbyid:async({id}, context)=>{
let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
if(decoded.role !="admin"){
  throw new Error("Forbidden");
}
      const res = await pool.query(
      "Delete FROM requests WHERE id=$1",
      [id]
    );
    if(res){
      return {message:"succeed"}
    }
    else{
      return {message:"failed"}
    }
},

deleteeventbyid: async ({id} , context )=>{
                 let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
if(decoded.role !="admin"){
  throw new Error ("Forbidden");
}
        const res = await pool.query(
      "Delete FROM events WHERE id=$1",
      [id]
    );
        if(res){
      return {message:"succeed"}
    }
    else{
      return {message:"failed"}
    }
}
,

deletecontact: async ({gmail} , context )=>{
        let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);

        const res = await pool.query(
      "Delete FROM contacts WHERE user1 = $1 and gmail = $2",
      [decoded.email, gmail]
    );
  try {
    const res = await pool.query(
      "DELETE FROM contacts WHERE user1 = $1 AND gmail = $2",
      [decoded.email, gmail]
    );

    if (res.rowCount > 0) {
      return { message: "succeed" };
    } else {
      return { message: "failed (no matching contact)" };
    }
  } catch (err) {
    console.error(err);
    throw new Error("Database error");
  }
}
,

   // allcontacts:async ({user},context)=>{
       allcontacts:async ( args,context)=>{
                     let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
     const res = await pool.query(  `Select * from contacts where user1 = $1`,
    [decoded.email]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
   
   
    //return res.rows;
      return res.rows;  // IMPORTANT
 
  }
  ,


          requestbyid: async ({id},context) => {
           let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
    const res = await pool.query(  `Select * From Requests where id = $1`,[id]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
    //return res.rows;
      return res.rows[0];  // IMPORTANT
  },

          setrequesturgent: async ({id}) => {
    const res = await pool.query(  `UPDATE requests
SET isurgent = true
WHERE id = $1
     RETURNING *`,
    [id]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
   
   
    //return res.rows;
      return res.rows[0];  // IMPORTANT
  },

           changestatus: async ({id, newstatus},context) => {
                           let decoded;
try {
  decoded = auth(context);
} catch (err) {
  throw new Error("Unauthorized");
}
console.log(decoded);
if(decoded.role !="user"){
  throw new Error("Forbidden");
}
    const res = await pool.query(  `UPDATE requests
SET status = $1
WHERE id = $2
     RETURNING *`,
    [newstatus, id]);//using $1 , $2 ,$3 ,$4 you are treating the parameters as values this prevents sql injection
   
   
    //return res.rows;
      return res.rows[0];  // IMPORTANT
  },
  

signup: async ({ email, password }) => {
  // 1. Check if user already exists
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    return {
      role: null,
      message: "User already exists",
      token: null
    };
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
const name = email.split("@")[0];
  // 3. Insert user into DB
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, hashedPassword, "user"]
  );

  const user = result.rows[0];

  // 4. Create JWT
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email:user.email
      
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  // 5. Return response
  return {
    role: user.role,
    message: "User created successfully",
    token
  };
},

  signin: async ({ email, password }) => {
    
    // First, check admin table
    // const adminRes = await pool.query(
    //   "SELECT * FROM admins WHERE email=$1",
    //   [email]
    // );
    // if (adminRes.rows.length > 0) {
    //   const admin = adminRes.rows[0];
    //   if (admin.password !== password) {
    //     return { role: null, message: "Incorrect password" };
    //   }
    //   return { role: "admin", message: "Success" };
    // }
    

    // Then, check users table

    try{
    const userRes = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    
    if (userRes.rows.length > 0) {
      const user = userRes.rows[0];
      const valid = await bcrypt.compare(
   password,
   user.password
);
      // if (user.password !== password) {
      //   return { role: null, message: "Incorrect password" };
      // }
      //}
      if(!valid){
       // return { role: null, message: "Incorrect password" };
         return { role: null, message: "Incorrect password", token: null };
       }
      
      // const jwt = require("jsonwebtoken");
const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
    email:user.email
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "15m"
  }
);
   // localStorage.setItem("token",token); there is no localstorage in backend 
     // return { role: "user", message: "Success" };
      return { role:  user.role, message: "Success" ,token};
      
    }

    // If email not found in either table
    return { role: null, message: "User not found",token:null };
  }catch(err){
      console.log(err);
    throw new Error("something is wrong!"+err.message);
    // console.log(err);
  }
  },


});




//new updates  19/2/2026

// app.listen(4000, () => {
//   console.log("🚀 Server running at http://localhost:4000/graphql");
// });

// GraphQL endpoint
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     rootValue: root,
//     graphiql: true, // browser UI
//   })
// );


// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     rootValue: root(io),
//     graphiql: true, // browser UI
//   })
// );


app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    rootValue: root(io),
    graphiql: true,
    context: { req }   // 🔥 THIS IS THE KEY FIX since without this the context will not read the header of authentication (token) it will not access the request
  }))
);



// server.listen(4000, () => {
//    console.log("🚀 Server running at http://localhost:4000/graphql");
// });
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
