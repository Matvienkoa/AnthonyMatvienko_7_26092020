<template>
    <div id="comment-card">
      <p id="comment-user">{{ comment.user.username }} a commenté:</p>
      <span id="moment-comment"> {{  moment(comment.createdAt).fromNow() }} </span>
      <div id="comment-content">
        <p>{{ comment.content }}</p>
      </div>
    </div>
    <button v-if="comment.userId == user.userId || userInfos.isAdmin === 1" class="btn btn-danger" id="btn-delete" @click.prevent="deleteComment(comment)">Supprimer le Commentaire</button>
</template>

<script>
import { mapActions, mapState } from 'vuex';
let moment = require('moment');
moment.locale('fr');

  export default {
    props: ["comment"],
    data() {
      return {
        moment: moment,
      }
    },
    methods: {
      ...mapActions(["getUserInfos"]),
      deleteComment(comment) {
        this.$store.dispatch('deleteComment', comment)
        window.alert("Votre Commentaire a bien été supprimé!")
      }
    },
    computed: {
      ...mapState([
        'user',
        'userInfos',
      ]),
    },
    created: function () {
        this.getUserInfos();
    }
  }
</script>

<style scoped>
  #comment-card{
    width: 80%;
    max-width: 700px;
    margin: auto;
    padding-top: 5px;
    padding-bottom: 10px;
    text-align: start;
  }
  #comment-user{
    margin-left: 3%;
    margin-bottom: 5px;
    font-weight: bold;
  }
  #moment-comment{
    margin-left: 3%;
  }
  #comment-content{
    width: 95%;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
    background-color: rgb(231, 241, 252);
    border-radius: 10px;
    padding: 5px;
  }
  #comment-content p{
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left: 15px;
    text-align: start;
    overflow-wrap: break-word;
  }
  #btn-delete{
    margin-bottom: 20px;
    margin-right: 3%;
    font-size: 0.7rem;
  }
</style>