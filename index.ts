import * as fs from 'fs'
import * as http from 'http'
import * as p  from 'path'
import * as url  from 'url'

import { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer();
const cacheAge = 3600*24
const publicPath = p.resolve(__dirname,'public')
const publicPath404 = p.resolve(p.resolve(publicPath,'404'),'404.html')

server.on('request',(request:IncomingMessage,response:ServerResponse) => {
  const { method, url:path, headers } = request
  const {pathname, search } = url.parse(path)
  // console.log( url.parse(path))
  const fileName = pathname.substr(1)
  console.log(fileName)
  fs.readFile(p.resolve(publicPath,fileName),(error,data)=>{
    if (error){
      if(error.errno === -4058){
        fs.readFile(publicPath404,(error,data)=>{
          response.end(data)
        })
        response.end('资源不存在！')
      }else{
        response.statusCode = 404
        response.end('服务器开小差！')
      }
      
    } else {
      response.setHeader('Cache-Control', `public, max-age=${cacheAge}`)
      response.end(data)
    }
  })
    //     if (error) throw error
    //     response.end(data.toString())
  
    //   })
  // switch(pathname) {
  //   case '/index.html':
  //     response.setHeader('Content-Type','text/html; charset-utf-8')
  //   fs.readFile(p.resolve(publicPath,'index.html'),(error,data)=>{
  //     if (error) throw error
  //     response.end(data.toString())

  //   }); break;
  //   case '/main.js':
  //     response.setHeader('Content-Type','text/javascript; charset-utf-8')
  //   fs.readFile(p.resolve(publicPath,'main.js'),(error,data)=>{
  //     if (error) throw error
  //     response.end(data.toString())

  //   }); break;
  //   case '/style.css':
  //     response.setHeader('Content-Type','text/css; charset-utf-8')
  //   fs.readFile(p.resolve(publicPath,'style.css'),(error,data)=>{
  //     if (error) throw error
  //     response.end(data.toString())

  //   }); break;
  // }
}); 
server.listen(8888,()=>{
  console.log('开启：8888')
});
