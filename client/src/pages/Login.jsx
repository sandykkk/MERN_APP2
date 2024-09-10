import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const Login =()=>{

    const [user,setUser] = useState({
        email:"",
        password:""
    });

    const { storeTokenInLS,API } = useAuth();
    const navigate = useNavigate();
    
 
    const handleInput =(e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value

        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
     try {
        const response = await fetch(`${API}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          const responseData = await response.json();
          console.log("after login: ", responseData);

         if(response.ok){
            
            storeTokenInLS(responseData.token);
            toast.success("login successfully");
            setUser({
                email:"",
                password:""
            })
            navigate("/")
         }
         else{
            toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
         }
        console.log("login response",response);

     } catch (error) {
         console.log("login error",error);
     }
    }
    return <>
    
    <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">
                    <div className="resistration-image">
                        <img src="/images/login.png" alt="login image" width="500" height="500" />
                    </div>
                    {/* let tackel registration form */}

                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Login form</h1>
                        <br />

                        <form onSubmit={handleSubmit} >
                           
                            <div>
                                <label htmlFor="email">email</label>
                                <input 
                                type="email" 
                                name="email"
                                placeholder="enter your email"
                                id="email"
                                required 
                                autoComplete="off" 
                                value={user.email}
                                onChange={handleInput}
                                />

                            </div>
                            
                            <div>
                                <label htmlFor="password">password</label>
                                <input 
                                type="password" 
                                name="password"
                                placeholder="password"
                                id="password"
                                required 
                                autoComplete="off" 
                                value={user.password}
                                onChange={handleInput}
                                />

                            </div>
                            <br />
                            <button type="submit" className="btn btn-submit">
                                Login
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
}