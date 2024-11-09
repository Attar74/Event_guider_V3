<script setup lang="ts">
import FaqUserCard from '~/components/Faq/UserCard.vue'

const questions = [
  {
    qaTitle: 'What Kind of venues you provided ?',
    date: '2 days',
    answer: 'Mohamed Alaa'
  },
  {
    qaTitle:
      'The request to add a hall has been approved, and you can now practice your activity ?',
    date: '2 days',
    answer: 'Ahmed Alaa'
  },
  {
    qaTitle: 'What Kind of venues you provided ?',
    date: '2 days',
    answer: 'Ahmed Alaa'
  },
  {
    qaTitle:
      'The request to add a hall has been approved, and you can now practice your activity ?',
    date: '2 days',
    answer: 'Mohamed Alaa'
  }
]
</script>
<template>
  <div class="overflow-y-scroll h-[99vh]">
    <section class="mt-10">
      <FaqUserCard
        v-for="item in questions"
        :key="item.qaTitle"
        :qa-title="item.qaTitle"
        :date="item.date"
        :answer="item.answer"
        show-archive
        show-delete
        show-copy
        show-star
      />
    </section>
  </div>
</template>
