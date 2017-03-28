# Summary
A blank React project for creating web-based projects.

**Tools Used:**
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Jest](https://facebook.github.io/jest/docs/tutorial-react.html) for testing (more info coming soon) with the [Enzyme](http://airbnb.io/enzyme/) utility.
* SASS

# How to Use This Repo
Clone or download the source to your computer. `cd` into the directory and install dependencies using `yarn install` at the project root.

### Code Practices
**javascript**
We use ES6.  

**linter**
We use the [standard](https://standardjs.com/) linter for code style enforcement. 

*Note* you will occaisonally see an error about a variable or function being 'undefined' when it is part of a library and not explicity imported. To fix this, add the name of the variable or function to the globals list in `package.json`

**package management**
When possible, we use [Yarn](https://yarnpkg.com/en/) instead of npm.

**Components vs. Containers**
We separate Presentational and Container components. For an explanation, read [this](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.5dz171v91) or watch [this](https://online.reacttraining.com/courses/50507/lectures/760395). 

**styling**
For styling, we cannot use inline styling because you cannot use it to override styles of Bootstrap elements. For this reason, we are using the following tools instead:
* SASS
* Autoprefixer
* [methodology TBD as necessary, e.g. BEM]

**static files**
Only small and/or frequently used static files should exist in the project files. Examples include .ico files, the HCS logo, etc. To import these, use the ES6 import syntax:

```javascript
import bill from '../public/img/billMurray.jpg'

function Main (props) {
  return (
      <img src={bill} alt='bill murray' />
  )
}
```

All other static files should be served from CDNs or elsewhere. 

# Configuring Your Text Editor
The following tools will help you code within the HCS code practices. 

### 1. Code linting with 'standard' ###
Instructions for Sublime Text, Atom, Vim, Emacs, Brackets, and WebStorm are on [here](https://standardjs.com/#install) (scroll down or search for your editor name).

### 2. Babel/JSX syntax highlighting ###
**Sublime Text**  
Read [this](http://gunnariauvinen.com/getting-es6-syntax-highlighting-in-sublime-text/).

**Atom**  
Try [this](https://atom.io/packages/language-babel) (TO-DO: verify if this is necessary and/or a good resource)

**Vim**  
Install [this](https://github.com/pangloss/vim-javascript) and then [this](https://github.com/mxw/vim-jsx). Use the recommended setting `let g:jsx_ext_required=0` in your `.vimrc` file

# Notes
TO-DO
* hot reloading

[TO-DO: License should be stated in `package.json`, but is left blank for now]

Based on code by Tyler McGinnis at reacttraining.com 
<tylermcginnis33@gmail.com> (http://tylermcginnis.com)

https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc

