//Include express
const express = require("express");
//Instantiate express
const app = express();
//File System
const fs = require('fs');
const path = require('path');
const serialize = require('serialize-javascript')
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = typeof process.env.NODE_ENV !== undefined && (process.env.NODE_ENV === 'production')
let renderer

//Read content of index.html
const indexHTML = (() => {
  //Path is always relative to server.js
  return fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8");
})();

// console.log("isProd", isProd)

if (isProd) {
  app.use("/", express.static(path.resolve(__dirname, "./dist")));
} else {
  app.use("/dist", express.static(path.resolve(__dirname, "./dist")));
}

if (isProd) {
  const bundlePath = path.resolve(__dirname, './dist/server/main.js')
  renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {
  require("./build/dev-server")(app, bundle => {
    renderer = createBundleRenderer(bundle)
  });
}
require("./build/dev-server")(app, bundle => {
  renderer = createBundleRenderer(bundle)
});

//Event handler for all request ("*") or for specific path ("/user")
app.get('*', (req, res) => {
  const context = { url: req.url };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return res.status(500).send('Server Error')
    }
    // console.log(html)
    html = indexHTML.replace('{{ APP }}', html)
    html = html.replace('{{ STATE}}',
      `<script>window.__INITIAL_STATE__= ${serialize(context.initialState, { isJSON: true })}</script>`)
    res.write(html);
    res.end;
  })
});

//Listen a port, you can change your own port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
