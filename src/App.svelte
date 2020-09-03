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

  img {
    @apply shadow-lg container mx-auto;
  }

  img.small {
    @apply m-8;
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
