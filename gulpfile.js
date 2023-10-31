import webserver from 'gulp-webserver'
import fs from 'fs-extra'
import clean from 'gulp-clean'
import pkg from 'gulp'
import minimist from 'minimist'
const {src} = pkg
const languages = ["zh", "ja", "ko", "fr"]

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

async function upgrade() {
  const options = minimist(process.argv.slice(2), { string: 'host', default: '' })
  const npm = await fs.readJSON('package.json')
  let { version } = npm
  if (/^\d+\.\d+\.\d+$/.test(options.host)) {
    version = options.host
  } else {
    version = upgradeVersion(version)
  }
  npm.version = version
  await fs.writeJSON('package.json', npm, { spaces: 2 })
  upgradeFile("readme.md")
  languages.forEach(item => {
    upgradeFile(`public/md/readme-${item}.md`)
  })

  async function upgradeFile(url) {
    let text = await fs.readFile(url, "utf8")
    text = text.replace(/\/webtools@\d+\.\d+\.\d+\//g, `/webtools@${version}/`)
    await fs.writeFile(url, text)
  }

  function upgradeVersion(str) {
    let arr = str.split(".").map(Number)
    let thr = arr[2] + 1
    if (thr >= 100) {
      let two = arr[1] + 1
      if (two >= 100) {
        arr[0] = arr[0] + 1
        arr[1] = arr[2] = 0
      } else {
        arr[1] = two
        arr[2] = 0
      }
    } else {
      arr[2] = thr
    }
    return arr.join(".")
  }
}

export {
  clear, serve, upgrade
}