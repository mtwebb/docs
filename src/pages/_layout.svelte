<script>
  import Nav from "../ui/Nav.svelte";
  import { beforeUrlChange, afterPageLoad } from "@sveltech/routify";

  let loading = false;
  let loadingTimeout = null;
  $beforeUrlChange(() => {
    loadingTimeout = setTimeout(() => {
      loading = true;
    }, 250);
    return true;
  });
  $afterPageLoad(() => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      loadingTimeout = null;
    }
    loading = false;
  });
</script>

<svelte:head>
  <title>Boardgame Lab</title>
</svelte:head>

<main>
  <div class="w-full h-full flex flex-col">
    <div
      style="min-height: 3rem"
      class="flex flex-row items-center bg-gray-800 w-full z-10">
      <a href="/">
        <img
          class="hidden md:block w-40 ml-2"
          alt="logo"
          src="/images/logo.svg" />
      </a>
    </div>

    <div class="w-full h-full flex flex-row">
      <Nav />

      <div
        on:contextmenu|preventDefault
        class="relative w-full h-full flex-grow overflow-y-auto p-8">
        <slot />
      </div>
    </div>
  </div>

  {#if loading}
    <div class="fixed z-50 top-0 w-full h-12 center">
      <div class="p-1 px-2 rounded bg-gray-200 text-xs">loading...</div>
    </div>
  {/if}
</main>
