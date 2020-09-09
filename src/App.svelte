<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "../.routify/routes";
</script>

<style global>
  @import url("https://fonts.googleapis.com/css?family=Karla|Roboto+Mono&display=swap");

  @tailwind base;

  html {
    overflow: hidden;
    height: 100%;
    @apply text-gray-800;
  }

  body,
  main,
  #routify-app {
    height: 100%;
  }

  img.screenshot {
    @apply border shadow-lg container mx-auto mt-8 mb-16;
  }

  img.small {
    @apply m-8;
  }

  p {
    @apply leading-relaxed;
  }

  h1 {
    @apply my-2 text-4xl font-bold;
  }

  h2 {
    @apply my-2 text-xl font-bold;
  }

  h3 {
    @apply mt-4 mb-2 text-lg uppercase font-bold;
  }

  blockquote {
    @apply bg-yellow-200 px-8 py-2 m-2 my-4 border shadow text-center;
  }

  .center {
    @apply flex items-center justify-center;
  }

  @tailwind components;
  @tailwind utilities;

  .color-primary {
    color: #ff8700;
  }
</style>

<Router {routes} />
