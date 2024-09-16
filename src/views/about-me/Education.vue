<template>
  <div>
    <div class="about-title">University</div>
    <div>
      <div class="box">
        <div class="box-title">Algebra University</div>
        <div>
          Zagreb
          <span class="box-position">Software Engineer</span>
        </div>
        <div class="box-duration">SEPTEMBER 2021 - SEPTEMBER 2024</div>
        <div>
          Title: bacc. ing. comp. (Bachelor of Computer Engineering<!-- ,
          sub-specialization in Software Engineering -->)
          <br />
          <ul>
            <li>
              Received a 100% three-year scholarship for unmatched academic
              excellence, recognizing me as the sole top student eligible for
              this prestigious award.
            </li>
            <li>
              Excelled in all project-based courses by exceeding expectations,
              dockerizing applications and deploying them across Google Cloud,
              Azure, Cloudflare.
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="about-title">High School</div>
    <div>
      <div class="box">
        <div class="box-title">Electrical Engineering Vocational School</div>
        <div>
          Zagreb
          <span class="box-position">Computer technician</span>
        </div>
        <div class="box-duration">SEPTEMBER 2019 - JUNE 2021</div>
        <div>
          <ul>
            <li>Completed high school education with excellent results.</li>
            <li>
              Passed eight distinctive subjects for the transition to a new
              school and a new program.
            </li>
            <li>
              Participated and achieved exceptional results in the coding
              competitions Infokup (software development and algorithms), Inova,
              Reply Code Challenge, and Hacknite.
            </li>
          </ul>
        </div>
      </div>
      <div class="box">
        <div class="box-title">Technical Vocational School Slavonski Brod</div>
        <div>
          Slavonski Brod
          <span class="box-position">
            Computer technician for mechanical engineering
          </span>
        </div>
        <div class="box-duration">SEPTEMBER 2017 - JUNE 2019</div>
        <div>
          Didn't like the program so I transferred to a new school and a new
          city.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ name: "EducationVue" });
</script>
