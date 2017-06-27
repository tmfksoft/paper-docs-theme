# paper-docs-theme
This repository is the home of the PaperDocs theme. The PaperDocs theme is a customized version of the SpongeDocs theme
which is a customized version of the [Read the Docs Sphinx Theme](https://github.com/snide/sphinx_rtd_theme).

## Contributing
The PaperDocs theme is built using [Node.js](https://nodejs.org) and [gulp](http://gulpjs.com).

  1. [Install Python 3](https://www.python.org)
  2. [Install Node.js](https://nodejs.org)

In terminal or the command line, within the directory containing this README, run the following commands:

```bash
npm install -g gulp
npm install
pip install -r requirements.txt
```

### Project structure
The `src` folder contains all sources. All other folders (e.g. `paper_docs_theme`) contain generated files and should
not be edited. The sources for the theme are in `src/theme`.
#### Theme
The theme can be built using `gulp theme:build`. To rebuild the theme when changes to the local source files are made,
run `gulp theme:watch`.

To test the changes, setup a [PaperDocs](https://github.com/PaperMC/PaperDocs) workspace and install your local
`paper-docs-theme` project as PIP package: `pip install -e path/to/your/paper-docs-theme`.

##### Note
_When running the pip commands under a normal user you may encounter file permission errors. Try adding --user to the end of the command._