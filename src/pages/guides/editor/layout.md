<script>
  import Carousel from "../../../Carousel.svelte";
</script>

## Creating a new component

<Carousel id="create-new-component">
  <screenshot>
    I.click('Components')
    await I.arrow('[title="new component"]', { direction: "right" })
  </screenshot>

  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
  </screenshot>
</Carousel>

1. Click on the **New Component** button at the bottom right of the screen.
1. Choose the type of component that you want to create from the next screen. Learn about the different types of components [here]().
