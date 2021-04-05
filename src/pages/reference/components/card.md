---
---

<script>
  import Action from "../../../../editor/src/components/automation/rule/expression/Action.svelte";

  function GetAction(name) {
    return {
      body: {
        action: {
          action: {
            [name]: null,
          }
        }
      }
    }
  }
</script>

# Card

Cards can be dragged into a player's hand. They also stack over each other to form a [deck](./deck).

---

## Actions

<Action expression={GetAction("flip")}></Action>

Flips the card over.

<Action expression={GetAction("rotate")}></Action>

Rotates the card by 45 degrees.
