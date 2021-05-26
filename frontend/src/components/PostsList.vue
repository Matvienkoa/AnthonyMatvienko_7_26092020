<template>
    <div class="posts">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue'

export default {
    name: 'PostsList',
    components: {
      PostCard
    },
    computed: {
      posts() {
        return this.$store.state.posts;
      }
    },
    mounted: function () {
        this.$store.dispatch("getAllPosts");
    },
}

</script>

<style scoped>
</style>
