var {src,dest,series,parallel}=require('gulp')
var uglify=require('gulp-uglify-es').default
var rename=require('gulp-rename')
var del=require('del')
var browserify=require('browserify')
var tsify=require('tsify')
var source=require('vinyl-source-stream')
var buffer=require('vinyl-buffer')

const tsTask=function(){
  del(['dist/'])
  return browserify({
    basedir: 'src/',
    entries: ['clear-viewport.ts']
  })
  .plugin(tsify).bundle()
  .pipe(source('hello.js'))
  .pipe(buffer())
  .pipe(dest('dist/'))
    
}

const jsTask=series(tsTask,function(){
  return src('dist/*.js')
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(dest('dist/'))
})

module.exports.default=jsTask