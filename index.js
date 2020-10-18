
const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
//==============================//
let a = 'Name10';
let b = 'Name20';
let winner = '';
let looser = '';
let totalA ='';
let totalB ='';

let a1 = 0; 
let a2 = 0; 
let a3 = 0 ;
let b1 = 0; 
let b2 = 0; 
let b3 = 0;
//==============================//

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.listen(3001, ()=>{
    console.log('server is running');
});
app.use(express.static( path.join(__dirname + '/public')));
app.use(express.urlencoded({extended:true}));


app.get('/', (request, response)=>{
    response.render('index.hbs',{
        title: 'Round',
        bboyRed: a,
        bboyBlue: b,
        nameState: 'Round'
    });
});
app.get('/setup', (request, response)=>{
    response.render('firstform.hbs',{
        title:'Add'

    });
});
app.get('/result', (request, response)=>{
    response.render('result.hbs',{
            title:'Results',
            nameW: winner,
            nameL: looser,
            scoreA: totalA,
            scoreB: totalB
    })
})

app.post('/setup', (request, response)=>{
    a = request.body.red;
    b = request.body.blue;
    response.redirect('/');
    console.log(request.body);
});
app.post('/', (request, response)=>{

    console.log(request.body);
    if(request.body.a1 === request.body.b1){
        a1  += 2;
        b1 += 2
    
    
    }
    if(request.body.a2 === request.body.b2){
        a2  += 2;
        b2 += 2
    
    
    }
    if(request.body.a3 === request.body.b3){
        a3  += 2;
        b3 += 2
    
    
    }
//===============================================//
    if(request.body.a1 === 'true' && request.body.b1 === 'false' ){
        a1 += 3;
        b1 += 1;
        
        
    }
    if(request.body.a2 === 'true' && request.body.b2 === 'false' ){
        a2 += 3;
        b2 += 1;
        
        
    }
    if(request.body.a3 === 'true' && request.body.b3 === 'false' ){
        a3 += 3;
        b3 += 1;
        
        
    }
//=================================================//
    if(request.body.b1 === 'true' && request.body.a1 === 'false' ){
        a1 += 1;
        b1 += 3;
        
    }
    if(request.body.b2 === 'true' && request.body.a2 === 'false' ){
        a2 += 1;
        b2 += 3;
        
    }
    if(request.body.b3 === 'true' && request.body.a3 === 'false' ){
        a3 += 1;
        b3 += 3;
        
    }

    totalA = a1 + a2 + a3;
    totalB = b1 + b2 + b3;
    console.log('scoreA: '+ a1 + ' ' + a2  + ' ' + a3 + ' total score: '+ totalA );
    console.log('scoreB: '+ b1 + ' ' + b2  + ' ' + b3 + ' total score: '+ totalB );
    
    if(totalA > totalB){
        winner = a;
        looser = b;
    }
    if(totalA < totalB){
        winner = b;
        looser = a;
    }
    if(totalA === totalB){
        response.render('index.hbs',{
            title: 'Tie',
            bboyRed: a,
            bboyBlue: b,
            nameState: 'Tie'
        });
        response.redirect('/');
        winner = 'tie';
        looser = 'tie';
    }


    console.log('Winner is : '+ winner);
    console.log('Loser is : ' + looser);
    
    response.redirect('/result');
});



