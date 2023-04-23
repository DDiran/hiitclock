<script lang="ts">
export let data;
const { title, date, Content } = data;
</script>

<div class="container mx-auto mb-auto mt-10 flex-grow">
  <div class="flex flex-col gap-9">
    <h1 class="text-6xl text-center leading-1 font-bold font-serif text-white">
      {title}
    </h1>
    <p class="text-xl text-center leading-7 opacity-70 font-sans text-white">
      Published: {date}
    </p>
    <article
      class="prose prose-lg text-white opacity-80 font-sans mx-auto prose-headings:text-white prose-headings:font-semibold prose-ul:text-white prose-li:text-white mb-12">
      <Content />
    </article>
  </div>
</div>
