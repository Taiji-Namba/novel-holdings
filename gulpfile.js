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

// sass/page/sales.scssをコンパイル
const compileSalesSass = () => {
  return src("sass/page/sales.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(dest("./sales/css", { sourcemaps: "." }));
};

// sass/page/data-scientist.scssをコンパイル
const compileDataScientistSass = () => {
  return src("sass/page/data-scientist.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(dest("./data-scientist/css", { sourcemaps: "." }));
};

// sass/page/agent.scssをコンパイル
const compileAgentSass = () => {
  return src("sass/page/agent.scss", { sourcemaps: true })
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(dest("./agent/css", { sourcemaps: "." }));
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
      compileEngineerSass,
      compileSalesSass,
      compileDataScientistSass,
      compileAgentSass
    )
  );
};

// npx gulpでwatchSassFilesが実行されるように
exports.default = watchSassFiles;
