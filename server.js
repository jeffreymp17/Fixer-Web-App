//Install express server
const cors = require('cors'); //<-- required installing 'cors' (npm i cors --save)
const express = require('express');
const path = require('path');

const app = express();

app.use(cors()); 
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/Fixer'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/Fixer/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);