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
  }

  body,
  main,
  #routify-app {
    height: 100%;
  }

  img.screenshot {
    @apply border shadow-lg container mx-auto;
  }

  img.small {
    @apply m-8;
  }

  h1 {
    @apply text-2xl;
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
