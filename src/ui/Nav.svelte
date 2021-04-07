<script>
  import { setContext } from "svelte";
  import NavSection from "./NavSection.svelte";
  import MenuIcon from "svelte-icons/md/MdMenu.svelte";
  import { Sort } from "../routes";
  import { layout } from "@roxi/routify";

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

  let items = [];

  $: {
    items = [
      {
        title: "Overview",
        path: "/index",
        children: [],
        __file: {
          isPage: true,
        },
      },
      ...$layout.children.sort(Sort),
    ];
  }
</script>

<style>
  .black {
    @apply text-gray-800;
  }

  .nav {
    @apply flex-shrink-0 bg-gray-100 transform duration-300 -translate-x-64 fixed top-0 left-0 shadow-lg h-full bg-white z-50 py-16 select-none overflow-y-auto w-64;
  }

  .show {
    @apply translate-x-0;
  }

  @screen md {
    .nav {
      @apply duration-0 z-auto static translate-x-0 shadow-none pt-12;
    }
  }
</style>

<svelte:window on:click={OnClick} />

<div data-testid="nav" data-menu="true" class="nav" class:show>
  {#each items as section}
    <NavSection {section} />
  {/each}
</div>

<div
  on:click={ToggleShow}
  bind:this={hamburger}
  data-hamburger="true"
  data-menu="true"
  class="fixed md:hidden z-50 top-0 left-0 cursor-pointer m-4 text-gray-100">
  <div class:black={show} class="w-6">
    <MenuIcon />
  </div>
</div>
