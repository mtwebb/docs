<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<style global>
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

  p a,
  li a {
    @apply underline;
  }

  .center {
    @apply flex items-center justify-center;
  }

  .carousel {
    @apply grid;

    img {
      @apply col-start-1 row-start-1 invisible;
    }

    img.active {
      @apply visible;
    }
  }

  img.screenshot {
    @apply border shadow-lg container mx-auto mt-8 mb-16;
  }

  img.small {
    @apply m-8;
  }

  .bullet-point {
    @apply flex flex-row items-start mb-2 p-2;

    .circle {
      @apply cursor-pointer shadow transition rounded-full flex-shrink-0 bg-gray-800 mr-2 text-white font-bold w-8 h-8 flex items-center justify-center;
    }

    &.active .circle {
      @apply bg-primary;
    }

    .content {
      @apply mt-1;
    }
  }

  p {
    @apply leading-relaxed mb-2;
  }

  h1 {
    @apply my-4 mb-8 text-4xl font-bold;
  }

  h2 {
    @apply my-2 text-2xl font-bold;
  }

  h3 {
    @apply mt-4 mb-2 text-lg font-bold;
  }

  blockquote {
    @apply bg-yellow-200 px-8 py-2 m-2 my-4 border rounded shadow text-center;
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
