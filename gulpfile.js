const
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    del = require('del'),

    svgmin = require('gulp-svgmin'),

    // HTML
    nunjucksRender = require('gulp-nunjucks-md'),
    htmlmin = require('gulp-htmlmin'),

    // CSS
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),

    // JavaScript
    buble = require('gulp-buble'),
    uglify = require('gulp-uglify'),

    spawn = require('child_process').spawn,

    webserver = require('gulp-webserver');

gulp.task('clean', () => del(['paper_docs_theme', 'dist', 'build']));

// Theme
gulp.task('theme:files', () =>
    gulp.src('src/theme/{*.*,{static,templates}/**}')
        .pipe(gulp.dest('paper_docs_theme'))
);

gulp.task('theme:svg', () =>
    gulp.src('src/theme/svg/**')
        .pipe(svgmin())
        .pipe(gulp.dest('paper_docs_theme/static'))
);

gulp.task('theme:scripts', () =>
    gulp.src('src/theme/scripts/**')
        .pipe(gulp.dest('dist/scripts'))
);

gulp.task('theme:scss', () =>
    gulp.src('src/theme/scss/spongedocs.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('paper_docs_theme/static'))
);

gulp.task('theme:js', () =>
    gulp.src('src/theme/js/*.js')
        .pipe(concat('spongedocs.js'))
        .pipe(buble({
            transforms: {
                dangerousForOf: true
            }
        }))
        .pipe(uglify({
            mangle: {
                toplevel: true,
            },
        }))
        .pipe(gulp.dest('paper_docs_theme/static'))
);

gulp.task('theme:js:worker', () =>
    gulp.src('src/theme/js/offline/worker.js')
        .pipe(buble())
        .pipe(uglify({
            mangle: {
                toplevel: true
            }
        }))
        .pipe(gulp.dest('paper_docs_theme/extra'))
);

gulp.task('theme:js:lib', () =>
    gulp.src('src/theme/js/lib/*.js')
        .pipe(uglify({
            preserveComments: 'license'
        }))
        .pipe(gulp.dest('paper_docs_theme/static'))
);


gulp.task('theme:js:gettext', ['theme:files'],
    shell('babel', 'python', ['setup.py', 'extract_messages', '-o', 'paper_docs_theme/theme.pot'])
);

gulp.task('theme:build', ['theme:files', 'theme:svg', 'theme:scripts', 'theme:scss',
    'theme:js', 'theme:js:lib', 'theme:js:worker', 'theme:js:gettext']);

gulp.task('theme:watch', ['theme:build'], () => {
    gulp.watch('src/theme/{*.py,{static,templates}/**}', ['theme:files']);
    gulp.watch('src/theme/svg/**', ['theme:svg']);
    gulp.watch('src/theme/scripts/**', ['theme:scripts']);
    gulp.watch('src/theme/scss/**', ['theme:scss']);
    gulp.watch('src/theme/js/*.js', ['theme:js', 'theme:js:gettext']);
    gulp.watch('src/theme/js/offline/worker.js', ['theme:js:worker']);
});

gulp.task('theme', ['theme:watch']);

gulp.task('build', ['theme:build']);
gulp.task('default', ['build']);

function shell(plugin, command, args) {
    return (done) =>
        spawn(command, args, {stdio: 'inherit'})
            .on('error', (err) => {
                done(new gutil.PluginError(plugin, err))
            })
            .on('exit', (code) => {
                if (code == 0) {
                    // Process completed successfully
                    done()
                } else {
                    done(new gutil.PluginError(plugin, `Process failed with exit code ${code}`));
                }
            })
}
