import webserver from 'gulp-webserver'
import fs from 'fs-extra'
import clean from 'gulp-clean'
import pkg from 'gulp'
const {src} = pkg

const clear = function() {
  return src(["dist/es/*", "dist/umd/*", "index.d.ts"], {
    read: false,
    allowEmpty: true
  }).pipe(clean())
}

const serve = function() {
  return src('./').pipe(webserver({
    host: '127.0.0.1',
    port: '5000',
    livereload: true,
    open: 'public/index.html'
  }))
}

export {
  clear, serve
}