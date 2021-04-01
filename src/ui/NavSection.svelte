<script>
  export let section;
  export let level = 0;

  import { Sort } from "../routes";

  $: sorted = section.children.sort(Sort);
  $: leaf = section.children.length === 0;

  import { url, isActive } from "@roxi/routify";
  import { getContext } from "svelte";
  import { GetText } from "../routes";
  import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";
  import MdKeyboardArrowDown from "svelte-icons/md/MdKeyboardArrowDown.svelte";

  $: href = section.__file.isPage ? $url(section.path) : null;
  $: active = $isActive(href);

  const HideWithDelay = getContext("HideWithDelay");

  $: expanded = $isActive(section.path);

  function OnExpand() {
    expanded = !expanded;
  }
</script>

<style>
  .leaf.active,
  .leaf.active:hover {
    @apply bg-gray-200;
  }

  .section {
    @apply my-4;
  }

  .level-0 {
    @apply text-gray-400 whitespace-nowrap hover:bg-gray-200;
  }

  .level-1 {
    @apply text-gray-600 whitespace-nowrap hover:bg-gray-200;
  }

  .level-0 {
    @apply pl-4;
  }

  .level-1 {
    @apply pl-8;
  }

  .level-2 {
    @apply pl-12;
  }

  .level-3 {
    @apply pl-16;
  }

  .leaf {
    @apply text-sm font-bold text-gray-500 hover:bg-gray-200;
  }

  .noleaf {
    @apply uppercase font-bold text-gray-400 text-sm;
  }

  .icon {
    @apply w-6;
  }
</style>

<div>
  <a on:click={leaf ? HideWithDelay : null} {href}>
    <div
      on:click={OnExpand}
      class="p-2 flex flex-row items-center mb-2"
      class:active
      class:leaf
      class:noleaf={!leaf}
      class:level-0={level === 0}
      class:level-1={level === 1}
      class:level-2={level === 2}
      class:level-3={level === 3}>
      <div class="w-8 px-2">
        {#if !leaf}
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

  {#if expanded}
    {#each sorted as section}
      <svelte:self {section} level={level + 1} />
    {/each}
  {/if}
</div>
