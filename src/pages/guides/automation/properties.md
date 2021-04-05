---
text: "Properties"
---

<script>
  import Property from "../../../../editor/src/components/automation/property/Property.svelte";

  const text = {
    name: "Text",
    type: "text",
  };

  const image = {
    name: "Image",
    type: "image",
  };

  const number = {
    name: "Number",
    type: "number",
  };

  const boolean = {
    name: "Boolean",
    type: "boolean",
  };
</script>

# Properties

A **property** is a piece of data that you can attach to a component.
Data from properties can be embedded in the layout of the component.
Properties are also frequently manipulated in [rules](./rules).

---

## Types of properties

<div class="my-2 mt-8 w-64">
<Property property={text} hoverable={false} selectable={false} showTools={false}></Property>
</div>

Title text, descriptions etc. are typical uses of a **text** property.

<div class="my-2 mt-8 w-64">
<Property property={image} hoverable={false} selectable={false} showTools={false}></Property>
</div>

Useful when you want to associate a different image with each component instance
(that you can subsequently pull into the layout).

<div class="my-2 mt-8 w-64">
<Property property={number} hoverable={false} selectable={false} showTools={false}></Property>
</div>

A numeric attribute (a card cost or attack value, for example).

<div class="my-2 mt-8 w-64">
<Property property={boolean} hoverable={false} selectable={false} showTools={false}></Property>
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
