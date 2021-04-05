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

# Anchor

An **anchor** is a container that can hold objects on top of it. It is meant to stay in
a fixed position and act as a magnet for objects that are dragged to it.

---

## Actions

<Action expression={GetAction("shuffle")}></Action>

Shuffles the objects on the anchor.

<Action expression={GetAction("flip")}></Action>

Flips the entire stack of objects on the anchor.
