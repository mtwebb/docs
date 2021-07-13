---
text: "Concepts"
index: 0
---

# Concepts

### Component

A blueprint for a game object like a card or tile.
A component can have multiple instances, each created from the
same blueprint, but differing from each other based on the parameters
used to create them.
Components have layouts that determine what they look like.
They can hold data via [properties](/guides/automation/properties).
You may also attach [rules](/guides/automation/rules) to components.

### Property

A piece of data that can be attached to a component, player or the game itself.
For example, the cost of a card is typically a property that is attached to the card.
The individual values of this property can then be customized for different instances
of the card.

### Rule

A series of steps that describe how a particular game situation is meant to be played out.
It might describe what happens when a particular card is played, or describe the overall
flow of the game.
Rules are assembled using a powerful visual scripting system that doesn't require writing any code.

### Trait

A trait is like a partially fleshed out component. It is also a collection of properties, rules
and layout. It can be used to store things that are shared across multiple components.
For example, your game might have cards and hex tiles that both have a cost property
and an associated rule that determines how the object is purchased. One option would
be to define these things in both places, but a better approach would be to define
them in a trait and then import the trait in both components.

> Traits are advanced features that may not be needed for simpler games.
