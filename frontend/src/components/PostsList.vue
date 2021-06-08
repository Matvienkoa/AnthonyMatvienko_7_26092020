<template>
      <div v-for="post in getPosts" :key="post.id" class="post">
        <div id="user">
          <span v-if="post.user.imageUrl != null" id="avatar-card">
            <img id="avatar" :src="post.user.imageUrl" />
          </span>
          <h1> {{ post.user.username }} a écrit:</h1>
        </div>
        <router-link :to="{name: 'post', params: {id: post.id}}">
          <div id="message">
            <h2> {{ post.title }} </h2>
            <img :src="post.imageUrl" />
            <div id="message-content">
              <p> {{ post.content }} </p>
            </div>
            <div id="infos-post">
              <span id="moment">Le {{ moment(post.createdAt).format('LLLL') }} </span>
              <span id="number-comments"> {{ post.comments.length }} Commentaires</span>
            </div>
          </div>
        </router-link>
        <div id="like">
          <i @click="Liked(post)" class="far fa-thumbs-up"></i>
          <i v-if="post.likes.userId == $store.state.user.userId" class="fas fa-thumbs-up" id="liked"></i>
        </div>
      </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'PostsList',
    data() {
      return {
        like: 1,
        moment: moment,
      }
    },
    methods: {
      ...mapActions(["getAllPosts"]),
      Liked(post) {
        this.$store.dispatch('addLike', {
          likes: this.like,
          userId: this.$store.state.user.userId,
          postId: post.id,
        })
      },
    },
    computed: {
      ...mapGetters(["getPosts"])
    },
    created: function () {
        this.getAllPosts();
    }
}
</script>

<style scoped>
  .post{
    border-radius: 30px;
    box-shadow: 0px 2px 3px rgb(126, 184, 223) ;
    width: 80%;
    max-width: 700px;
    margin: auto;
    margin-bottom: 30px;
    padding-bottom: 10px;
  }
  #user{
    height: 120px;
    padding-top: 15px;
    border-radius: 30px 30px 0 0;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    background-image: linear-gradient(0deg, rgb(255, 255, 255),rgb(183, 79, 85));
  }
  #user h1{
    font-size: 1.5rem;
    margin-left: 20px;
    font-weight: bold;
  }
  #avatar-card{
    width: 80px;
    height: 80px;
    margin-left: 20px;
    border-radius: 50px;
    overflow: hidden;
  }
  #avatar{
    width: 100px;
    object-fit: cover;
    object-position: center;
  }
  .post a{
    text-decoration: none;
    color: black;
  }
  #message img{
    width: 90%;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  #message h2{
    margin-bottom: 20px;
  }
  #message-content{
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    background-color: rgb(231, 241, 252);
    border-radius: 10px;
    padding: 5px;
  }
  #message-content p{
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left: 15px;
    text-align: start;
  }
  #infos-post{
    display: flex;
    justify-content: space-between;
    margin-left: 35px;
  }
  #number-comments{
    text-align: end;
    margin-right: 30px;
    margin-bottom: 10px;
  }
  #like{
    text-align: end;
  }
  i{
    margin-right: 30px;
    font-size: 1.3rem;
    cursor: pointer;
  }
  #liked{
    color: rgb(28, 118, 236);
  }

  @media screen and (max-width: 500px) {
      #infos-post{
        display: flex;
        flex-direction: column;
      }
      #moment{
        text-align: start;
        margin-bottom: 10px;
        margin-top: 10px;
      }
  }
</style>
