from setuptools import setup
import paper_docs_theme

setup(
    name='paper-docs-theme',
    version=paper_docs_theme.__version__,
    description='Theme for PaperMC documentation',
    url='https://github.com/PaperMC/paper-docs-theme',
    author='PaperMC',
    license='MIT',

    packages=['paper_docs_theme'],
    install_requires=['sphinx_rtd_theme==0.1.9'],

    message_extractors={
        'src/theme/js': [
            ('**.js', 'javascript', None),
        ]
    },

    zip_safe=False,
    package_data={'paper_docs_theme': [
        '*.json',
        'favicon.ico',
        'theme.pot',
        'templates/*.html',
        'static/*',
        'static/*/*',
        'extra/*'
    ]},
    scripts=[
        'dist/scripts/build-language',
        'dist/scripts/language-code',
        'dist/scripts/list-translations',
        'dist/scripts/list-versions',
        'dist/scripts/pr-comment',
        'dist/scripts/pr-deploy',
        'dist/scripts/travis-prepare'
    ],

    classifiers=[
        'Development Status :: 3 - Alpha',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Framework :: Sphinx',
        'Framework :: Sphinx :: Extension',
    ]
)
