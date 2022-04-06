# Ontology viewer frontend

## Quick Start for DDRAM
4/6/2022

### Checkout cy-components
```
gh repo clone idekerlab/cy-components
git checkout 2.0
```

- Make sure you are in this branch: 
    - https://github.com/idekerlab/cy-components/tree/2.0
- Link each package under /packages directory by:

```
npm link
```

### Checkout HiView
```
gh repo clone idekerlab/hiview
cd hiview/frontend
git checkout ddram-revise
npm link "@cytoscape/cy-network-viewer" "@cytoscape/cy-tree-viewer" "@cytoscape/cytoscapejs-renderer"
npm install
```

### Start the dev server for development
```
npm start
```

The app will be available from http://localhost:3000

### Create a bundle
```
npm run build
cp build/app.* ../backend/webserver/static/
```

Then commit the changes.

### Pull & build the container
- SSH to the target machine and pull that branch
- Restart the docker container (check history how to do this)



## Introduction
## How to use

### Install Dependencies

```
$ npm install
```

### Run with local test server

```
$ npm start
```

### Build

```
$ npm run build
```

### Cleanup

```
$ npm run clean
```

## Technologies used
- [npm](https://www.npmjs.com/)
- [Webpack](https://webpack.github.io)
- [React](https://facebook.github.io/react/)
- [Redux](https://github.com/reactjs/redux)
- [Babel](https://babeljs.io/)
- [ES6](http://www.ecma-international.org/ecma-262/6.0/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [PostCSS](https://github.com/postcss/postcss)
- [CSS modules](https://github.com/outpunk/postcss-modules)
- [Rucksack](http://simplaio.github.io/rucksack/docs)
- [React Router Redux](https://github.com/reactjs/react-router-redux)
- [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)


## License

[MIT License](https://opensource.org/licenses/MIT)


----

 &copy; 2016 Keiichiro Ono (UCSD Trey Ideker Lab)
