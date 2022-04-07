"use strict";

const http = require("http");
const fs = require("fs");
const path = require('path');

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
            console.log(data);
            response.writeHead("200", {"Content-type": "text/plain"});
            response.end(data, "utf-8");
        });
    } else if (request.method === "GET") {
        const url = new URL(request.url, `http://${request.headers.host}`);
        let filePath = "." + url.pathname;
        if (filePath === "./") {
            filePath = "./index.html";
        }

        const extName = path.extname(filePath)
        const map = {
            '.ico': 'image/x-icon',
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.wav': 'audio/wav',
            '.mp3': 'audio/mpeg',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword'
        };

        fs.access(filePath, fs.F_OK, err => {
            if (err) {
                response.writeHead(404);
                response.end();
            }
            else {
                fs.readFile(filePath, (error, content) => {
                    if (error) {
                        response.writeHead(500);
                        response.end();
                    } else {
                        response.writeHead(
                            200,
                            {"Content-Type": map[extName] || "text/plain"}
                        );
                        response.end(content, "utf-8")
                    }
                });
            }
        });

    } else {
        response.writeHead(501);
        response.end();
    }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
