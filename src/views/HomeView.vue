<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import VerticalSeparator from '@/views/VerticalSeparator.vue'
import 'bootstrap'
import StarRating from 'vue-star-rating'
</script>
<script lang="ts">
export default {
  data() {
    return {
      loaded: false,
      loadedx: false,
      plate_var: false,
      citata_var: false,
      content_var: false
    }
  },
  methods: {
    onLoaded() {
      this.loaded = true
      setTimeout(() => (this.loadedx = true), 2000)
      setTimeout(() => (this.plate_var = true), 4000)
      setTimeout(() => (this.citata_var = true), 6000)
      setTimeout(() => (this.content_var = true), 6000)
    }
  },
  mounted() {
    this.onLoaded()
  }
}
</script>

<template>
  <main>
    <!--<div id="demo">-->
    <div id="introducing">
      <transition name="fade">
        <p v-if="loaded">Introducing</p>
      </transition>
    </div>
    <div id="plate">
      <transition name="plate_t">
        <p v-if="plate_var">Plate</p>
      </transition>
      <p v-if="!plate_var">&nbsp;</p>
    </div>
    <div id="citata">
      <transition name="citata_t">
        <div v-if="citata_var">
          <p>
            "Embrace the power of learning, for it transforms the seeds of curiosity into the
            blossoming tree of wisdom."
          </p>
          <p>Jason Statham</p>
        </div>
      </transition>
      <div v-if="!citata_var">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    </div>
    <div id="thegreatcourse">
      <transition name="fadex">
        <p v-if="loadedx">The Great Course</p>
      </transition>
    </div>
    <div id="content">
      <transition name="content_t">
        <div v-if="content_var">
          <VerticalSeparator :size="200" />
          <div class="reviews">
            <div class="card" style="width: 20rem">
              <div class="card-body">
                <h5 class="card-title">Harper Bennett</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Marketing Coordinator</h6>
                <p class="card-text">
                  This course on correct surname pronunciation was an eye-opening experience for me!
                  The incredible guidance and attention to detail helped me master the
                  pronunciation, laying the foundation for my future growth!
                </p>
                <div class="rating">
                  <star-rating
                    :rating="5"
                    :read-only="true"
                    :show-rating="true"
                    :star-size="30"
                  ></star-rating>
                </div>
              </div>
            </div>
            <div class="card" style="width: 20rem">
              <div class="card-body">
                <h5 class="card-title">Olivia Moore</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Digital Marketing Manager</h6>
                <p class="card-text">
                  Thanks to this course, I surpassed my own expectations and conquered what I once
                  believed was impossible! The knowledge and skills I gained were instrumental in
                  securing a promotion at my job, propelling my career to new heights.
                </p>
                <div class="rating">
                  <star-rating
                    :rating="5"
                    :read-only="true"
                    :show-rating="true"
                    :star-size="30"
                  ></star-rating>
                </div>
              </div>
            </div>
            <div class="card" style="width: 20rem">
              <div class="card-body">
                <h5 class="card-title">Ethan Walker</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Financial Analyst</h6>
                <p class="card-text">
                  This course has truly ignited a flame of curiosity within me, inspiring me to
                  embark on a captivating journey of exploring the intricacies of the world! The
                  knowledge and insights gained have set the stage for my future investigations,
                  opening up endless possibilities for personal growth and discovery.
                </p>
                <div class="rating">
                  <star-rating
                    :rating="5"
                    :read-only="true"
                    :show-rating="true"
                    :star-size="30"
                  ></star-rating>
                </div>
              </div>
            </div>
          </div>
          <div id="transcription">
            <p>plaːtə</p>
          </div>
          <p>This is the only right phonetic transcription of this surname</p>
        </div>
      </transition>
    </div>
    <!--</div>-->
  </main>
</template>

<style>
p {
  margin-block-end: 0;
  margin-block-start: 0;
}

#introducing {
  display: flex;
  justify-content: center;
  font-size: 10rem;
}

#thegreatcourse {
  display: flex;
  justify-content: center;
  font-size: 10rem;
}

#plate {
  display: flex;
  justify-content: center;
  font-size: 25rem;
  margin-block-end: 20px;
  margin-block-start: 20px;
}

#citata {
  display: flex;
  justify-content: flex-end;
}

.card-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#transcription {
  display: flex;
  justify-content: center;
  font-size: 10rem;
  /*  margin-block-end: 20px;*/
  /*  margin-block-start: 20px;*/
}

#content {
  /*  display: flex;*/
  /*  justify-content: center;*/
}

.reviews {
  display: flex;
  justify-content: space-around;
}

.rating {
  margin-top: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fadex-enter-active,
.fadex-leave-active {
  transition: opacity 3s ease;
}

.fadex-enter-from,
.fadex-leave-to {
  opacity: 0;
}

.plate_t-enter-active,
.plate_t-leave-active {
  transition: opacity 5s ease;
}

.plate_t-enter-from,
.plate_t-leave-to {
  opacity: 0;
}

.citata_t-enter-active,
.citata_t-leave-active {
  transition: opacity 1s ease;
}

.citata_t-enter-from,
.citata_t-leave-to {
  opacity: 0;
}

.content_t-enter-active,
.content_t-leave-active {
  transition: opacity 1s ease;
}

.content_t-enter-from,
.content_t-leave-to {
  opacity: 0;
}

.vertical-line {
  display: inline;
  font-size: 0;
  line-height: 0;
  border-left: 1px solid black; /* Adjust the width and color using the border-left property */
  height: 100px; /* Adjust the height to your desired length */
}
</style>
