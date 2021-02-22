<script>
  import { onMount } from "svelte";

  let ref;

  onMount(() => {
    const listItems = ref.nextElementSibling.querySelectorAll("li");
    for (const item of listItems) {
      item.addEventListener("mouseenter", MouseEnter);
    }

    return () => {
      for (const item of listItems) {
        item.removeEventListener("mouseenter", MouseEnter);
      }
    };
  });

  function MouseEnter(e) {
    const index = e.target.dataset && e.target.dataset.index;
    const img = ref.querySelector(`[data-index="${index}"`);

    if (!img) {
      return;
    }

    ref.querySelectorAll("img").forEach(img => {
      img.style.opacity = 0;
    });

    img.style.opacity = 1;
  }
</script>

<div class="carousel" bind:this={ref}>
  <slot/>
</div>
