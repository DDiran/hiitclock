<style>
/* eslint-disable-next-line css-unused-selector */
:root {
  background-color: #30363d !important;
}
</style>

<script>
import "@fontsource/zilla-slab";
import "@fontsource/montserrat";
import "../app.css";

import { fade } from "svelte/transition";

import Seo from "$lib/components/layout/SEO.svelte";
import Navbar from "$lib/components/layout/Navbar.svelte";
import Footer from "$lib/components/layout/Footer.svelte";
</script>

<Seo />

<Navbar />

<main transition:fade>
  <slot />
</main>

<Footer />
