<script>
  import { isActive } from "@sveltech/routify";
  import MenuIcon from "svelte-icons/md/MdMenu.svelte";

  const nav = [
    { path: "/components", text: "Components" },
    { path: "/game", text: "Game" },
    { path: "/play", text: "Play" },
    { path: "/settings", text: "Settings" },
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

  .social {
    @apply w-10;
    opacity: 0.9;
  }

  .social:hover {
    opacity: 1;
  }

  .black {
    @apply text-gray-800;
  }

  .nav {
    @apply transform duration-300 -translate-x-64 fixed top-0 left-0 shadow-lg h-full bg-white z-50 pt-16 select-none;
  }

  .show {
    @apply translate-x-0;
  }

  @screen md {
    .nav {
      @apply duration-0 text-sm z-auto static translate-x-0 shadow-none border-r pt-8;
    }
  }
</style>

<svelte:window on:click={OnClick} />

<div data-testid="nav" data-menu="true" class="nav" class:show>
  <div class="h-full flex flex-col justify-between">
    <div class="flex flex-col px-4 md:px-2 w-full">
      {#each nav as link}
        <a on:click={HideWithDelay} href={link.path}>
          <div
            class="text-gray-700 rounded cursor-pointer h-8 my-1 flex flex-row
            items-center hover:bg-gray-100"
            class:active={$isActive(link.path)}>
            <div class="w-6 mx-2">
              {#if link.icon}
                <svelte:component this={link.icon} />
              {/if}
            </div>

            <div class="mr-10">{link.text}</div>
          </div>
        </a>
      {/each}
    </div>

    <div class="md:hidden w-full center p-4">
      <a href="/">
        <img class="w-12" alt="logo" src="/images/logo-icon.svg" />
      </a>
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
