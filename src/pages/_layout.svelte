<script>
  import Sidebar from "../ui/Sidebar.svelte";
  import Nav from "../ui/Nav.svelte";
  import Prev from "../ui/Prev.svelte";
  import Next from "../ui/Next.svelte";
  import { page, beforeUrlChange, afterPageLoad } from "@roxi/routify";
  import DiGithubBadge from "svelte-icons/di/DiGithubBadge.svelte";

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
  <title>User Guide | Boardgame Lab</title>
</svelte:head>

<main>
  <div class="w-full h-full flex flex-col">
    <div
      style="min-height: 3rem"
      class="flex flex-row items-center justify-between bg-gray-800 w-full z-10">
      <a href="/">
        <img
          class="hidden md:block w-40 ml-2"
          alt="logo"
          src="/images/logo.svg" />
      </a>

      <h2 class="text-gray-100 mr-4">User Guide</h2>
    </div>

    <div class="relative w-full h-full flex flex-row">
      <Nav />

      <div class="relative w-full h-full flex-grow overflow-y-auto">
        <div
          id="content"
          class="absolute container px-8 md:px-32 py-8 min-h-full">
          <slot />

          <!-- Prev / Next navigation -->
          <div class="grid grid-flow-col gap-4 mt-24">
            {#if $page.prev}
              <Prev page={$page.prev} />
            {/if}
            {#if $page.next}
              <Next page={$page.next} />
            {/if}
          </div>

          <hr class="my-8" />

          <!-- GitHub link -->
          <div class="w-full center">
            <a
              target="_blank"
              rel="noreferrer"
              href={'https://github.com/boardgamelab/docs/tree/master/src/pages' + $page.path + '.md'}>
              <div
                class="flex flex-row items-center hover:bg-gray-200 p-1 px-3 rounded">
                <div class="w-6 mr-2 text-gray-500">
                  <DiGithubBadge />
                </div>

                <div>Edit on GitHub</div>
              </div>
            </a>
          </div>
        </div>

        <Sidebar />
      </div>
    </div>

    {#if loading}
      <div class="fixed z-50 top-0 w-full h-12 center">
        <div class="p-1 px-2 rounded bg-gray-200 text-xs">loading...</div>
      </div>
    {/if}
  </div>
</main>
