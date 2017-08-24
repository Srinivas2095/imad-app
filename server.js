var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var config={
    user:'srinivasavaradhansriram',
    database:'srinivasavaradhansriram',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};


var content=
{
    title:'Demo App',
    heading:'MSD',
    date:'Aug 9,2017',
    content:`
    <p>Hi..This is a demo app</p>`
    
};

function createTemplate(data)
{
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var htmltemplate=`
    <html>
    <head>
    <title>
    ${title}
    </title>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <a href="/ui/index.html">Home</a>
   <script type="text/javascript" src="/ui/main.js"></script>
    </head>
    <body>
    <div class="container">
    <div>
    <a href="/">Home</a>
    </div>
    <hr/>
    
    <div>
    ${date}
    </div>
    <h2>
    ${heading}
    </h2>
    </body>
    </html>`;
    return htmltemplate;
    
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
app.get('/test-db',function(req,res)
{
    pool.query('SELECT * FROM User',function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/new/:title',function(req,res){
    pool.query("SELECT * FROM new WHERE title='"+req.params.title+"'",function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.status(404).send('Not found');
            }
            else
            {
                var data=result.rows[0];
                res.send(createTemplate(data));
            }
        }
    });
});

var counter=0;

function hash(input,salt)
{
    var hashed=crypto.pbkdf25ync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input',function(req,res)
{
    var hashedString=hash(req.params.input,'Test string');
    res.send(hashedString);
});

app.get('/counter',function(req,res)
{
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/demoapp',function(req,res)
{
    res.send(createTemplate(content));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/Sample1',function(req,res)
{
    res.send("This is sample1");
});

app.get('/Sample2',function(req,res)
{
    res.send("This is sample2");
});

app.get('/test-db',function(req,res)
{
    
});

var names=[];
app.get('/submitname/:name',function()
{
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
