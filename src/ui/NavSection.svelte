<script>
  export let section;
  export let level = 0;

  import { isActive } from "@roxi/routify";
  import { getContext } from "svelte";
  import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";
  import MdKeyboardArrowDown from "svelte-icons/md/MdKeyboardArrowDown.svelte";

  const HideWithDelay = getContext("HideWithDelay");

  const href = section.path;

  let expanded = section.expand || false;
  $: leaf = section.children === undefined;

  $: {
    expanded =
      level === 0 || (section.children && (section.expand || $isActive(href)));
  }

  function OnClick() {
    expanded = !expanded;
  }
</script>

<style>
  .leaf.active {
    @apply border-r-4 border-primary bg-gray-200;
  }

  .section {
    @apply my-4;
  }

  .level-0 {
    @apply text-gray-100 p-1 bg-gray-600 rounded uppercase font-bold whitespace-nowrap mb-1 pl-6;
  }

  .level-1 {
    @apply text-gray-800 font-bold whitespace-nowrap mb-2 px-4 p-1 rounded hover:bg-gray-200;
  }

  .leaf {
    @apply text-gray-700 rounded leading-loose px-4 hover:bg-gray-200;
  }

  .icon {
    @apply w-6;
  }

  .indent {
    @apply pl-4;
  }
</style>

<div class:section={!leaf}>
  <div>
    {#if leaf && section.path}
      <a on:click={HideWithDelay} {href}>
        <div
          class:active={$isActive(href)}
          class:level-0={!leaf && level === 0}
          class:level-1={!leaf && level === 1}
          class:leaf>
          <div>{section.text}</div>
        </div>
      </a>
    {:else}
      <div
        on:click={level !== 0 ? OnClick : null}
        class="flex flex-row items-center justify-between"
        class:level-0={!leaf && level === 0}
        class:level-1={!leaf && level === 1}
        class:leaf>
        <div>{section.text}</div>

        {#if level !== 0 && !leaf}
          <div class="icon">
            {#if expanded}
              <MdKeyboardArrowDown />
            {:else}
              <MdKeyboardArrowRight />
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <div class:indent={level === 1}>
    {#if expanded}
      {#each section.children as child}
        <svelte:self section={child} level={level + 1} />
      {/each}
    {/if}
  </div>
</div>
