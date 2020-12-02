import * as http from 'http'
import { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer();

server.on('request',(request:IncomingMessage,response:ServerResponse) => {
  const array = []
  request.on('data',chunk => {
    array.push(chunk)
    console.log('数据')
  } )
  request.on('end',() =>{
    const body = Buffer.concat(array).toString();
    response.end(body )
  })
}); 
server.listen(8888,()=>{
  console.log('开启：8888')
});
