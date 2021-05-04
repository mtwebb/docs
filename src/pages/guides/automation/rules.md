---
text: "Rules"
---

# Rules

Boardgame Lab uses a powerful visual scripting system that allows for the creation of rules
without writing any code. Rules can be attached to individual components
(you can attach a rule to a card that determines what happens when that card is played, for example).
They also describe the general flow of the game like what happens on a player's turn.

## Expressions

Rules consist of a number of **expressions**. An expression
is something that produces a value. Expressions could be simple arithmetic operations
or complex transformations on data coming from a [property](./properties). For example,
the following expression produces the value **3**.

<Expression expression={expr}></Expression>

This expression is composed of a number of nested inner expressions (hover over the
expression to see them highlighted). In order to evaluate the outer expression,
the rule interpreter methodically replaces inner expressions with their values
until the outer expression can be calculated.

## Side Effects

Expressions may also contain **actions** that are performed on the board as the
expression is evaluated.

> **Actions** are also expressions even though they don't really produce a value.
> They're treated as expressions that produce an **empty** value.

### Literals

Literals are the simplest types of expressions. They simply specify the value that
they produce directly.

<Expression expression={literal1}></Expression>

<Expression expression={literal2}></Expression>

### Sinks

### Control Flow

### Choices


<Editor rule={rule} debug={true}></Editor>

<script>
  import Editor from "../../../../editor/src/components/automation/rule/EphemeralEditor.svelte";
  import Expression from "../../../../editor/src/components/automation/rule/ExpressionViewer.svelte";

  const literal1 = {
    "id": "expr-1",
    "body": {
      "literal": {
        "integer": 5
      }
    }
  };

  const literal2 = {
    "id": "expr-1",
    "body": {
      "literal": {
        "text": "some text"
      }
    }
  };

  const expr = {
    "id": "lYpV7NwnC",
    "isRoot": false,
    "body": {
      "op": {
        "binary": {
          "op": "add",
          "arg1": {
            "id": "expr-1",
            "isRoot": false,
            "body": {
              "literal": {
                "integer": 1
              }
            }
          },
          "arg2": {
            "id": "SHldoAkiF",
            "isRoot": false,
            "body": {
              "op": {
                "binary": {
                  "op": "divide",
                  "arg1": {
                    "id": "expr-1arg2",
                    "isRoot": false,
                    "body": {
                      "literal": {
                        "integer": 4
                      }
                    }
                  },
                  "arg2": {
                    "id": "expr-1arg2arg2",
                    "isRoot": false,
                    "body": {
                      "literal": {
                        "integer": 2
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const rule = {
    "id": "id",
    "name": "",
    "value": {
      "block": {
        "id": "block-1",
        "isRoot": true,
        "body": {
          "block": {
            "steps": {
              "1": {
                "id": "step-1",
                "expression": {
                  "id": "expr-1",
                  "body": "empty",
                }
              }
            }
          }
        }
      }
    }
  };
</script>
