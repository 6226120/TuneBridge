import React from "react";

export default function Login(){

    
    return (
       <div class="flex items-center">
            <div class="flex flex -auto flex-col box-border size-32 border-4 p-4 bg-transparent">
                <label for="username"> Username:</label>
                <input type='text' id="username" placeholder="Username" required  ></input>

                <label for="passowrd">Password</label>
                <input type="text" id="password" placeholder="Password" required></input>
                
            </div>
       </div>
    )
}