---
text: "Properties"
---

<script>
  import Property from "../../../../editor/src/components/automation/property/Property.svelte";

  const text = {
    name: "Text",
    value: {
      text: "",
    }
  };

  const image = {
    name: "Image",
    value: {
      image: "",
    }
  };

  const number = {
    name: "Number",
    value: {
      number: 0,
    }
  };

  const boolean = {
    name: "Boolean",
    value: {
      boolean: true,
    }
  };
</script>

<style>
  .property {
    @apply my-2 mt-8 w-64;
  }
</style>

# Properties

A **property** is a piece of data that you can attach to a component.
Data from properties can be embedded in the layout of the component.
Properties are also frequently manipulated in [rules](./rules).

---

## Types of properties

<div class="property">
<Property property={text} hoverable={false} selectable={false} tools={false}></Property>
</div>

Title text, descriptions etc. are typical uses of a **text** property.

<div class="property">
<Property property={image} hoverable={false} selectable={false} tools={false}></Property>
</div>

Useful when you want to associate a different image with each component instance
(that you can subsequently pull into the layout).

<div class="property">
<Property property={number} hoverable={false} selectable={false} tools={false}></Property>
</div>

A numeric attribute (a card cost or attack value, for example).

<div class="property">
<Property property={boolean} hoverable={false} selectable={false} tools={false}></Property>
</div>

Boolean properties can be either **true** or **false**. These are typically
used as switches to turn on / off layers or rule conditions.

### Reference

*Not yet implemented*.

### Enum

*Not yet implemented*.

---

## Creating a property

A **property** can be created from a component's overview page.

> work in progress
