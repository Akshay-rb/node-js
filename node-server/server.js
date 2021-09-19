const http = require('http')
const port = 3010

// for not having to restart the server everytime a change is made - like in react ------- npm install -g nodemon ---- only development

const server = http.createServer(function(request, response){
    if(request.url === '/'){
        response.end('response from node server -home /')
    } else if(request.url === '/about'){
        response.end('response from about page')
    } else if(request.url === '/services'){
        response.setHeader('content-type', 'text/html')
        response.end(' <div><h2>Listing users</h2> <ul> <li> App development </li> <li> mobile development </li> </ul> </div> ')
    } else if(request.url === '/users'){
        const users = [{id : 1, name:'sam'}, {id:2, name:'rita'},{id:3, name:'mona'}, {id:4, name:'john'}]
        response.setHeader('content-type', 'application/json')
        response.end(JSON.stringify(users))
    }
    
    else{
        response.end('page you are looking for does not exist')
    }
})

server.listen(port, function(){
    console.log('listening on the port ', port)
})