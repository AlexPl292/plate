<template>
  <p style="font-size: 5rem">Examination</p>
  <h3>Please choose the correct pronounciation of the name 'Plate'</h3>
  <div v-html="examText()"></div>
  <button id="chooseThis" class="m-3" type="button" v-if="exam == 2" @click="onCorrect">
    plaːtə
  </button>
  <button
    id="correct"
    type="button"
    v-if="exam != -1 && exam != 2"
    :class="correctCss()"
    @click="onCorrect"
  >
    plaːtə
  </button>
  <button
    type="button"
    v-if="exam != -1"
    :disabled="exam == 4"
    :class="incorrectCss()"
    @click="onIncorrect"
  >
    pleɪt
  </button>
  <button
    id="incorrect"
    type="button"
    v-if="exam == -1"
    class="btn btn-outline-primary m-1"
    @click="reset"
  >
    Restart
  </button>
</template>
<script lang="ts">
import { getDatabase, ref, set, child, get } from 'firebase/database'

export default {
  name: 'exam',
  data() {
    return {
      exam: parseInt(localStorage.getItem('exam_1') || "") || 0,
      rickRolled: localStorage.getItem('exam_1/rickRolled') || false,
      hinted: localStorage.getItem('exam_1/hinted') || false,
      correctAnswered: localStorage.getItem('exam_1/correctAnswered') || false,
      restarted: localStorage.getItem('exam_1/restarted') || false
    }
  },
  methods: {
    // DONE Save to local storage
    // DONE Hide buttons on correct answer
    // DONE Add "retake" button
    // DONE Add css on step with hints
    // DONE Make buttons beautiful with correct margins
    // DONE Send statistic on server
    correctCss() {
      if (this.exam == 2) {
        return 'm-1 btn btn-outline-success btn-lg'
      }
      return 'm-1 btn btn-outline-primary btn-lg'
    },
    incorrectCss() {
      if (this.exam == 2) {
        return 'm-1 btn btn-outline-danger btn-sm opacity-25'
      }
      return 'm-1 btn btn-outline-primary btn-lg'
    },
    reset() {
      this.exam = 0
      this.updateStorage()
      this.updateReset()
    },
    onCorrect() {
      this.exam = -1
      this.updateStorage()
      this.updateCorrectAnswered()
    },
    onIncorrect() {
      if (this.exam == 0) {
        // First wrong answer. Try again
        this.exam = 1
      } else if (this.exam == 1) {
        // Again wrong answer. Show Hints.
        this.exam = 2
        this.updateHinted()
      } else if (this.exam == 2) {
        // You'll be punished
        this.exam = 3
      } else if (this.exam == 3) {
        // Show rick roll
        this.exam = 4
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        this.updateRickRolled()
      }
      this.updateStorage()
    },
    updateRickRolled() {
      if (!this.rickRolled) {
        this.rickRolled = true
        localStorage.setItem('exam_1/rickRolled', "true")
        this.updateUsageOnServer('exam_1', 'rickRolled')
      }
    },
    updateHinted() {
      if (!this.hinted) {
        this.hinted = true
        localStorage.setItem('exam_1/hinted', "true")
        this.updateUsageOnServer('exam_1', 'hinted')
      }
    },
    updateCorrectAnswered() {
      if (!this.correctAnswered) {
        this.correctAnswered = true
        localStorage.setItem('exam_1/correctAnswered', "true")
        this.updateUsageOnServer('exam_1', 'correctAnswered')
      }
    },
    updateReset() {
      if (!this.restarted) {
        this.restarted = true
        localStorage.setItem('exam_1/restarted', "true")
        this.updateUsageOnServer('exam_1', 'restarted')
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
    updateStorage() {
      localStorage.setItem('exam_1', this.exam.toString())
    },
    examText() {
      if (this.exam == -1) {
        return 'Yay! This is a correct answer!'
      }
      if (this.exam == 1) {
        return "No worries. This was a wrong answer. Let's try again"
      }
      if (this.exam == 2) {
        return 'This was a wrong answer again. I added some hints to simplify the question.'
      }
      if (this.exam == 3) {
        return "Okay, this answer IS WRONG. This time you'll be punished if you choose the wrong answer."
      }
      if (this.exam == 4) {
        return 'I told you so. Please select an answer.'
      }
      return '&nbsp;'
    }
  }
}
</script>
<style>
p {
  margin-block-end: 0;
  margin-block-start: 0;
}

#chooseThis {
  position: relative;
  height: 60px;
  width: 200px;
  border: none;
  outline: none;
  color: white;
  background: #111;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
}

#chooseThis:before {
  position: absolute;
  content: '';
  top: -2px;
  left: -2px;
  height: calc(100% + 4px);
  width: calc(100% + 4px);
  border-radius: 5px;
  z-index: -1;
  opacity: 0;
  filter: blur(5px);
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  background-size: 400%;
  transition: opacity 0.3s ease-in-out;
  animation: animate 20s linear infinite;
}

#chooseThis:before {
  opacity: 1;
}

#chooseThis:hover {
  background: none;
}

#chooseThis:hover:before {
  filter: blur(2px);
}

@keyframes animate {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>