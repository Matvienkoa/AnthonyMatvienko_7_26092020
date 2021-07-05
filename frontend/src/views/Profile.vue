<template>
    <div>
        <Nav/>
        <div id="profileInfos">
            <h1>Mes Informations</h1>
            <div id="infosContainer">
                <UploadAvatar :userInfos="userInfos"/>
                <div id="infos">
                    <p>Nom d'utilisateur : {{ userInfos.username }}</p>
                    <p>Poste occupé : {{ userInfos.poste }}</p>
                    <p>Adresse mail : {{ userInfos.email }}</p>
                </div>
            </div>
            <EditProfile/>
            <div v-if="mode == 'deleteprofile'" id="delete-card">
                <span id="confirmationdelete">Etes-vous sûr de vouloir supprimer votre Profil?</span>
                <router-link to="/">
                    <button @click="deleteProfile(userInfos)" class="btn btn-success" id="btn-yes">Oui</button>
                </router-link>
                <button @click="switchToProfile()" class="btn btn-danger" id="btn-no">Non</button>
            </div>
            <button v-if="mode == 'profile'" @click="switchToDeleteProfile()" class="btn btn-danger" id="btn-delete-profile">Supprimer mon Profil</button>
            <h2>Mes posts</h2>
            <div id="listPosts">
                <!--<span v-if="userInfos.posts.length < 1" id="noposts">Vous n'avez pas encore posté de message.</span>-->
                <ul v-for="post in userInfos.posts" :key="post.title">
                    <router-link :to="{name: 'post', params: {id: post.id}}">
                    <li> {{ post.title }} </li>
                    </router-link>
                </ul>
            </div>
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
            mode: 'profile',
        }
    },
    created: function () {
       this.$store.dispatch('getUserInfos');
    },
    computed: {
      ...mapState({
          userInfos: "userInfos",
      }),
    },
    methods: {
        switchToDeleteProfile() {
            this.mode = 'deleteprofile';
        },
        switchToProfile() {
            this.mode = 'profile';
        },
        deleteProfile(userInfos) {
            this.$store.dispatch('deleteProfile', userInfos.id)
            this.switchToProfile()
            window.alert("Votre Profil a bien été supprimé!")
        },
    }
}
</script>

<style scoped>
    #infosContainer{
        display: flex;
        justify-content: space-around;
        width: 90%;
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
    h2{
        margin-top: 30px;
    }
    ul{
        text-align: start;
        margin: auto;
        padding: 0;
    }
    #noposts{
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 40px;
    }
    #delete-card{
        display: flex;
        width: 80%;
        margin: auto;
        justify-content: space-around;
        align-items: center;
        border-radius: 30px;
        box-shadow: 0px 2px 3px rgb(183, 79, 85) ;
        max-width: 700px;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 30px;
    }
    #delete-card span{
        color: red;
        font-weight: bold;
    }
    #confirmationdelete{
        font-size: 1.2rem;
    }
    #btn-no, #btn-yes{
        margin-left: 10px;
    }
    #btn-delete-profile{
        margin-bottom: 20px;
        font-size: 0.8rem;
    }
    #listPosts{
        width: 70%;
        max-width: 700px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 40px;
    }
    a{
        text-decoration: none;
        color: #000;
    }
    li{
        font-size: 1.2rem;
        list-style: none;
        color: rgb(23, 47, 90);
        box-shadow: 0px 2px 0px rgba(183, 79, 85, 0.9);
        margin-bottom: 15px;
        overflow-wrap: break-word;
    }

    @media screen and (max-width: 700px) {
        #infosContainer{
            flex-direction: column;
            margin: auto;
            align-items: center;
        }
        #infos{
            margin-bottom: 30px;
        }
        #button{
            justify-content: center;
        }
    }
</style>
