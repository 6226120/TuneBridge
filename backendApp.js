import { configDotenv } from 'dotenv'
configDotenv.config 
const express = require('express')
const app = express()
const port = 3000

Client_id = 'CLIENT_ID'
CLient_secret = 'CLIENT_SECRET'
const redirect_uri = 'http://localhost:3000/callback'

app.get('/login', (req, res) => {
    var state = generateRanomString(32);
    var scope = 'user-read-private user playlist-read-private playlist-modify-private'
    
    res.redirect('https://accounts.spotyify.com/authorize?' + QueryString.stringify({
        reponse_type: 'code',
        client_id: Client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }))

})
app.get('callback', (req, res) => {
    var code = req.query.code || null;
    var state = req.query.state || null;

    if(state === null){
        res.redirect('/#' + quertstring.stringify({
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
                'Authorization' : 'Basic ' +(newBuffer.from(client_id + ':' + CLient_secret).toString('base64'))
            },
            json: true
        };
    }
});
app.get('/refresh_token', (req, res)=>{
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authoirzation': 'Basic ' + (new Bugffer.from(client_id + ':' + client_secret).toString('base64'))
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
app.get('/playlists')