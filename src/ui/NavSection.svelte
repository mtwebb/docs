<script>
  export let section;
  export let level = 0;

  import { Sort } from "../routes";

  $: sorted = section.children.sort(Sort);
  $: leaf = section.children.length === 0;

  import { isActive } from "@roxi/routify";
  import { getContext } from "svelte";
  import { GetText } from "../routes";
  import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";
  import MdKeyboardArrowDown from "svelte-icons/md/MdKeyboardArrowDown.svelte";

  $: href = section.__file.isPage ? section.path : null;
  $: active = $isActive(href);

  const HideWithDelay = getContext("HideWithDelay");

  $: expanded = $isActive(section.path);

  function OnExpand() {
    expanded = !expanded;
  }
</script>

<style>
  .section {
    @apply mt-4;
  }

  .level-0 {
    @apply pl-4;
  }

  .level-0.noleaf {
    @apply uppercase font-bold text-gray-400 hover:bg-transparent;
  }

  .level-0.leaf {
    @apply text-gray-600;
  }

  .level-1 {
    @apply pl-8;
    @apply text-gray-600;
  }

  .level-2 {
    @apply pl-12;
  }

  .level-3 {
    @apply pl-16;
  }

  .leaf {
    @apply text-sm font-bold border border-transparent text-gray-400;
  }

  .noleaf {
    @apply text-sm font-bold;
  }

  .leaf:hover,
  .noleaf:hover {
    @apply bg-gray-200;
  }

  .leaf.active,
  .leaf.active:hover {
    @apply bg-white text-primary border-gray-200;
  }
</style>

<div class:section={level === 0 && !leaf}>
  <a on:click={leaf ? HideWithDelay : null} {href}>
    <div
      on:click={OnExpand}
      class="p-2 flex flex-row items-center"
      class:active
      class:leaf
      class:noleaf={!leaf}
      class:level-0={level === 0}
      class:level-1={level === 1}
      class:level-2={level === 2}
      class:level-3={level === 3}>
      <div class="w-8 px-2">
        {#if level !== 0 && !leaf}
          {#if expanded}
            <MdKeyboardArrowDown />
          {:else}
            <MdKeyboardArrowRight />
          {/if}
        {/if}
      </div>

      <div>{GetText(section)}</div>
    </div>
  </a>

  {#if level === 0 || expanded}
    {#each sorted as section}
      <svelte:self {section} level={level + 1} />
    {/each}
  {/if}
</div>
