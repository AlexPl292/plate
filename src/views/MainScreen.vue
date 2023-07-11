<template>
  <div id="main_view">
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
        <p v-if="loadedx">The&nbsp;Great&nbsp;Course</p>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'MainScreen',
  props: {
    citata_var: {},
    loaded: {},
    loadedx: {},
    plate_var: {}
  }
}
</script>
<style>
p {
  margin-block-end: 0;
  margin-block-start: 0;
}

#introducing {
  display: flex;
  justify-content: center;
  font-size: 13rem;
  line-height: calc(1em + max(0.5vh, 4px));
}

@media (max-width: 414px) {
  #introducing {
    font-size: 5rem;
  }
}

@media (min-width: 414px) and (max-width: 768px) {
  #introducing {
    font-size: 6rem;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  #introducing {
    font-size: 10rem;
  }
}

#thegreatcourse {
  display: flex;
  justify-content: center;
  font-size: 20vmin;
  line-height: calc(1em + max(0.5vh, 4px));
}

#plate {
  display: flex;
  justify-content: center;
  font-size: 35vmin;
  margin-block-end: 20px;
  margin-block-start: 20px;
  line-height: calc(1em + max(0.5vh, 4px));
}

#citata {
  display: flex;
  justify-content: flex-end;
  line-height: calc(1em + max(0.5vh, 4px));
}
</style>