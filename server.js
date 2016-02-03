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
 
  /** get the path and the query */
  var location = new createLocation(req.url)
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation)
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    else if (error)
      res.status(500).send(error.message)
    else if (renderProps == null)
      res.status(404).send('Not found')
    else {
      var html = ReactDOMServer.renderToString(<RoutingContext {...renderProps}/>)
      res.send(renderFullPage(html))
    }
  })

})

function renderFullPage(html) {
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
        <div id="app">${html}</div>
        <script src="/bundle.js"></script>
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-71020784-1', 'auto');
          ga('send', 'pageview');

        </script>
      </body>
    </html>
  `
}

app.listen(port)

console.log('Server is Up and Running at Port : http://localhost:' + port)