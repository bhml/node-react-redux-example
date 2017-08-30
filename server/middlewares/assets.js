import path from 'path'
import webpack from 'webpack'
import compression from 'compression'

export default (app) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(compression())

    // all other routes not defined previously defaults to index.html (SPA)
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../index.html'))
    })
  }
  else if (process.env.NODE_ENV !== 'testing') {
    const compiler = webpack(require('../../webpack/dev.config'))
    const serverOptions = {
      noInfo: true,
      hot: true,
      inline: true,
      lazy: false,
      publicPath: '/public',
      headers: { 'Access-Control-Allow-Origin': '*' },
      stats: {
        hash: false,
        version: false,
        assets: false,
        chunkModules: false,
        reasons: false,
        colors: true,
      },
    }

    // webpack dev server instance with hot-reloading
    const instance = require('webpack-dev-middleware')(compiler, serverOptions)

    app.use(instance)
    app.use(require('webpack-hot-middleware')(compiler))

    // all other routes not defined previously defaults to index.html (SPA)
    // will first wait until the webpack build is successful
    // otherwise the index.html file would not be available
    app.get('*', (req, res, next) => {
      instance.waitUntilValid(() => {
        const filename = path.join(compiler.outputPath, 'index.html')
        compiler.outputFileSystem.readFile(filename, (err, result) => {
          if (err) return next(err)
          res.set('content-type', 'text/html')
          res.send(result)
        })
      })
    })
  }
}
