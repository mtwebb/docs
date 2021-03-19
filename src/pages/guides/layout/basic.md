# Layout

Every component has a **layout** that can be customized using the built-in editor.

## Creating a component

<carousel>
  <screenshot>
    I.click('Components')
    await I.arrowRight('[title="new component"]')
  </screenshot>

  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
  </screenshot>
</carousel>

1. Click on the **New Component** button at the bottom right of the screen.
1. Choose the type of component that you want to create from the next screen.


## Cloning a component

<carousel>
  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
    I.click('[data-type=card]')
    await I.arrowLeft('[data-testid=template]')
  </screenshot>

  <screenshot>
    I.rightClick('[data-testid=template]')
    await I.highlight('[data-menuaction=clone]')
  </screenshot>
</carousel>

1. Right click on the component that you want to clone.
1. Select **Clone** from the menu.

## Deleting a component

<carousel>
  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
    I.click('[data-type=card]')
    await I.arrowLeft('[data-testid=template]')
  </screenshot>

  <screenshot>
    I.rightClick('[data-testid=template]')
    await I.highlight('[data-menuaction=delete]')
  </screenshot>
</carousel>

1. Right click on the component that you want to delete.
1. Select **Delete** from the menu.
