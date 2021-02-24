---
text: "Concepts"
---

# Concepts

### Component

A game object that you can interact with during play (a card, for example).
A Component can have multiple instances, each slightly different from the other.
Components have layouts that determine what they look like.
They can hold data via Properties. You may also customize how a component behaves
during play by giving it a Behavior.

### Property

A piece of data that can be attached to a component, player or the game itself.
For example, the cost of a card is typically a property that is attached to the card.
The individual values of this property can then be customized for different instances
of the card.

### Behavior

Every component has a default set of Behaviors. For example, a deck can be shuffled.
However, games often require further customization. You might want a deck to be replenished
and shuffled once it runs out, say. These sorts of complex interactions are created by attaching
new Behaviors to Components. Note that you don't have to write any code to create a new Behavior.

### Trait

A Trait is like a partially fleshed out component. It is also a collection of Properties, Behaviors
and layout. It can be used to store things that are shared across multiple Components.
For example, your game might have cards and hex tiles that both have a cost Property
and an associated Behavior that determines how the object is purchased. One option would
be to define these things in both places, but a better approach would be to define
them in a Trait and then import the Trait in both components.

> Traits are advanced features that may not be needed for simpler games.
