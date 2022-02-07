var {src,dest,series,parallel}=require('gulp')
var uglify=require('gulp-uglify-es').default
var rename=require('gulp-rename')
var del=require('del')
var ts=require('gulp-typescript')

const tsProject=ts.createProject('tsconfig.json')
const tsTask=function(){
  del(['dist/'])
  return src('src/clear-viewport.ts')
    .pipe(tsProject())
    .pipe(dest('dist/'))
    
}

const jsTask=series(tsTask,function(){
  return src('dist/*.js')
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(dest('dist/'))
})

module.exports.default=jsTask