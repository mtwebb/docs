<script>
  export let section;
  export let level = 0;

  import { isActive } from "@sveltech/routify";
  import { getContext } from "svelte";

  const HideWithDelay = getContext("HideWithDelay");

  let expanded = section.expand || false;
  $: leaf = section.children === undefined;

  if (section.children) {
    expanded = true;
  }
</script>

<style>
  .active {
    @apply bg-gray-300;
  }

  .section {
    @apply my-4;
  }

  .level-0 {
    @apply text-gray-800 uppercase font-bold whitespace-nowrap mb-1 px-4;
  }

  .level-1 {
    @apply text-gray-800 font-bold whitespace-nowrap mb-1 px-4;
  }

  .leaf {
    @apply text-gray-700 rounded leading-loose px-4 hover:bg-gray-200;
  }
</style>

<div
  class:section={!leaf}
  class:indent-1={level === 1}
  class:indent-2={level === 2}>
  {#if section.path}
    <a on:click={HideWithDelay} href={section.path}>
      <div
        class:active={$isActive(section.path)}
        class:level-0={!leaf && level === 0}
        class:level-1={!leaf && level === 1}
        class:leaf>
        {section.text}
      </div>
    </a>
  {:else}
    <div
      class:level-0={!leaf && level === 0}
      class:level-1={!leaf && level === 1}
      class:leaf>
      {section.text}
    </div>
  {/if}

  {#if expanded}
    {#each section.children as child}
      <svelte:self section={child} level={level + 1} />
    {/each}
  {/if}
</div>
