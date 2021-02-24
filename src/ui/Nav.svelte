<script>
  import { setContext } from "svelte";
  import { isActive } from "@sveltech/routify";
  import NavSection from "./NavSection.svelte";
  import MenuIcon from "svelte-icons/md/MdMenu.svelte";
  import routes from "../routes";

  setContext("HideWithDelay", HideWithDelay);

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
  .black {
    @apply text-gray-800;
  }

  .nav {
    @apply bg-gray-100 px-4 transform duration-300 -translate-x-64 fixed top-0 left-0 shadow-lg h-full bg-white z-50 py-16 select-none overflow-y-auto w-64;
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
      {#each routes as section}
        <NavSection {section} />
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
