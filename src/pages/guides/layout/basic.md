<script>
  import Carousel from "../../../Carousel.svelte";
</script>

## Creating a component

<Carousel>
  <screenshot>
    I.click('Components')
    await I.arrowRight('[title="new component"]')
  </screenshot>

  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
  </screenshot>
</Carousel>

1. Click on the **New Component** button at the bottom right of the screen.
1. Choose the type of component that you want to create from the next screen.


## Cloning a component

<Carousel>
  <screenshot>
    I.click('Components')
    I.pressKey('c')
    await I.arrowLeft('[data-testid=template]')
  </screenshot>

  <screenshot>
    I.rightClick('[data-testid=template]')
    await I.highlight('[data-menuaction=clone]')
  </screenshot>
</Carousel>

1. Right click on the component that you want to clone.
1. Select **Clone** from the menu.

## Deleting a component

<Carousel>
  <screenshot>
    I.click('Components')
    I.pressKey('c')
    await I.arrowLeft('[data-testid=template]')
  </screenshot>

  <screenshot>
    I.rightClick('[data-testid=template]')
    await I.highlight('[data-menuaction=delete]')
  </screenshot>
</Carousel>

1. Right click on the component that you want to delete.
1. Select **Delete** from the menu.
