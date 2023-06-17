<template>
  <div class="reviews">
    <ReviewCard
      name="Harper Bennett"
      job="Marketing Coordinator"
      review="This course on correct surname pronunciation was an eye-opening experience for me! The
        incredible guidance and attention to detail helped me master the pronunciation, laying the
        foundation for my future growth!"
    />
    <ReviewCard
      name="Olivia Moore"
      job="Digital Marketing Manager"
      review="Thanks to this course, I surpassed my own expectations and conquered what I once believed
          was impossible! The knowledge and skills I gained were instrumental in securing a
          promotion at my job, propelling my career to new heights."
    />
    <ReviewCard
      name="Ethan Walker"
      job="Financial Analyst"
      review="This course has truly ignited a flame of curiosity within me, inspiring me to embark on a
          captivating journey of exploring the intricacies of the world! The knowledge and insights
          gained have set the stage for my future investigations, opening up endless possibilities
          for personal growth and discovery."
    />
  </div>
</template>
<script lang="ts">
import StarRating from 'vue-star-rating'
//declare var require: any
//const StarRating = require('vue-star-rating');

import ReviewCard from '@/views/ReviewCard.vue'

export default {
  name: 'Reviews',
  components: { ReviewCard, StarRating }
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

.reviews {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.reviews .card {
  min-width: 300px;
}

.rating {
  margin-top: auto;
}
</style>