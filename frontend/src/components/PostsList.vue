<template>
  <div>
    <div v-if="getPosts.length === 0" id="nopost">
      Il n'y a pas encore de Publication pour le moment...<br/>
      Allez-y, Lancez la discussion !!!
    </div>
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
            <p id="content-post"> {{ post.content }} </p>
          </div>
          <div id="infos-post">
            <span id="moment">Le {{ moment(post.createdAt).format('LLLL') }} </span>
          </div>
        </div>
      </router-link>
      <div id="options">
        <div id="number-comments"> {{ post.comments.length }} Commentaires</div>
        <div id="like">
          <span @click="Liked(post)"> {{ post.likes.length }} J'aime <i id="Ilike" class="far fa-thumbs-up"></i></span>
          <span @click="disLiked(post)">Je n'aime plus <i id="IDislike" class="fas fa-times"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axiosConfig from '../axios';
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
      ...mapActions(["getAllPosts", "getUserInfos"]),
      Liked(post) {
        const likeIndex = post.likes.findIndex(like => 
          like.userId === this.$store.state.user.userId);
        if (likeIndex == -1) {
          axiosConfig.post(`/posts/${post.id}/like`, {
            likes: this.like,
            userId: this.$store.state.user.userId,
          })
          .then(() => {
            this.getAllPosts();
          })
        }
      },
      disLiked(post) {
        post.likes.forEach(like => {
          if(like.userId === this.$store.state.user.userId) {
            axiosConfig.delete(`posts/${post.id}/like/${like.id}`, like)
            .then(() => {
             this.getAllPosts();
            })
          }
        });
      },
    },
    computed: {
      ...mapGetters(["getPosts"]),
    },
    created: function () {
        this.getAllPosts();
        this.getUserInfos();
    }
}
</script>

<style scoped>
  #nopost{
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .post{
    border-radius: 30px;
    box-shadow: 0px 2px 3px rgba(183, 79, 85, 0.9) ;
    width: 80%;
    max-width: 700px;
    margin: auto;
    margin-bottom: 30px;
    padding-bottom: 10px;
  }
  #user{
    height: 100px;
    border-radius: 30px 30px 0 0;
    display: flex;
    align-items: center;
    background-color: rgba(183, 79, 85, 0.9);
  }
  #user h1{
    font-size: 1.5rem;
    margin-left: 20px;
    font-weight: bold;
    color: white;
  }
  #avatar-card{
    width: 80px;
    height: 80px;
    margin-left: 20px;
    border-radius: 50px;
    overflow: hidden;
  }
  #avatar{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .post a{
    text-decoration: none;
    color: black;
  }
  #message{
    padding-top: 20px;
  }
  #message img{
    width: 90%;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  #message h2{
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    overflow-wrap: break-word;
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
    overflow-wrap: break-word;
  }
  #infos-post{
    display: flex;
    justify-content: space-between;
    margin-left: 35px;
    margin-bottom: 20px;
  }
  #number-comments{
    text-align: end;
    margin-right: 30px;
    margin-bottom: 10px;
  }
  #options{
    display: flex;
    justify-content: space-between;
    margin-left: 35px;
  }
  #like{
    cursor: pointer;
  }
  i{
    margin-right: 30px;
    font-size: 1.3rem;
    cursor: pointer;
    margin-left: 3px;
  }
  #Ilike{
    color: rgba(17, 34, 65, 0.9);
  }
  #IDislike{
    color: rgba(17, 34, 65, 0.9);
  }
  #Ilike:hover{
    color: rgba(22, 97, 235, 0.9);
  }
  #IDislike:hover{
    color: rgba(183, 79, 85, 0.9);
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
  @media screen and (max-width: 600px) {
      #options{
        flex-direction: column;
      }
      #number-comments{
        text-align: start;
        margin-right: 30px;
        margin-bottom: 10px;
        
      }
      #infos-post{
        margin-bottom: 5px;
        margin-left: 20px;
      }
      #options{
        margin-left: 20px;
      }
      #like{
        display: flex;
        justify-content: space-between;
      }
  }
  @media screen and (max-width: 400px) {
      #like span{
        font-size: 0.9rem;
      }
  }
</style>
