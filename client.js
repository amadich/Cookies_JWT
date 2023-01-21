import React, { useState } from "react";
import Axios from 'axios';

import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';


export default function Signin() {

    // Initialize Cookies
    const cookies = new Cookies();


    // Initialize emails states
    const [email , setEmail] = useState("");
    const [pwd , setPwd] = useState("");
    const [user , setUser] = useState(null);

    //  Login Post
    const sendmyacc = () => {

        Axios.post("http://localhost:3001/api/login", {email: email , pwd : pwd})
        .then((response) => {
            console.log(response.data.token)
            
           
                    
                const mytoken = response.data.token;
                jwtlogin(mytoken);
                console.log(user);
            
        });
        

    }


    // cooking-login jwt
    const jwtlogin = (mytoken) => {
        // Decode JWT token
        const decoded = jwtDecode(mytoken)

        // set emails State
        setUser(decoded);

        // set cookie
        cookies.set("jwt_auth",mytoken, {
            expires: new Date(decoded.exp * 1000),
        })
    }


    
    return(
        <>
            <div className="signin_page">
                    <div className="bordersignin">
                        <form action="/signin" method="POST" >
                                <h2>Sign in</h2>
                                <input type="text" placeholder="E-mail" onChange={(e) => {setEmail(e.target.value)}}/>
                                <input type="password"  placeholder="Password" onChange={(e) => {setPwd(e.target.value)}}/>
                                <input type="button" value="Login" id="btn_sub" onClick={sendmyacc}/>
                        </form>
                    </div>
            </div>
        </>
    )
}