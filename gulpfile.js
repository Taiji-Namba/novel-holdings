// gulpプラグインを読み込む。かつ、parallelでコンパイルタスクを並列実行できるように。
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// style.scssをコンパイル
const compileStyleSass = () => {
  return src("sass/style.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    ) // コンパイルエラー時に、watchタスクを止めずにエラー内容を詳細に表示する
    .pipe(postcss([autoprefixer({ grid: true })])) // autoprefix処理(IEでもgrid対応)
    .pipe(dest("css", { sourcemaps: "." }));
};

// front-page.scssをコンパイル
const compileFrontPageSass = () => {
  return src("sass/page/front-page.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(dest("css", { sourcemaps: "." }));
};

// sass/page/entry.scssをコンパイル
const compileEntrySass = () => {
  return src("sass/page/entry.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(dest("./entry/css", { sourcemaps: "." }));
};

// sass/page/director.scssをコンパイル
const compileDirectorSass = () => {
  return src("sass/page/director.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(dest("./director/css", { sourcemaps: "." }));
};

// sass/page/engineer.scssをコンパイル
const compileEngineerSass = () => {
  return src("sass/page/engineer.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(dest("./engineer/css", { sourcemaps: "." }));
};

// sass/page/designer.scssをコンパイル
const compileDesignerSass = () => {
  return src("sass/page/designer.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(dest("./designer/css", { sourcemaps: "." }));
};

// sass/page/marketer.scssをコンパイル
const compileMarketerSass = () => {
  return src("sass/page/marketer.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(dest("./marketer/css", { sourcemaps: "." }));
};

// Sassファイルを監視
const watchSassFiles = () => {
  watch(
    "sass/**/*.scss",
    { ignoreInitial: false }, // パーシャルファイルの変更も検知するためのオプション
    parallel(
      compileStyleSass,
      compileFrontPageSass,
      compileEntrySass,
      compileDirectorSass,
      compileEngineerSass,
      compileDesignerSass,
      compileMarketerSass
    )
  );
};

// npx gulpでwatchSassFilesが実行されるように
exports.default = watchSassFiles;
