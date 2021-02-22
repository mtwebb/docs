<script>
  import { onMount } from "svelte";

  let ref;
  let itemCount = null;
  let current = null;
  let interval = null;

  onMount(() => {
    // If there is a list that follows this, then listen for events
    // there and activate the appropriate <img> here based on that.
    const listItems = ref.nextElementSibling.querySelectorAll("li");
    itemCount = listItems.length;

    for (const item of listItems) {
      item.addEventListener("mouseenter", Activate);
      item.addEventListener("click", Activate);
    }

    ActivateIndex(0);

    interval = setInterval(Tick, 2000);

    return () => {
      clearInterval(interval);

      for (const item of listItems) {
        item.removeEventListener("mouseenter", Activate);
        item.removeEventListener("click", Activate);
      }
    };
  });

  function Tick() {
    if (!itemCount) {
      return;
    }

    current = (current + 1) % itemCount;
    ActivateIndex(current);
  }

  function ActivateIndex(index) {
    const img = ref.querySelector(`[data-index="${index}"`);
    if (!img) {
      return;
    }
    ref.querySelectorAll("img").forEach(img => {
      img.classList.remove("active");
    });
    img.classList.add("active");

    const activeListItem = ref.nextElementSibling.querySelector(`li[data-index="${index}"]`);
    if (!activeListItem) {
      return;
    }
    ref.nextElementSibling.querySelectorAll("li").forEach(li => li.classList.remove("active"));
    activeListItem.classList.add("active");

    current = index;
  }

  function Activate() {
    clearInterval(interval);
    const index = this.dataset && this.dataset.index;
    ActivateIndex(index);
  }
</script>

<div class="carousel" bind:this={ref}>
  <slot/>
</div>
