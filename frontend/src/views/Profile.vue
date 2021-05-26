<template>
    <Nav/>
    <div id="profileInfos">
        <h1>Mes Informations</h1>
        <div id="infosContainer">
            <div v-if="userInfos.imageUrl != null" id="avatar">
                <img :src="userInfos.imageUrl" />
            </div>
            <div id="infos">
                <p>Nom d'utilisateur : {{ userInfos.username }}</p>
                <p>Poste occupé : {{ userInfos.poste }}</p>
                <p>Adresse mail : {{ userInfos.email }}</p>
            </div>
        </div>
        <div id="button">
            <button v-if="userInfos.imageUrl == null && modeavatar == 'showavatar'" @click="switchToUploadAvatar()" class="btn btn-success">Ajouter un avatar</button>
            <button v-if="modeavatar == 'uploadavatar'" @click="switchToShowAvatar()" class="btn btn-warning">Annuler</button>
            <button v-if="mode == 'readprofile'" @click="switchToEditProfile()" class="btn btn-success">Modifier mon Profil</button>
            <button v-if="mode == 'editprofile'" @click="switchToReadProfile()" class="btn btn-warning">Annuler la Modification</button>
            <router-link to="/">
            <button @click="deleteProfile(userInfos)" class="btn btn-danger" id="btn-delete-profile">Supprimer mon Profil</button>
            </router-link>
        </div>
        <UploadAvatar v-if="modeavatar == 'uploadavatar'" />
        <EditProfile v-if="mode == 'editprofile'" />
        <h2>Mes posts</h2>
        <div id="listPosts">
            <ul v-for="post in userInfos.posts" :key="post.title">
                <router-link :to="{name: 'post', params: {id: post.id}}">
                <li> {{ post.title }} </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>



<script>
import Nav from '@/components/Nav.vue'
import EditProfile from '@/components/EditProfile.vue'
import UploadAvatar from '@/components/UploadAvatar.vue'
import { mapState } from "vuex";

export default {
    name: 'Profile',
    components: {
        Nav,
        EditProfile,
        UploadAvatar,
    },
    data() {
        return {
            mode: 'readprofile',
            modeavatar: 'showavatar'
        }
    },
    mounted: function () {
       this.$store.dispatch('getUserInfos');
    },
    computed: {
      ...mapState({
          userInfos: "userInfos",
      }),
    },
    methods: {
        switchToEditProfile() {
            this.mode = 'editprofile';
        },
        switchToReadProfile() {
            this.mode = 'readprofile';
        },
        deleteProfile(userInfos) {
            this.$store.dispatch('deleteProfile', userInfos.id)
        },
        switchToUploadAvatar() {
            this.modeavatar = 'uploadavatar';
        },
        switchToShowAvatar() {
            this.modeavatar = 'showavatar';
        },
    }
}


</script>

<style scoped>
    #profileInfos{
        height: 100vh;
        margin-bottom: -90px;
    }
    #avatar{
        border-radius: 80px;
        overflow: hidden;
        width: 150px;
        height: 150px;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
    #infosContainer{
        display: flex;
        justify-content: space-around;
        width: 80%;
        max-width: 700px;
        margin: auto;
        margin-bottom: 30px;
    }
    #infos{
        text-align: start;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 1.2rem;
    }
    h1{
        margin-bottom: 30px;
        margin-top: 20px;
    }
    ul{
        text-align: start;
        margin: auto;
    }
    #button{
        display: flex;
        justify-content: space-around;
        width: 80%;
        max-width: 700px;
        margin: auto;
        margin-bottom: 30px;
    }

    #listPosts{
        width: 80%;
        max-width: 700px;
        margin: auto;
        margin-top: 30px;
    }
    a{
        text-decoration: none;
        color: #000;
    }
    li{
        font-size: 1.1rem;
        list-style: none;
    }

    @media screen and (max-width: 700px) {
        #infosContainer{
            flex-direction: column;
            margin: auto;
            align-items: center;
        }
        #avatar{
            margin-bottom: 30px;
        }
        #infos{
            margin-bottom: 30px;
        }
        #button{
            justify-content: center;
        }
    }
</style>
