"use strict";

const http = require("http");

const host = "0.0.0.0";
const port = (process.env.PORT || 8000);

const server = http.createServer((request, response) => {
    if (request.method === "POST") {
        let data = "";

        // stream the POSTed data 
        request.on("data", chunk => {
            data += chunk.toString();
        });

        // process the POSTed data

        // when data is done being processed
        request.on("end", () => {
            console.log("I am triggered!");
            response.writeHead("200");
            response.end(); // how to write body to response?
        });
    } else {
        response.writeHead("501");
        response.end();
    }
})

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
