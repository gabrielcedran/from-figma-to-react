# from-figma-to-react

Ignite Lab October 2022

The storybook for this project can be found in [here](https://gabrielcedran.github.io/from-figma-to-react)


## Vite JS

... 

#### Creating the project with ViteJS

`yarn create vite` or `npm create vite@latest`, name the project, choose the framework you want to use (react, vue, etc) and whether you want to use TS or vanilla JS.

_by default vite does not install the dependencies to allow you to choose the dependency manager you want_


## Tailwind CSS

First add the dependencies `npm install -D tailwindcss postcss autoprefixer` and then initialize tailwindcss `npx tailwindcss init -p` (-p is used to create the postcss config file as well).

Next, instruct tailwind where to find the content files in our application (where the tailwind classes will be located). Inside the `tailwind.config.cjs`, locate the content property and add the entry `'./src/**/*.tsx'`.

Create the `global.css` file and import tailwind's `base`, `utilities` and `components` (refer to commit) and import in the main application component.



`Postcss` is a css bundler to enable tailwind to work within our project

`Autoprefixer` is a library to automatically add the prefixes of functionalities that only work for specific browsers (e.g --webkit, --moz, etc).


_vitejs is integrated with postcss out of the box. Whenever it identifies the `postcss.config.cjs` file in the root path, it automatically does what it has to do_


To ease development, make sure to have `Tailwind CSS IntelliSense` and `PostCSS Language Support` plugins installed in your VSC.


## Story Book

It is a tool that allows developers to preview components in isolation (without the need to go all the way where the given component is rendered and/or applied). It also helps with documentation of the project.


Setup:

`npx sb init --builder @storybook/builder-vite --use-npm` (By default, storybook builder sets up the config for webpack + babel, thus the need to change the default behaviour)


Running:

When the story book is set up, 2 new scripts are added to package.json: 1. to build the storybook (`npm run build-storybook`) 2. to start the storybook in the local environment (`npm run storybook`).


Customisations:

To change the default theme, create a `manager.js` file inside .storybook folder and add the following lines:

```
import {addons} from '@storybook/addons'
import {themes} from '@storybook/theming'

addons.setConfig({
    theme: themes.dark
})
```

To also change the preview to the dark theme, add the following lines to the preview.cjs:

```
  docs: {
    theme: themes.dark
  }
```


### Conditional styles properties with CLSX

Tailwind has some limitation when it comes to conditional / dynamic properties. CLSX library comes to the rescue (other possibilies are windstitch, stitches, etc):

Installation: `npm install --save clsx`

Usage:

```
import {clsx} from 'clsx'

<span className={clsx(
    'text-gray-100 font-sans', 
    {
        'text-xs': size === 'sm',
        'text-md': size === 'md',
        'text-lg': size === 'md',
    })
}>
    {children}
</span>

```

The first parameter are the defaul properties. The second, is an object with the classes to be applied in case the expression is true.


### Radix UI

Radix UI is a lib that provides an array of unstyled components (modals, checkbox, etc). One of its coolest components is the slot component, that allows the creation of react component that enables users to define which html tag they want to use (example the default is a span, but the user might want to use as a paragraph - similarly to what chakra-ui does). 

Installation `npm install @radix-ui/react-slot`.

In a nutshell, what this component does is to pass down all the properties of a given component to its first child.

_For usage, refer to commit._


For checkbox `npm install @radix-ui/react-checkbox`.

### Creating your project's tokens

Tailwind comes with a myriad of tokens out of the box (e.g colours, sizes, spacings, etc). When customising it, you have basically two options (both via the theme property of the tailwind.config.js file): 

1. extend the existing tokens via the extend property
2. replace a token all together, by redefining the token inside the theme configuration

```
  theme: {
    colors: { // this one replaces all colours provided by css. The only colour that will exist in this project is gray.
      'gray-900': '#121214'
    },
    extend: { // this method adds on top of tailwind's pre-determined configs
      fontFamily: {
        sans: 'Inter, sans-serif'
      }
    },
  },
```

### Creating your project's components and stories

After creating a generic component, in order to create the respective story and benefit from the storybook, you have to create a file with suffix `.stories.tsx`
that exports (at least) two things: 1. object that defines the component being documented 2. a variable that contains the properties that need to be passed down to render 
that component (you can have as many as you want of this and they work a variations of that component given the many states it can take up).

As a suggestion the file name should match your component's. Example:

`Text.stories.tsx`:

```
export default {
    title: 'Components/Text', // this is the menu where this component will be shown in storybook ui. This component Text is under menu `Components`, but you could have as many levels as you wanted
    component: Text, // the react component itself
    args: {  // default args that are passed to the component
        children: 'Sample Text.',
        size: 'md'
    },
    argTypes: {  // a list of control args that the users of the storybook ui can change dynamically
        size: {
            options: ['sm', 'md', 'lg'],
            control: {
                type: 'inline-radio'
            }
        }
    }
} as Meta<TextProps>

export const Default: StoryObj<TextProps> = {

} // the dafault variation when no args are passed down - the name default is not mandatory

// below are two variations example
export const Large: StoryObj<TextProps> = {
    args: {
        size: 'lg'
    }
}

export const CustomComponent: StoryObj<TextProps> = {
    args: {
        asChild: true,
        children: (<p>Text with P tag</p>)
    },
    argTypes: {
        children: {
            table: {
                disable: true
            }
        },
        asChild: {
            table: {
                disable: true
            }
        }
    }
}

```


### Deploying the storybook live

There are a couple of options to deploy the storybook live so that other people (including non dev peps) can use. Vercel and Github Page (which is free :)) are just two examples.

To automate the deployment process use the `storybook-deployer` lib:

1. `npm install @storybook/storybook-deployer --save-dev`.
2. create the npm script in the package.json (`"deploy-storybook": "storybook-to-ghpages"` easy, huh?) p.s if using another host, check storybook deployer docs
3. create the GH workflow to enable auto deploy (suggestion `.github/workflows/deploy-docs.yml) - refer to commit
4. update the application context path to match the github's repository name in the `main.csj` file for production (otherwise storybook gets lost as it tries to function on root path)
5. config github pages on github itself after the first successful deploy: settings -> pages -> select option `deploy from a branch` in `source` and `gh-pages` `\(root)` under `Branch` -> Save 

After completing step #5 another build will be triggered to in fact deploy the static pages to gh-pages. When it is done, the storybook pages can be accessed using the link provided by the build console.

_don't forget to add the folder `storybook-static` to .gitignore. This folder with all its content is created when the command build-storybook is executed._
_It creates the whole storybook bundle with static pages to enable them to be hosted in a server_


### Unit tests with storybook interactions

Install the necessary dependencies `npm install @storybook/addon-interactions @storybook/jest @storybook/testing-library @storybook/test-runner -D` and add the entry `"interactionsDebugger": true` in the `features` property and `"@storybook/addon-interactions",` in the `addons` in the `main.cjs`.

The variants have a property named play, that is responsible for defining the automated tests. Example of test definition:

```
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement)

        userEvent.type(canvas.getByPlaceholderText("Digite o seu email"), "don@bob.com")
        userEvent.type(canvas.getByPlaceholderText("****"), "12345")

        userEvent.click(canvas.getByText("Entrar na plataforma"))

        await waitFor(() => {
            return expect(canvas.getByText("Login Realizado!")).toBeInTheDocument()
        })
    }
```

It is possible to play the tests step by step on the storybook ui.


### Figma notes

To create a new frame based on a pre-determined screen size or device key `F` and choose the preferred option (desktop, phone, tablet, etc).

To add new text key `T` and rectangle `R`.

When moving components:

- Keep `shift` pressed to keep that component aligned either vertically or horizontally to its original position
- Press `option` and hover other elements to see the distance between them
- Still with `option` pressed, it is possible to move the selected element using the keyboard's arrow. To move 10 pixels a time, also press `shift`


To group components press `command` + `g`. When components are grouped it is possibe to enable the option `auto layout` to treat them similarly to css's property display flex.


It is possible to use external plugins to do so either (1) right click an element and select the option `pluging` -> `find more plugins...` or (2) do so via the main menu (top left corner).
Examples of plugings: `Phospor Icon` and `Color Styleguide`.

*To resize icons and keep the proportion, do so holding key `k`*

_Remember to work with paddings that are multiple of 4_


##### Naming standard colours / creating colours library

After a couple of screens and components have been created, you can see a summary of all the used colours by clicking on the main frame. They will be shown as hexadecimal.

To name that colour, click on the Style button near the hexadecimal (4 dots forming a square button) and on the plus button. If you name the colour and add a suffix `/{number}`, figma groups the same name colours to allow the creation of different shades (e.g grey/100, grey/400).


##### Reusable components

In a separate page create the component that you want to reuse (e.g a button). Right click and select the option `create component`.

When a component is created, it is possible to receive properties so that it becomes "dynamic".

Dynamic texts:

1. to receive the text that a button component should display (and make it reusable), select the component, click on the `add properties` button select the option `text`. Give a name to that property (e.g value, placeholder). Go to the element that should use that property (e.g a text within the component) and on the content box select the assign button and choose the created property (e.g value).
2. to make it easier to use, name the component on the left area accordingly
3. where you want to use, open the top menu -> resources (or shift + i) -> select the component. To change the text, select the component and looking for the property you want to change.


Variants (e.g to enable hovered or focused versions):

1. add a new variant property
2. expand the component purple box
3. duplicate the component that you want the new variation, move it within the purple box so you can see both and change it
4. give the new variant property name (e.g hover)
5. When using the component in the project, just toggle the wanted version on the component's properties  


### Extras

#### Accessibility add-on

Storybook supports add-ons to ease different tasks. One of the most famous add-ons is accessibility add-on (storybook/addon-a11y). 
This addon provides reports concerning components accessibility (good practices violation and warnings). 

Installation:

- `npm install @storybook/addon-a11y`
- add the entry `"@storybook/addon-a11y"` in the addons property in the `main.cjs` file


#### Useful links

https://transform.tools/

https://worldvectorlogo.com/
