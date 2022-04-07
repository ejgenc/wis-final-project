"use strict";

const http = require("http");
const fs = require("fs");
const path = require('path');

const host = "localhost";
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
    } else if (request.method === "GET") {
        const url = new URL(request.url, `http://${request.headers.host}`);
        let filePath = "." + url.pathname;
        if (filePath === "./") {
            filePath = "./index.html";
        }

        const extName = path.extname(filePath)
        let contentType;
        if (extName === ".html") {
            contentType = "text/html";
        } else if (extName === ".js") {
            contentType = "text/javascript";
        } else if (extName === ".css") {
            contentType = "text/css";
        } else {
            // I am not serving any other content atm
            response.writeHead("404");
            response.end();
        }

        fs.access(filePath, fs.F_OK, err => {
            if (err) {
                response.writeHead("404");
                response.end();
            }
            else {
                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        response.writeHead(500);
                        response.end();
                    } else {
                        response.writeHead(200, {"Content-Type": contentType});
                        response.end(content, "utf-8")
                    }
                });
            }
        });

    } else {
        response.writeHead("501");
        response.end();
    }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
