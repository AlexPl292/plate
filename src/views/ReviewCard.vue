<template>
  <div class="card" style="width: 20rem">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ job }}</h6>
      <p class="card-text">
        {{ review }}
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
</template>
<script lang="ts">
import StarRating from 'vue-star-rating'

export default {
  props: ['name', 'job', 'review'],
  name: 'ReviewCard',
  components: { StarRating }
}
</script>
<style>
p {
  margin-block-end: 0;
  margin-block-start: 0;
}

.card-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.rating {
  margin-top: auto;
}
</style>