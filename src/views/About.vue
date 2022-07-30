<template>
  <div id="about">
    <router-view />
    <div id="general-experience">
      I'm a versatile front-end developer with 3+ years of experience developing
      complex web apps and specializing in SPA development utilizing Vue
      ecosystem. Apart from the <em>"package.json"</em> about me, here are a few
      more technologies I worked with:
      <ul>
        <li style="padding-bottom: 10px">
          <a
            href="https://googlecloudcheatsheet.withgoogle.com/"
            target="_blank"
          >
            Google Cloud Platform</a
          >:
          <ul>
            <li>Storage: Cloud Storage</li>
            <li>Data Analytics: GA4, Data Studio, BigQuery</li>
            <li>Maps Platform: JS API, Geocoding, Roads, Places</li>
            <li>Firebase: Auth, Realtime Database, Hosting, Functions</li>
          </ul>
        </li>
        <li>Github Actions/Workflows</li>
        <li>Chrome Developer (Apps/Extensions/Themes)</li>
        <li>PayPal Developer</li>
        <li>XAMPP/PHP</li>
        <li>SSMS/SQL</li>
        <li>Wordpress</li>
        <li>jQuery</li>
      </ul>
    </div>
    <div id="work-experience">
      <div>
        <div class="work-title">
          CARNET - Croatian Academic and Research Network,
        </div>
        <div class="work-place">
          Zagreb
          <span class="work-position">Full-stack Developer</span>
        </div>
        <div class="work-duration">JULY 2020 - SEPTEMBER 2020</div>
        <div class="work-description">
          First-ever high-school student who worked for CARNET. Starting from
          scratch, I was primarily building the front-end of a PHP application
          with vanilla JS. The application is intended for CARNET Helpdesk and
          is used for the organization of working hours, employee
          administration, and salary calculations.
        </div>
      </div>
      <div>
        <div class="work-title">Placeholder</div>
        <div class="work-place">
          Place
          <span class="work-position">Position</span>
        </div>
        <div class="work-duration">Duration</div>
        <div class="work-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean augue
          mauris, elementum et ex et, pellentesque malesuada sem. Praesent id
          augue non mauris facilisis posuere. Aliquam purus diam, lobortis ac
          dui blandit, ornare iaculis ligula. Quisque dignissim enim libero,
          quis mattis libero dignissim a. Nunc scelerisque magna at augue
          accumsan, ac tristique felis faucibus. Integer facilisis ultrices dui,
          vitae fringilla ex molestie ut. Donec aliquam massa quis erat vehicula
          condimentum. Nullam blandit nibh pharetra ligula tincidunt sodales.
          Donec sed feugiat dolor, ac pretium metus.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutVue",
});
</script>

<style lang="scss">
#about {
  display: flex;
  gap: 2rem;
  text-align: justify;
  line-height: 1.5rem;
  overflow: auto;
  & > div {
    flex: 1 1 0;
  }
}
#general-experience {
  position: sticky;
  top: 0;
  padding: 2% 0 0 5vw;
}
#work-experience {
  padding: 0 5vw 2% 0;
  & > div {
    border-radius: 6px;
    background: var(--b-025);
    padding: 1rem;
    margin: 1rem 0;
  }
}
.work-title {
  font-weight: bold;
}
.work-position {
  font-style: italic;
  &::before {
    content: " — ";
  }
}
.work-duration {
  color: var(--a-05);
  padding: 1rem 0;
}
</style>
