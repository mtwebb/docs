<script>
  export let page;

  import MdArrowBack from "svelte-icons/md/MdArrowBack.svelte";
  import { GetText } from "../routes";
</script>

<style>
  .box {
    @apply transition duration-150 p-3 border rounded flex flex-row items-center justify-between shadow;
  }

  .box:hover {
    @apply border-primary bg-gray-100;
  }

  .title {
    @apply transition duration-150 text-gray-600 font-bold;
  }

  .box:hover .title {
    @apply text-primary;
  }
</style>

{#if page.__file.isPage}
  <a href={page.path}>
    <div class="box">
      <div class="w-6">
        <MdArrowBack />
      </div>

      <div>
        <div class="text-gray-400 text-sm">Prev</div>
        <div class="title">{GetText(page)}</div>
      </div>
    </div>
  </a>
{/if}
