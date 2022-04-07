"use strict";

const http = require("http");
const fs = require("fs");
const path = require('path');

const host = "0.0.0.0";
const port = (process.env.PORT || 8000);

const server = http.createServer((request, response) => {
    if (request.method === "POST") {
        let body = "";

        request.on("data", chunk => {
            body += chunk.toString();
        }).on("end", () => {
            body = JSON.parse(body);
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify(body));
        }).on("error", error => {
            console.error(err.stack);
            response.writeHead(404);
            response.end();
        })
    } else if (request.method === "GET") {
        const url = new URL(request.url, `http://${request.headers.host}`);
        let filePath = "." + url.pathname;
        if (filePath === "./") {
            filePath = "./landing.html";
        }
        console.log(filePath);

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
