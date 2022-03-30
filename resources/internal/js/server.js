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

        // when data is done being processed
        request.on("end", () => {
            console.log("This is triggered!")
            console.log(body);
            response.writeHead("200");
            response.end(body); // how to write body to response?
        });
    } else {
        response.writeHead("501");
        response.end();
    }
})

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
