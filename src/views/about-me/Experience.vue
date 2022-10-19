<template>
  <div>
    <div class="about-title">General Experience</div>
    <div id="general-experience">
      I'm a versatile front-end developer with 3+ years of experience developing
      complex web apps and specializing in SPA development utilizing Vue
      ecosystem. Apart from the <em>"package.json"</em> about me, here are a few
      more technologies I worked with:
      <ul>
        <li style="padding: 10px 0">
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
        <li>XAMPP/PHP, SSMS/SQL</li>
        <li>Wordpress</li>
        <li>Bootstrap</li>
        <li>jQuery</li>
      </ul>
    </div>
    <div class="about-title">Work Experience</div>
    <div>
      <div class="box">
        <div class="box-title">
          CARNET - Croatian Academic and Research Network,
        </div>
        <div>
          Zagreb
          <span class="box-position">Full-stack Developer</span>
        </div>
        <div class="box-duration">JULY 2020 - SEPTEMBER 2020</div>
        <div>
          First-ever high-school student who worked for CARNET. Starting from
          scratch, I was primarily building the front-end of a PHP application
          with vanilla JS. The application is intended for CARNET Helpdesk and
          is used for the organization of working hours, employee
          administration, and salary calculations.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ name: "ExperienceVue" });
</script>
