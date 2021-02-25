---
text: "Create a Layout"
---

<script>
  import Carousel from "../../../Carousel.svelte";
</script>

# Prototyping

In this tutorial we will create a basic card game and demonstrate how you can use the prototyping features
of Boardgame Lab to spawn dozens of components quickly with minimal effort.

---

## Creating the layout

<Carousel play={false}>
  <screenshot>
    I.click('Components')
    await I.arrowRight('[title="new component"]')
  </screenshot>

  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
    await I.highlight('[data-type="card"]')
    await I.arrowDown('[data-type="card"]')
  </screenshot>

  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
    I.click('[data-type=card]')
    await I.arrowUp('[data-testid=template]:first-child')
  </screenshot>
</Carousel>

1. Create a new component.
1. Choose **Card** as the component type.
1. Click on the new component that we just created.


You will now be taken to your component's dashboard.
Here you will see two faces, one for the **front** of the card
and one for the **back**.

<screenshot>
  I.click('Components')
  I.click('[title="new component"]')
  I.click('[data-type=card]')
  I.click('[data-testid=template]:first-child')
  await I.highlight('.face')
</screenshot>

Click on the front face to start customizing it.
