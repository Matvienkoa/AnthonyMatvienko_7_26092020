<template>
    <div class="posts">
      <div class="post">
        <div id="user">
          <span v-if="post.user.imageUrl != null" id="avatar-card">
            <img v-if="post.user.imageUrl" id="avatar" :src="post.user.imageUrl" />
          </span>
          <h1> {{ post.user.username }} a écrit:</h1>
        </div>
        <router-link :to="{name: 'post', params: {id: post.id}}">
          <div id="message">
            <h2> {{ post.title }} </h2>
            <img v-if="post.imageUrl" :src="post.imageUrl" />
            <div id="message-content">
              <p> {{ post.content }} </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>

export default {
  props: ["post"],
};
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
    background-image: linear-gradient(0deg, rgb(255, 255, 255),rgb(137, 186, 250));
  }
  #user h1{
    font-size: 1.5rem;
    margin-left: 20px;
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
</style>