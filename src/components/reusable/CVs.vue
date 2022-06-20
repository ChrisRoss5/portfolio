<template>
  <div class="cvs">
    <a
      v-for="i in ['en', 'hr']"
      :key="i"
      :href="'CV-' + i + '.pdf'"
      target="_blank"
    >
      <component :is="'CvSVG'" />
      {{ "CV-" + i }}
    </a>
  </div>
</template>
