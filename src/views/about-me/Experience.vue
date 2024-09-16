<template>
  <div>
    <div class="about-title">General Experience</div>
    <div id="general-experience">
      I'm a software engineer with 5+ years of experience developing successful,
      highly-rated applications with large user bases, fueled by creative
      problem-solving skills and a proactive mindset. Passionate about Vue.js
      and building feature-rich SPAs using modern web technologies.
      <br />
      <br />
      My primary Cloud platform is Google Cloud
      <a href="https://googlecloudcheatsheet.withgoogle.com/" target="_blank">
        (see cheatsheet)</a
      >. I worked with:
      <ul>
        <li style="padding: 10px 0 0">
          Compute: Cloud Run, Cloud Functions, App Engine
        </li>
        <li>Storage: Cloud Storage</li>
        <li>Database: Cloud SQL, Cloud Firestore</li>
        <li>
          Data Analytics: BigQuery, BigQuery DTS, Looker Studio (formerly Data
          Studio)
        </li>
        <li>AI/ML: Vertex AI</li>
        <li>Identity: Cloud Identity, Identity Platform, Cloud IAM</li>
        <li>
          Firebase: Hosting, Auth, Realtime Database, Firestore, Storage,
          Functions, ML Kit
        </li>
        <li>Workspace: Sheets API</li>
        <li>Maps Platform: JS API, Geolocation API, Roads API, Places API</li>
        <li>
          Developer tools: Cloud SDK, Cloud Shell, Cloud Logging, Cloud
          Monitoring
        </li>
      </ul>

      Other Cloud platforms I worked with:
      <ul>
        <li>
          Cloudflare: Full DNS management (connected with Namecheap), Pages
          (hosting), Workers (functions), Wrangler CLI
        </li>
        <li>
          Azure: App Service, App registration, Entra ID (formerly Active
          Directory), SQL Server, SQL Database
        </li>
        <li>GitHub: Actions, Pages (hosting), Codespaces (IDE), gh CLI</li>
      </ul>
      <!-- I'm a versatile front-end developer with 5+ years of experience developing
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
        <li>Chrome Developer (Apps/Extensions/Themes)</li>
        <li>PayPal Developer</li>
        <li>Tailwind, Bootstrap</li>
        <li>.NET (aspnet, windows forms)</li>
        <li>Github Actions/Workflows</li>
        <li>XAMPP/PHP, SSMS/SQL</li>
        <li>Wordpress</li>
      </ul> -->
    </div>
    <div class="about-title">Work Experience</div>
    <div>
      <div class="box">
        <div class="box-title">
          CARNET - Croatian Academic and Research Network
        </div>
        <div>
          Zagreb
          <span class="box-position">Full-stack Software Engineer Intern</span>
        </div>
        <div class="box-duration">JULY 2020 - SEPTEMBER 2020</div>
        <div>
          <ul>
            <li>
              Made history as CARNET's first high-school student employee.
            </li>
            <li>
              Led the development of a PHP application for CARNET Help-desk,
              improving work scheduling, staff management, and salary
              calculations alongside a team member.
            </li>
            <li>
              Utilized XAMPP, integrating PostgreSQL for database management,
              and Phabricator/Git for version control.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ name: "ExperienceVue" });
</script>
