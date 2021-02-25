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
You'll notice that the card already has some layout elements.

<Carousel play={false}>
  <screenshot of="#workspace">
    I.click('Components')
    I.click('[title="new component"]')
    I.click('[data-type=card]')
    I.click('[data-testid=template]:first-child')
    I.click('.face')
    await I.highlight('[data-tool=image]')
    await I.arrowLeft('[data-tool=image]')
  </screenshot>

  <screenshot of="#workspace">
    I.click('Components')
    I.click('[title="new component"]')
    I.click('[data-type=card]')
    I.click('[data-testid=template]:first-child')
    I.click('.face')
    I.click('[data-tool=image]')
    I.fillField('[data-widget=x]', 65)
    I.fillField('[data-widget=y]', 340)
    I.fillField('[data-widget=width]', 500)
    I.fillField('[data-widget=height]', 500)
    await I.highlight('[data-widget=image]')
    await I.arrowRight('[data-widget=image]')
  </screenshot>

  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
    I.click('[data-type=card]')
    I.click('[data-testid=template]:first-child')
    I.click('.face')
    I.click('[data-tool=image]')
    I.click('[data-widget=image]')
  </screenshot>

  <screenshot of="#workspace">
    I.click('Components')
    I.click('[title="new component"]')
    I.click('[data-type=card]')
    I.click('[data-testid=template]:first-child')
    I.click('.face')
    I.click('[data-tool=image]')
    I.fillField('[data-widget=x]', 65)
    I.fillField('[data-widget=y]', 340)
    I.fillField('[data-widget=width]', 500)
    I.fillField('[data-widget=height]', 500)
    I.click('[data-widget=image]')
    I.click('[alt="Asset 16"]')
    await I.arrowLeft('[data-close=true]')
  </screenshot>
</Carousel>

1. Click on the **Image** tool to add a new image.
1. Click on the **Asset Browser** to select the image that you want to add.
1. Select an image from the one of the assets. Boardgame Lab comes with hundreds of stock images that you can use in your prototypes before you develop art for your game.
1. Click on the close button (or press **Escape**) to exit the layout editor.
