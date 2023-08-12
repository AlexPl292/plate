<script setup lang="ts">
import 'bootstrap'
import Reviews from '@/views/Reviews.vue'
import MainScreen from '@/views/MainScreen.vue'
import Transcription from '@/views/Transcription.vue'
import TerribleMistake from '@/views/TerribleMistake.vue'
import ExOne from '@/views/ExOne.vue'
import ExTwo from '@/views/ExTwo.vue'
import RussianLanguage from '@/views/RussianLanguage.vue'
import Historical from '@/views/Historical.vue'
import Exam from "@/views/Exam.vue";
</script>
<script lang="ts">
import { getDatabase, ref, set, child, get } from 'firebase/database'

export default {
  data() {
    return {
      loaded: false,
      loadedx: false,
      plate_var: false,
      citata_var: false,
      content_var: false,
      liked: localStorage.getItem('like') == "true",
      showLikes: false,
      amountOfLikes: -1
    }
  },
  methods: {
    onLoaded() {
      this.loaded = true
      setTimeout(() => (this.loadedx = true), 2000)
      setTimeout(() => (this.plate_var = true), 4000)
      setTimeout(() => (this.citata_var = true), 6000)
      setTimeout(() => (this.content_var = true), 6000)
    },
    showMyLikes() {
      if (this.showLikes) {
        this.showLikes = false
        return
      }
      const db = getDatabase()

      const dbRef = ref(db)
      get(child(dbRef, `likes`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const likes = snapshot.val().likes
            this.amountOfLikes = likes
          } else {
            this.amountOfLikes = -2
          }
          this.showLikes = true
        })
        .catch((error) => {
          console.error(error)
        })
    },
    like() {
      if (this.liked) return
      this.liked = true
      localStorage.setItem('like', "true")
      const db = getDatabase()

      const dbRef = ref(db)
      get(child(dbRef, `likes`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const likes = snapshot.val().likes
            console.log('Amount of likes' + likes)
            set(ref(db, 'likes/likes'), likes + 1)
          } else {
            console.log('First like')
            set(ref(db, 'likes/likes'), 1)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  mounted() {
    this.onLoaded()
  },
  computed: {
    likeClass() {
      if (this.liked) {
        return 'btn btn-outline-danger btn-sm'
      } else {
        return 'btn btn-outline-primary btn-sm'
      }
    }
  }
}
</script>

<template>
  <main>
    <!--<div id="demo">-->
    <MainScreen
      :citata_var="citata_var"
      :loaded="loaded"
      :loadedx="loadedx"
      :plate_var="plate_var"
    />
    <div id="content">
      <transition name="content_t">
        <div v-if="content_var" id="content_internal">
          <!--<VerticalSeparator :size="200" />-->
          <img alt="plate" src="@/assets/lizard.png" width="100" height="100" />
          <Reviews />
          <div class="vr" style="height: 5em"></div>
          <!--<VerticalSeparator :size="200" />-->
          <Transcription />
          <div class="vr" style="height: 10em"></div>

          <TerribleMistake />
          <div class="vr" style="height: 10em"></div>

          <ExOne />
          <div class="vr" style="height: 10em"></div>

          <ExTwo />
          <div class="vr" style="height: 10em"></div>

          <Exam/>

          <div class="vr" style="height: 10em"></div>

          <RussianLanguage />

          <div class="vr" style="height: 10em"></div>

          <Historical />

          <div class="vr" style="height: 10em"></div>

          <p class="fs-1" @click="showMyLikes">"Knowledge forms a person"</p>
          <div class="vr" style="height: 10em"></div>

          <button type="button" @click="like" :class="likeClass">♡ Like</button>
          <p v-if="showLikes">{{ amountOfLikes }}</p>

          <div class="vr" style="height: 1em"></div>

          <p class="fs-5">Made by Alex Plate</p>
          <p class="fs-6">All rights hopefully reserved</p>
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

#content {
  /*  display: flex;*/
  /*  justify-content: center;*/
}

#content_internal {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*  align-content: center;*/
  /*  flex-wrap: wrap;*/
}

.vr {
  margin-top: 3em;
  margin-bottom: 3em;
  align-self: auto !important;
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