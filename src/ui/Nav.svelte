<script>
  import { isActive } from "@sveltech/routify";
  import MenuIcon from "svelte-icons/md/MdMenu.svelte";

  const nav = [
    { heading: "Getting Started" },
    { path: "/index", text: "Overview" },
    { path: "/concepts", text: "Concepts" },
    null,
    { heading: "Tutorials" },
    { path: "/tutorial", text: "Basic" },
    null,
    { heading: "Editor" },
    { path: "/layout", text: "Layout" },
    { path: "/layers", text: "Layers" },
    { path: "/data", text: "Data" },
    null,
    { heading: "Playtesting" },
    { path: "/interface", text: "Interface" },
    { path: "/multiplayer", text: "Multiplayer" },
    null,
    { heading: "Automation" },
    { path: "/properties", text: "Properties" },
    { path: "/behaviors", text: "Behaviors" },
    { path: "/traits", text: "Traits" },
    { path: "/attributes", text: "Turn Orders" },
  ];

  let hamburger;
  let show = false;

  function IsHamburgerVisible() {
    return getComputedStyle(hamburger).display !== "none";
  }

  function ToggleShow() {
    if (!IsHamburgerVisible()) {
      return;
    }

    show = !show;
  }

  function OnClick(e) {
    if (!IsHamburgerVisible()) {
      return;
    }

    if (!e.target.closest("[data-menu=true]")) {
      show = false;
    }
  }

  function HideWithDelay() {
    if (!IsHamburgerVisible()) {
      return;
    }

    setTimeout(() => {
      show = false;
    }, 500);
  }
</script>

<style>
  .active,
  .active:hover {
    @apply bg-gray-300;
  }

  .heading {
    @apply text-gray-800 uppercase font-bold whitespace-nowrap mb-1 px-4;
  }

  .black {
    @apply text-gray-800;
  }

  .nav {
    @apply bg-gray-100 px-4 transform duration-300 -translate-x-64 fixed top-0 left-0 shadow-lg h-full bg-white z-50 py-16 select-none overflow-y-auto;
  }

  .show {
    @apply translate-x-0;
  }

  @screen md {
    .nav {
      @apply duration-0 z-auto static translate-x-0 shadow-none border-r pt-12;
    }
  }
</style>

<svelte:window on:click={OnClick} />

<div data-testid="nav" data-menu="true" class="nav" class:show>
  <div class="h-full flex flex-col justify-between">
    <div class="flex flex-col px-4 md:px-2 w-full">
      {#each nav as link}
        {#if !link}
          <div class="h-6" />
        {:else if link.heading}
          <div class="heading">{link.heading}</div>
        {:else}
          <a on:click={HideWithDelay} href={link.path}>
            <div
              class:active={$isActive(link.path)}
              class="text-gray-700 hover:bg-gray-200 rounded leading-loose px-4">
              {link.text}
            </div>
          </a>
        {/if}
      {/each}
    </div>
  </div>
</div>

<div
  on:click={ToggleShow}
  bind:this={hamburger}
  data-hamburger="true"
  data-menu="true"
  class="absolute md:hidden z-50 top-0 left-0 cursor-pointer m-3 ml-4
  text-gray-100">
  <div class:black={show} class="w-6">
    <MenuIcon />
  </div>
</div>
