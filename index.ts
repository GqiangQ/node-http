import * as http from 'http'
import { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer();

  console.log('请求了')
server.on('request',(request:IncomingMessage,response:ServerResponse) => {
  console.log(request.method)
  console.log(request.headers)
  response.end('hi')
}); 
server.listen(8888,()=>{
  console.log('开启：8888')
});
