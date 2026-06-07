
import { useState ,useEffect } from 'react';
import '../components/app.css'
import { useNavigate } from 'react-router-dom'

import App from "../App.jsx"
import Header from '../components/Header';

function Sign(){

    
const navigate = useNavigate();
const [Form , setForm]= useState({
    email:"",
    password:""
})
const [error, setError] = useState('');

const token = localStorage.getItem("token");
const role = localStorage.getItem("role"); 
const email = localStorage.getItem("email"); 


useEffect(() => {

if(token){
if(role =="admin"){
navigate(`/admindashboard/${email}`);
}
if(role =="user"){
  navigate(`/UserDashboardPro/${email}`);
}
}

}, [token, role, email, navigate]);

  // Update state when user types
  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };



async function handleSignin(e){
e.preventDefault();
    setError('');

       const graphqlQuery = {
      query: `
        mutation {
          signin(email: "${Form.email}", password: "${Form.password}") {
            role
            message
            token
          }
        }
      `,
    };

//     const graphqlQuery = {
//   query: `
//     mutation {Signin($email: String!, $password: String!) {
//       signin(email: $email, password: $password) {
//         role
//         message
//       }
//     }
//   `,
//   variables: {
//     email: Form.email,
//     password: Form.password
//   }
// };


    try {
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery),
      });

      const data = await res.json();

      // Check role and navigate
      
    if (data.data && data.data.signin) {
      const { role, message ,token} = data.data.signin;
      localStorage.setItem("token", token);
      localStorage.setItem("email", Form.email); // optional
       localStorage.setItem("role", role);
      if (role === 'admin'){
    //we can pass parameter or state object
        navigate(`/admindashboard/${Form.email}`)} 
      else if (role === 'user'){
  //  localStorage.setItem("role", "user");
  //   localStorage.setItem("email", Form.email); // optional
navigate(`/UserDashboardPro/${Form.email}`);

      } 
      else setError(message || 'Invalid credentials');
    } else if (data.errors && data.errors.length > 0) {
      setError(data.errors[0].message);
    } else {
      setError('Unexpected server response');
    }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
};


//you cannot re -render from inside function (handlesignin) only from the main function itself which is Sign

     // Conditional rendering
  // Navigate after role is set
  // useEffect(() => {
  //   if (role === 'admin') navigate("/Add");
  //   if (role === 'user') navigate("/Urgent");
  // }, [role, navigate]);
    

    // try {
    //   // Example: Using REST
    //   const res = await fetch('http://localhost:4000/signin', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(Form),
    //   });

    //   const data = await res.json();

    //   if (res.ok) {
    //     if (data.role === 'admin') {
    //       navigate('/admin-dashboard');
    //     } else {
    //       navigate('/user-dashboard');
    //     }
    //   } else {
    //     setError(data.message || 'Invalid email or password');
    //   }
    // } catch (err) {
    //   setError('Server error. Try again later.');
    //   console.error(err);
    // }


return(

  <div className="login-container">
    <div className="login-card">
      <h2>Welcome Back</h2>
      <p>Please sign in to your dashboard</p>

      <form onSubmit={handleSignin}>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name='email' value={Form.email} onChange={handleChange} placeholder="Enter your email" required />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" name='password' value={Form.password} onChange={handleChange} placeholder="Enter your password" required />
        </div>

        {error && <p className="error">{error}</p>}
        
        <button type="submit">Login</button>

        <div className="extra-links">
          {/* <a href="#">Forgot password?</a>
          <span>•</span> */}
          <a href="/SignUp">Create account</a>
        </div>
      </form>
    </div>
  </div>



);
}

export default Sign;