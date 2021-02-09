const http = require('http');
const fs = require('fs');
const  PORT = 3003;
const PATH = './DB.json'

let ServerData = null;

const JsonDB = fs.readFile(PATH, (error,data)=>{
    ServerData = JSON.parse(data);
})

http.createServer((req,res)=>{
        if(req.method === 'OPTIONS')
        {
            res.writeHead(200,
                {
                    'Content-Type': 'text/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers':  'Content-Type'
                });

            res.end();

        }

        if(req.method === 'POST')
        {
            res.writeHead(200,{
                'Content-Type': 'text/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
            })


            let body = [];
            req.on('data', (chunk)=>{
                body.push(chunk);
            });

            req.on('end', ()=>{
                body = Buffer.concat(body).toString();
                let data = JSON.parse(body);

                let user = ServerData.filter(item=> item.login === data.login)

                if(user.length === 0)
                {
                    res.end(JSON.stringify({
                        type: 'response',
                        data:{
                            status:'failed',
                            body:null
                        }
                    }))
                }else if(user[0].password !== data.password)
                {
                    res.end(JSON.stringify({
                        type:'response',
                        data:{
                            status: "wrongPassword",
                            body:user.login
                        }
                    }))
                }
                else
                {
                    res.end(JSON.stringify({
                        type:'response',
                        data:{
                            status:"success",
                            body:user.login
                        }
                    }))
                }
                res.end();
            })
        }
        if(req.method === 'GET')
        {
            res.statusCode = 200;
            res.write("OK");
            res.end();
        }
}).listen(PORT);

