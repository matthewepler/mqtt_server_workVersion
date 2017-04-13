# Summary
A blank React project for creating web-based projects.

**Tools Used:**
* [create-react-app](https://github.com/facebookincubator/create-react-app) - see documentation [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc) for more detail.
* [Jest](https://facebook.github.io/jest/docs/tutorial-react.html) for testing (more info coming soon) with the [Enzyme](http://airbnb.io/enzyme/) utility.
* [SASS/SCSS](http://sass-lang.com/)
* [React Bootstrap](https://react-bootstrap.github.io/) only when necessary

# How to Use This Repo
Clone or download the source to your computer. `cd` into the directory and install dependencies using `yarn install` at the project root.

To start the app, run `yarn run start`

If you get an error related to `node-sass`, make sure you've installed `node-sass` globally (`npm install -g node-sass`) and then run the command `npm rebuild node-sass` within the project's root directory.

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
For styling, we cannot use inline styling because you cannot use it to override styles of Bootstrap elements. Also, you cannot implement media queries directly with inline styling. For this reasons, we are using the following tools instead:
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

# Notes/Issues
[TO-DO: License should be stated in `package.json`, but is left blank for now]

Images: [TO-DO, verify this is a best practice]
Image resizing for device size and resolution costs a lot of CPU and battery power. Try to use [HTML responsive images](https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/).

Based on code by Tyler McGinnis at reacttraining.com 
<tylermcginnis33@gmail.com> (http://tylermcginnis.com)

