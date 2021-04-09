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

> **Actions** are also expressions even though they don't really produce a value.
> They're treated as expressions that produce an **empty** value.

### Literals

Literals are the simplest types of expressions. They simply specify the value that
they produce directly.

<Editor rule={literal}></Editor>

### Operators

<Editor rule={addition}></Editor>

### Sinks

### Control Flow

### Choices

<script>
  import Editor from "../../../../editor/src/components/automation/rule/EphemeralEditor.svelte";

  const literal = {
    "id": "K8v_5CfMq",
    "name": "Rule #1",
    "value": {
      "block": {
        "id": "K8v_5CfMq",
        "steps": {
          "blqgbtZCK": {
            "id": "blqgbtZCK",
            "expression": {
              "id": "z30oV2-vZR",
              "body": {
                "literal": {
                  "integer": 42
                }
              },
            }
          }
        }
      }
    }
  };

  const addition = {
  "id": "K8v_5CfMq",
  "name": "Rule #1",
  "value": {
    "block": {
      "id": "K8v_5CfMq",
      "steps": {
        "Ayd7WZjal": {
          "id": "Ayd7WZjal",
          "expression": {
            "id": "NhzQWU3uIt",
            "body": {
              "op": {
                "binary": {
                  "op": "add",
                  "arg1": {
                    "id": "Z1dVfbupeS",
                    "body": {
                      "literal": {
                        "integer": 2
                      }
                    },
                    "typeinfo": null,
                    "metadata": null
                  },
                  "arg2": {
                    "id": "VQJN04d1s",
                    "body": {
                      "literal": {
                        "integer": 3
                      }
                    },
                    "typeinfo": null,
                    "metadata": null
                  }
                }
              }
            },
            "typeinfo": null,
            "metadata": null
          }
        }
      }
    }
  },
};
</script>
