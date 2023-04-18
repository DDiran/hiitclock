<script lang="ts">
import { TITLE, DESCRIPTION, KEYWORDS, AUTHOR } from "$lib/constants";

let title = TITLE;

$: {
  if (process.env.NODE_ENV !== "production") {
    title = `Dev | ${title}`;
  } else {
    title = TITLE;
  }
}

const umamiAnalytics =
  process.env.NODE_ENV === "production"
    ? `
          async
          defer
          data-website-id="402dc1d7-1b95-4e23-b10c-fc0942a8419e"
          src="https://analytics.ddlawson.com/umami.js"
      `
    : "";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={DESCRIPTION} />
  <meta name="keywords" content={KEYWORDS} />
  <meta name="author" content={AUTHOR} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://justhiit.it/" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={DESCRIPTION} />
  <meta
    property="og:image"
    content="https://justhiit.it/JustHIITit_Social_Share.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://justhiit.it/" />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={DESCRIPTION} />
  <meta
    property="twitter:image"
    content="https://justhiit.it/JustHIITit_Social_Share.png" />

  {@html `<script ${umamiAnalytics}></script>`}
</svelte:head>
