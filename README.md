# from-figma-to-react

Ignite Lab October 2022


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


