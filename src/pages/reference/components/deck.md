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

# Deck

A **deck** is formed the moment a card is stacked on top of another card.
You can think of it as a sort of ephemeral container that exists until
all the cards in it are removed.

---

## Actions

<Action expression={GetAction("shuffle")}></Action>

Shuffles the deck.

<Action expression={GetAction("flip")}></Action>

Flips the deck over.
