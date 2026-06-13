const browserSync = require('browser-sync').create();
const cp = require('child_process');

// Run Jekyll through Bundler so the build uses the versions pinned in Gemfile.lock.
const bundler = process.platform === 'win32' ? 'bundle.bat' : 'bundle';
const jekyllArgs = ['exec', 'jekyll'];

const scssPath = '_scss/**/*.scss';
const jsPath = '_scripts/*.js';
const templatePath = [
  '*.html',
  '+(_includes|_layouts)/*.html',
  '*.yml',
  '_data/*.yml',
  '_posts/*',
];

module.exports = gulp => {
  const reloadBrowser = done => {
    browserSync.reload();
    done();
  };
  // run `jekyll build`
  gulp.task('jekyll-build', done => {
    return cp
      .spawn(bundler, [...jekyllArgs, 'build'], { stdio: 'inherit' })
      .on('close', done);
  });

  // run `jekyll build` with _config_dev.yml
  gulp.task('jekyll-dev', done => {
    return cp
      .spawn(
        bundler,
        [...jekyllArgs, 'build', '--config', '_config.yml,_config_dev.yml'],
        { stdio: 'inherit' }
      )
      .on('close', done);
  });

  // Rebuild Jekyll then reload the page
  gulp.task('jekyll-rebuild', gulp.series(['jekyll-dev', reloadBrowser]));

  gulp.task(
    'serve',
    gulp.series('jekyll-dev', () => {
      browserSync.init({
        server: {
          baseDir: '_site',
        },
      });

      gulp.watch(scssPath, gulp.series(['sass', reloadBrowser]));
      gulp.watch(jsPath, gulp.series(['scripts', reloadBrowser]));
      gulp.watch(templatePath, gulp.task('jekyll-rebuild'));
    })
  );
};
