var {src,dest,watch,series,parallel}=require('gulp')
var uglify=require('gulp-uglify-es').default
var rename=require('gulp-rename')
var del=require('del')
var webserver=require('gulp-webserver')

const delTask=function(){
  return del(['dist/'])
}

const jsTask=series(delTask,function(){
  return src('src/*.js')
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(dest('dist/'))
})

const watchTask=function(){
  watch('src/*.js',jsTask)
}

const serverTask=series(
  jsTask,
  function(){
    return src('./')
      .pipe(webserver({
        host:'0.0.0.0',
        port:'5000',
        livereload:true,
        open:'page/index.html'
      }))
  },
  watchTask
)

module.exports={
  server:serverTask,
  default:jsTask
}
