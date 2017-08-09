var express = require('express');
var morgan = require('morgan');
var path = require('path');
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
    </html>`
    return htmltemplate;
    
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
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


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
