---
text: "Concepts"
---

# Concepts

### Component

A game object that you can interact with during play (a card, for example).
A Component can have multiple instances, each slightly different from the other.
Components have layouts that determine what they look like.
They can hold data via Properties. You may also attach Rules to components.

### Property

A piece of data that can be attached to a component, player or the game itself.
For example, the cost of a card is typically a property that is attached to the card.
The individual values of this property can then be customized for different instances
of the card.

### Rule

Rules are series of steps that describe how a particular game situation is meant to be played out.
They might describe what happens when a particular card is played, or describe the overall
flow of the game.
Rules are assembled using a powerful visual scripting system that doesn't require writing any code.

### Trait

A Trait is like a partially fleshed out component. It is also a collection of Properties, Rules
and layout. It can be used to store things that are shared across multiple Components.
For example, your game might have cards and hex tiles that both have a cost Property
and an associated Rule that determines how the object is purchased. One option would
be to define these things in both places, but a better approach would be to define
them in a Trait and then import the Trait in both components.

> Traits are advanced features that may not be needed for simpler games.
