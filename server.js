const express= require("express");
const { ApolloServer, gql } = require('apollo-server');


const cors= require('cors');


const app=express();
app.use(cors());
app.use(express.json());

const PORT = 8081;

const { Pool }=require('pg');

const pool= new Pool({
   
    host : 'localhost',
    user : 'postgres',
    password:'pink@2000',
    database: 'signup',
    port:5432
    
});

const typeDefs = gql`
 type Query{
  name:String!
  email:String!
  password:String!
 }

type Mutation {
    signup(name: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
  schema{
    query:Query
    mutation: Mutation
 }

`;


 /*app.post('/signup',async(req,res)=>{
   
    const sql= 'INSERT INTO login (name,email,password) VALUES($1, $2 , $3)';
    const name=req.body.name;
    const email=req.body.email;
    const password= req.body.password;
    
  await pool.query(sql,[name,email,password],(err,data)=>{
        if(err){
            
            return res.json("Error");
            
        }
        
        return res.json(data);
       
        
    })*/
   
  
   // Use the pool to perform an INSERT operation
  /*pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
  */
   // Define the values you want to insert
   /* const insertValues = {
      id: 1,
      name: 'priyanka',
      email: 'priyanka@gmail.com',
      password:'Priyanka200'
      // Add more columns and values as needed
    };*/  
   
  
    // Perform the INSERT operation
  /*  connection.query(sql,[values], (error, results) => {
      connection.release();
  

  
      if (error) {
        console.error('Error executing INSERT query:', error);
        return;
      }
  
console.log('Insert successful. Affected rows:', results.affectedRows);
    });
  });*/
 /* res.end()
});*/


//graphql
const resolvers = {
  Mutation: {
    signup: async (_, { name, email, password }) => {
      const sql = 'INSERT INTO login (name, email, password) VALUES($1, $2, $3)';
      try {
        const result = await pool.query(sql, [name, email, password]);
        return "Signup successful";
      } catch (error) {
        console.error(error);
        return "Error";
      }
    },
      login: async (_, { email, password }) => {
      const query = 'SELECT * FROM login WHERE email = $1 AND password = $2';
      try {
        const result = await pool.query(query, [email, password]);
        if (result.rows.length > 0) {
          return "Success";
        } else {
          return "Failed";
        }
      } catch (error) {
        console.error(error);
        return "Error";
      }
    },
  },
  
};








 /*app.post('/login',async(req,res)=>{
   
    const query='SELECT * FROM LOGIN WHERE email=$1 AND password=$2';


    await pool.query(query,[req.body.email,req.body.password], (err,data)=>{
        if(err){
            
            return res.json("Error");
        }

        if(data.rows.length>0){
            return res.json("Success");

        }
        else{
           
            return res.json("Failed");
        }
      
    })
  
 
   
 });


app.listen(8081,()=>{
    console.log("listening");
})*/
graphiql:true
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ PORT }) => {
  console.log(`Server is running at ${PORT}`);
});

