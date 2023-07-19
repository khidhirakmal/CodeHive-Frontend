import { useEffect,useState } from "react"


const CLIENT_ID = "eab936840d0ebb5fd564"
const CLIENT_SECRET = "5e88f73615ca61ad3fb0ca5dd27ada9e6fe1f458"
const serverURL = "http://localhost:3000/getAccessToken?code="
const getUserDataURL="http://localhost:3000/getUserData"

export default function GithubLogin() {
const [rerender, setRerender] = false 
const [userData, setUserData] = {}
useEffect(()=>{
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get("code")
    console.log(codeParam)

    if(codeParam && (localStorage.getItem('accessToken')===null)) {
        async function getAccessToken() {
            await fetch(serverURL + codeParam, {
                method:"GET"
            }).then((response)=>{
            return response.json()
        }).then((data)=>{
        console.log(data)
        if(data.access_token) {
            localStorage.setItem("accessToken", data.access_token)
            setRerender(!rerender)

        }
        })
        
    }
    getAccessToken()
}}, [])

async function getUserData() {
    await fetch(getUserDataURL,{
        method:"GET",
        headers:{
            "Authorization": "Bearer" + localStorage.getItem("accessToken")
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        setUserData(data)
    })
}


function loginWithGithub() {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`)
}

return (
    <div>
        {localStorage.getItem("accessToken")?
        <>
        <h1>We have the access token</h1>
        <button onClick={()=>{
            localStorage.removeItem("accessToken")
            setRerender(!rerender)
        }}>
            Logout
        </button>
        <h3>Get User Data from Github API</h3>
        <button onClick={getUserData}></button>
        {Object.keys(userData).length !==0 ?
        <>
        <h4>Hello {userData.login} </h4>
        <img width="100px" height ="100px" src={userData.avatar_url}></img>
        <a href={userData.html_url}></a>
        </>
        :
        <>
        <h4> There is no data!</h4>
        </>
    }
        </>
        :
        <>
        <h3>User is not logged in</h3>
        <button onClick={loginWithGithub} >
        Login with Github
    </button>
        
        </>
        
    }
        
    </div>
)}