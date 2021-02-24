<script>
  export let pathPrefix = [];
  export let section;
  export let level = 0;

  import { isActive } from "@sveltech/routify";
  import { getContext } from "svelte";

  const HideWithDelay = getContext("HideWithDelay");

  const path = [...pathPrefix, section.path];
  const href = "/" + path.filter((p) => p).join("/");

  let expanded = section.expand || false;
  $: leaf = section.children === undefined;

  $: {
    expanded = section.children && (section.expand || $isActive(href));
  }
</script>

<style>
  .active {
    @apply border-r-4 border-primary bg-gray-200;
  }

  .section {
    @apply my-4;
  }

  .level-0 {
    @apply text-gray-100 p-1 bg-gray-600 rounded uppercase font-bold whitespace-nowrap mb-1 px-4;
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
    <a on:click={HideWithDelay} {href}>
      <div
        class:active={$isActive(href)}
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
      <svelte:self section={child} level={level + 1} pathPrefix={path} />
    {/each}
  {/if}
</div>
