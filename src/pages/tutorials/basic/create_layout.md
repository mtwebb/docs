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
    await I.arrow('[title="new component"]', { direction: "right" })
  </screenshot>

  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
    await I.arrow('[data-type="card"]', { direction: "down" })
  </screenshot>
</Carousel>

1. Create a new component.
1. Choose **Card** as the component type.
