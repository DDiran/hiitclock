<style>
:root {
  background-color: #30363d;
}
</style>

<script>
import "@fontsource/zilla-slab";
import "@fontsource/montserrat";
import "../app.css";

import Seo from "$lib/components/layout/SEO.svelte";
import Navbar from "$lib/components/layout/Navbar.svelte";
import Footer from "$lib/components/layout/Footer.svelte";
</script>

<Seo />

<Navbar />

<slot />

<Footer />
