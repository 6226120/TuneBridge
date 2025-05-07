import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express'
import newBuffer  from 'buffer'
import request from 'request'
import  fetch  from 'node-fetch'
import * as querystring from 'querystring'
import cors from 'cors'
const app = express()
const port = 3000

let Client_id = process.env.CLIENT_ID
let Client_secret = process.env.CLIENT_SECRET
const redirect_uri = 'http://localhost:3000/callback'

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
      
      res.redirect('https://accounts.spotify.com/authorize?' + params);
      console.log("Working So far 1");
    })

app.get('/callback', (req, res) => {
    var code = req.query.code || null;
    var state = req.query.state || null;
    

    if(state === null){
        console.log("Working So far 3.1")
        res.redirect('/#' + querystring.stringify({
            error: 'state_mismatch'
        }))
    } else {
        
        var authOptions = {

            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'content-type': 'applciation/x-www-form-urlencoded',
                'Authorization' : 'Basic ' +(Buffer.from(Client_id + ':' + Client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, (error, body, response) => {
            if(!error && response.statusCode === 200){
                var access_token = body.access_token,
                refresh_token = body.refresh_token

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                  };
          
                  // use the access token to access the Spotify Web API
                  request.get(options, function(error, response, body) {
                    console.log(body);
                  });
          
                  // we can also pass the token to the browser to make requests from there
                  res.redirect('/#' +
                    querystring.stringify({
                      access_token: access_token,
                      refresh_token: refresh_token
                    }));
                } else {
                  res.redirect('/#' +
                    querystring.stringify({
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
const getPlaylist = function (req, res) {

    user_id = req.params.user_id;
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
};

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