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
import Exam from '@/views/Exam.vue'
import QuestionTwo from '@/views/QuestionTwo.vue'
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
      liked: localStorage.getItem('like') == 'true',
      showStats: false,
      myStats: {},
      internalMode: localStorage.getItem('itsMe') == 'true'
    }
  },
  methods: {
    onLoaded() {
      console.log(this.delayTimeBase)
      console.log(this.internalMode)
      this.loaded = true
      const delayTimeBase = this.delayTimeBase()
      setTimeout(() => (this.loadedx = true), 2 * delayTimeBase)
      setTimeout(() => (this.plate_var = true), 4 * delayTimeBase)
      setTimeout(() => (this.citata_var = true), 6 * delayTimeBase)
      setTimeout(() => (this.content_var = true), 6 * delayTimeBase)
    },
    delayTimeBase() {
      return this.internalMode ? 0 : 1000
    },
    showMyLikes() {
      if (this.showStats) {
        this.showStats = false
        return
      }
      const db = getDatabase()

      const dbRef = ref(db)
      get(child(dbRef, `likes`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const likes = snapshot.val().likes
            // @ts-ignore
            this.myStats.likes = likes
          } else {
            // @ts-ignore
            this.myStats.likes = -1
          }
          this.showStats = true
        })
        .catch((error) => {
          console.error(error)
        })
      get(child(dbRef, `exam_1`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const exam_1 = snapshot.val()
            // @ts-ignore
            this.myStats.exam_1 = exam_1
          } else {
            // @ts-ignore
            this.myStats.exam_1 = {}
          }
          this.showStats = true
        })
        .catch((error) => {
          console.error(error)
        })
      get(child(dbRef, `exam_2`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const exam_2 = snapshot.val()
            // @ts-ignore
            this.myStats.exam_2 = exam_2
          } else {
            // @ts-ignore
            this.myStats.exam_2 = {}
          }
          this.showStats = true
        })
        .catch((error) => {
          console.error(error)
        })
    },
    like() {
      if (this.liked) return
      this.liked = true
      localStorage.setItem('like', 'true')
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
    },
    likePrinter() {
      return JSON.stringify(this.myStats, null, 2).replace(/\n/g, '<br />')
    },
    enableInternalMode() {
      if (!this.internalMode) {
        this.internalMode = true
        localStorage.setItem('itsMe', 'true')
        alert("Internal mode enabled. Click on 'All rights hopefully reserved' to turn if off.")
      } else {
        this.internalMode = false
        localStorage.setItem('itsMe', 'false')
        alert('Internal mode disabled.')
      }
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

          <Exam :internal="internalMode"/>

          <div class="vr" style="height: 10em"></div>

          <RussianLanguage />

          <div class="vr" style="height: 5em"></div>

          <QuestionTwo :internal="internalMode"/>

          <div class="vr" style="height: 10em"></div>

          <Historical />

          <div class="vr" style="height: 10em"></div>

          <p class="fs-1" @click="showMyLikes">"Knowledge forms a person"</p>
          <div class="vr" style="height: 10em"></div>

          <button type="button" @click="like" :class="likeClass">♡ Like</button>
          <div v-if="showStats">
            <pre v-html="likePrinter()"></pre>
          </div>

          <div class="vr" style="height: 1em"></div>

          <p class="fs-5">Made by Alex Plate</p>
          <p class="fs-6" @click="enableInternalMode">All rights hopefully reserved</p>
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
