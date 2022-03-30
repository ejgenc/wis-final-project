"use strict";

const http = require("http");

const host = 'localhost';
const port = 8000;

const server = http.createServer((request, response) => {
    if (request.method === "POST") {
        let body = "";

        // stream the body data 
        request.on("data", chunk => {
            body += chunk.toString();
        });

        // process data here
        for (let char of body) {
            body += "1";
        }

        // when data is done being processed
        request.on("end", () => {
            response.writeHead("200");
            response.end(body);
        });

        // at the end
        response.writeHead("200");
        // return a formatted list of hexcodes
        response.end(body);
    }
    else {
        response.writeHead("501");
        response.end();
    }
})

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
