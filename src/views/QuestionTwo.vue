<template>
  <p style="font-size: 5rem">Test Question</p>
  <h3>Choose the correct ending</h3>
  <h3>Плат_</h3>
  <div>
    <div v-if="!answered" class="container">
      <div
        @mouseover="onHover"
        class="option running m-1 me-3"
        :class="runningClass"
        @click="onAlmostRight"
      >
        <p v-if="!hide" class="fs-1">е</p>
        <p v-if="showKnife" class="fs-1 knife">🗡</p>
      </div>
      <div class="option m-1 ms-3" @click="onRight">
        <p class="fs-1">э</p>
      </div>
    </div>
    <div style="display: flex; align-items: center; flex-direction: column" v-else>
      <h4>Yay, this is a right answer!</h4>
      <button
        type="button"
        class="btn btn-outline-primary m-1"
        style="align-self: center"
        @click="reset"
      >
        Restart
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { child, get, getDatabase, ref, set } from 'firebase/database'

export default {
  name: 'QuestionTwo',
  props: {
    internal: Boolean,
  },
  data() {
    return {
      state: 0,
      size: 100,
      top: 0,
      right: 0,
      jumpMap: new Map(),
      hide: false,
      showKnife: false,
      runningClass: '',
      skipReallyAngryHover: 0,
      stopPlay: false,
      answered: false,
      correctAnswered: localStorage.getItem('exam_2/correctAnswered') || false,
      almostCorrectAnswered: localStorage.getItem('exam_2/almostCorrectAnswered') || false,
      restarted: localStorage.getItem('exam_2/restarted') || false
    }
  },
  computed: {
    elementTop: function () {
      return this.top.toString() + 'px'
    },
    elementRight: function () {
      return this.right.toString() + 'px'
    },
    elementSize: function () {
      return this.size.toString() + 'px'
    }
  },
  watch: {
    showKnife(newValue) {
      if (newValue) {
        document.body.classList.add('cursor-knife')
      } else {
        document.body.classList.remove('cursor-knife')
      }
    }
  },
  methods: {
    updateCorrectAnswer() {
      if (this.internal) return
      if (!this.correctAnswered) {
        this.correctAnswered = true
        localStorage.setItem('exam_2/correctAnswered', 'true')
        this.updateUsageOnServer('exam_2', 'correctAnswered')
      }
    },
    updateAlmostCorrectAnswer() {
      if (this.internal) return
      if (!this.almostCorrectAnswered) {
        this.almostCorrectAnswered = true
        localStorage.setItem('exam_2/almostCorrectAnswered', 'true')
        this.updateUsageOnServer('exam_2', 'almostCorrectAnswered')
      }
    },
    updateRestarted() {
      if (this.internal) return
      if (!this.restarted) {
        this.restarted = true
        localStorage.setItem('exam_2/restarted', 'true')
        this.updateUsageOnServer('exam_2', 'restarted')
      }
    },
    updateUsageOnServer(generalPath: string, path: string) {
      const db = getDatabase()

      const dbRef = ref(db)
      get(child(dbRef, generalPath))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const hinted = snapshot.val()[path]
            if (hinted) {
              console.log('Hinted: ' + hinted)
              set(ref(db, generalPath + '/' + path), hinted + 1)
              return
            }
          }
          console.log('First ' + path)
          set(ref(db, generalPath + '/' + path), 1)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    onAlmostRight() {
      if (this.stopPlay) {
        this.answered = true
        this.updateAlmostCorrectAnswer()
      }
    },
    onRight() {
      this.answered = true
      this.updateCorrectAnswer()
    },
    reset() {
      this.top = 0
      this.right = 0
      this.state = 0
      this.hide = false
      this.runningClass = ''
      this.showKnife = false
      this.stopPlay = false
      this.answered = false
      this.updateRestarted()
    },
    onHover() {
      console.log('Hover. ' + this.state)

      if (this.jumpMap.size == 0) {
        this.initiate()
      }

      if (this.runningClass == 'really-angry') {
        if (this.skipReallyAngryHover >= 4) {
          this.skipReallyAngryHover = 0
        } else {
          this.skipReallyAngryHover += 1
          return
        }
      }

      for (let [key, value] of this.jumpMap) {
        if (this.state <= key) {
          this.top = value.top
          this.right = value.right
          this.hide = value.hide
          this.runningClass = value.clazz
          this.showKnife = value.knife
          this.stopPlay = value.stopPlay

          if (this.stopPlay) {
            return
          }

          this.state = this.state + 1
          return
        }
      }

      this.top = 0
      this.right = 0
      this.state = 0
      this.hide = false
      this.runningClass = ''
      this.showKnife = false
    },
    initiate() {
      this.jumpMap.clear()

      this.addValue(0, 100)
      this.addValue(100, 0)
      this.addValue(200, 0)
      this.addValue(200, 100)
      this.addValue(200, -100)
      this.addValue(200, -200)
      this.addValue(200, -300)
      this.addValue(200, -100)
      this.addValue(200, 0)
      this.addValue(200, -100)
      this.addValue(200, 0)
      this.addValue(200, -100)
      this.addValue(200, 0)
      this.addValue(200, -100)
      this.addValue(200, 0)
      this.addValue(200, -100)

      this.addValue(0, 0)
      this.addValue(-116, 10, true)
      this.addValue(0, 0, false, 'angry-shake')
      this.addValue(0, 100, false, '', true)
      this.addValue(0, 200, false, '', true)
      this.addValue(100, 200, false, '', true)
      this.addValue(200, 200, false, '', true)
      this.addValue(300, 200, false, '', true)

      this.addValue(0, 0, false, 'really-angry')
      this.addValue(0, 0, false, 'rolled', false, true)
    },
    addValue(
      top: number,
      right: number,
      hide: boolean = false,
      clazz: string = '',
      knife: boolean = false,
      stopPlay: boolean = false
    ) {
      this.jumpMap.set(this.jumpMap.size, {
        top: top,
        right: right,
        hide: hide || false,
        clazz: clazz || '',
        knife: knife || false,
        stopPlay: stopPlay || false
      })
    }
  }
}
</script>
<style>
.option {
  border: 1px solid black;
  width: v-bind('elementSize');
  height: v-bind('elementSize');
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.running {
  position: relative;
  top: v-bind('elementTop');
  right: v-bind('elementRight');
}

.container {
  display: flex;
  justify-content: center;
}

.cursor-knife {
  cursor: url('@/assets/knife.png'), auto;
}

.angry-shake {
  animation-name: angry-shake;
  animation-duration: 0.4s;
  transform-origin: 50% 50%;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes angry-shake {
  0% {
    transform: translate(2px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(0px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(2px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(2px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

@keyframes knife-attac {
  0% {
    transform: translate(0px, 0px) rotate(180deg);
  }
  10% {
    transform: translate(1px, 2px) rotate(179deg);
  }
  20% {
    transform: translate(10px, -20px) rotate(181deg);
  }
  30% {
    transform: translate(1px, 2px) rotate(180deg);
  }
  40% {
    transform: translate(10px, -20px) rotate(181deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(179deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(180deg);
  }
  70% {
    transform: translate(2px, 1px) rotate(179deg);
  }
  80% {
    transform: translate(-1px, -5px) rotate(130deg);
  }
  90% {
    transform: translate(2px, 2px) rotate(220deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(179deg);
  }
}

@keyframes really-angry {
  0% {
    transform: translate(0px, 0px);
  }
  10% {
    transform: translate(300px, 0px);
  }
  20% {
    transform: translate(-300px, 0px);
  }
  30% {
    transform: translate(0px, 200px) rotate(360deg);
  }
  40% {
    transform: translate(100px, -200px) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translate(-200px, 300px);
    opacity: 0;
  }
  60% {
    transform: translate(100px, 300px);
    opacity: 0;
  }
  70% {
    transform: translate(0px, -100px);
    opacity: 1;
  }
  80% {
    transform: translate(200px, 100px);
  }
  90% {
    transform: translate(-200px, -100px);
  }
  100% {
    transform: translate(100px, 100px);
  }
}

.knife {
  animation-name: knife-attac;
  animation-duration: 1s;
  transform-origin: 50% 50%;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.really-angry {
  animation-name: really-angry;
  animation-duration: 3s;
  transform-origin: 50% 50%;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.rolled {
  transform: rotate(180deg);
}
</style>
