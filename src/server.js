"use strict";

const http = require("http");
const fs = require("fs");
const path = require('path');

const headers = {
    "Access-Control-Allow-Origin": "https://wis-final-project.herokuapp.com",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
};
const host = "0.0.0.0";
const port = (process.env.PORT || 8000);

const server = http.createServer((request, response) => {
    if (request.method === "OPTIONS") {
        response.writeHead(204, headers);
        response.end();
    } else if (request.method === "POST") {
        if (request.headers["content-type"] !== "application/json") {
            response.writeHead(406);
            response.end();
        }
        let body = "";

        request.on("data", chunk => {
            body += chunk.toString();
        }).on("end", () => {
            body = JSON.parse(body);
            // validate POST body
            let failValidityCheck = false;
            if (Object.keys(body)[0] !== "nasaUrl") {
                failValidityCheck = true;
            }
            try {
                const nasaUrl = new URL(body["nasaUrl"]);
                if (nasaUrl["host"] !== "apod.nasa.gov") {
                    failValidityCheck = true;
                }
            } catch (err) {
                failValidityCheck = true;
            }
            
            // if it fails validation
            if (failValidityCheck) {
                response.writeHead(422);
                response.end();
            // if it passes validation
            } else {
                // call the function for extracting color palette data
                response.writeHead(200, {"content-type": "application/json"});
                response.end(JSON.stringify(body));
            }
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

// function for extracting color palette data
    // spawn a subprocess
    // call the subprocess w/ parameters
    // get the result of the subprocess
    // return the result

// run the server
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
