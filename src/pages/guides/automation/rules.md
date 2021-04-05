---
text: "Rules"
---

# Rules

Boardgame Lab uses a powerful visual scripting system that allows creating rules
without writing any code. Rules can be attached to individual components
(you can attach a rule to a card that determines what happens when that card is played, for example).
Rules also describe what happens on a player's turn and the general flow of the
game (turn orders, phases etc.).

## Expressions

Rules are assembled as series of steps, each containing an **expression**. An expression
is something that produces a value. Expressions could be simple arithmetic operations
or complex transformations on data coming from a [property](./properties). For example,
**2 + 3** is an expression that produces the value **5**.

Expressions may also contain **actions** that are performed on the board (shuffling
a deck, for example).

> Yes, **actions** are also expressions even though they don't really produce a value.
> They're treated as expressions producing an **empty** value.

### Literals

Literals are the simplest types of expressions. They simply specify the value that
they produce directly.

### Operators

### Sinks

### Control Flow

### Choices
