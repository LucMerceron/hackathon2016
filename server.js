import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import React from 'react'

import ReactDOMServer from 'react-dom/server'
import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'
import routes from './src/routes'
import { renderToString } from 'react-dom/server'

var port = 5556

var app = express()

require('node-jsx').install()

/** Get static assets */
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function (req, res) {
 
  res.send(renderFullPage())

})

function renderFullPage() {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Spectator</title> 
        <meta charset="UTF-8"> 
        <link rel="stylesheet" href="/bootstrap.min.css">
        <link rel="stylesheet" href="/styles.css">
        <link rel="icon" href="/favicon.ico">
      </head>
      <body>
        <div id="app"></div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
}

app.listen(port)

console.log('Server is Up and Running at Port : http://localhost:' + port)