import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express'
import newBuffer  from 'buffer'
import request from 'request'
import  fetch  from 'node-fetch'
import * as querystring from 'querystring'
import cors from 'cors'
import prisma from 'tunebridge/lib/prisma.js'
const app = express()
const port = 4000

let Client_id = process.env.CLIENT_ID
let Client_secret = process.env.CLIENT_SECRET
let user_id1 = ""
const redirect_uri = 'http://localhost:4000/callback'

app.use(cors({
    origin: "http://localhost:3000", // Allow your frontend
    credentials: true,               // Optional: if using cookies/auth
  }));
  
app.get('/', (req, res) => {
    res.send(`
        <html>
          <head><title>TuneBridge</title></head>
          <body>
            <h1>Welcome to TuneBridge</h1>
            <a href="/login">
              <button>Sign in with Spotify</button>
            </a>
          </body>
        </html>
      `);
  });
app.get('/login', (req, res) => {
    var state = generateRandomString(32);
    const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-private';


    const params = querystring.stringify({
        response_type: 'code',
        client_id: Client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      });

    console.log('Login route - Redirecting to:', 'https://accounts.spotify.com/authorize?' + params);
    console.log('Client ID:', Client_id);
    console.log('Redirect URI:', redirect_uri);
      
      res.redirect('https://accounts.spotify.com/authorize?' + params);
      console.log("Working So far 1");
    })

app.get('/callback', (req, res) => {
    console.log("Working So far 2")
    var code = req.query.code || null;
    var state = req.query.state || null;
    

    if(state === null){
        console.log("Working So far 3.1")
        res.redirect('/#' + querystring.stringify({
            error: 'state_mismatch'
        }))
    } else {
        console.log("Working So far 3.12")
        var authOptions = {

            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' +(Buffer.from(Client_id + ':' + Client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            console.log("Working So far 3.2")
            if(!error && response.statusCode === 200){
                var access_token = body.access_token,
                refresh_token = body.refresh_token

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };
                
                // Wrap request in a Promise
                new Promise((resolve, reject) => {
                    request.get(options, function(error, response, body) {
                        if (error) {
                            console.error('Error fetching user profile:', error);
                            reject(error);
                        } else {
                            console.log(body);
                            user_id1 = body.id;
                            resolve(body);
                        }
                    });
                })
                .then(() => {
                    // Redirect after user_id1 is set
                    res.redirect(`http://localhost:3000/#${querystring.stringify({
                        access_token,
                        refresh_token,
                        user_id1
                    })}`);
                })
                .catch((err) => {
                    console.error('Failed to get user profile:', err);
                    res.redirect('/#' + querystring.stringify({
                        error: 'failed_to_get_profile'
                    }));
                });
            } else {
                console.log('Token error:', error, body);
                res.redirect('/#' + querystring.stringify({
                    error: 'invalid_token'
                }));
            }
        });
    }
});

app.get('/refresh_token', (req, res)=>{
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authoirzation': 'Basic ' + (Buffer.from(Client_id + ':' + Client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true

    };

    request.post(authOptions,(error,response,body) =>{
        if(!error && response.statusCode === 200){
            var access_token = body.access_token,
            refresh_token = body.refresh_token || refresh_token;
            res.send({
                'access_token': access_token,
                'refresh_token' : refresh_token
            });
        }
    });
});

app.post('/getUserID', (req, res) => {

    user_id1 = req.body;
    console.log("User ID:", user_id1.user_id);
    res.redirect('/getPlaylists');
    console.log("Working So far 4")
});

app.get('/getPlaylists', (req, res) => {

    user_id = user_id1.user_id;
    console.log("User ID:", user_id);
    var authOptions = {
        url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
        headers: {
            'Authoirzation' : 'Bearer' + access_token
        }

    }

    fetch(authOptions.url,{
        method: 'GET',
        headers: {
            'Authorization': authOptions.headers.Authorization
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok' + response.statusText);
        }
        return response.json();
    })

});

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }


app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
  });