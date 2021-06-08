<template>
    <button v-if="mode == 'readprofile'" @click="switchToEditProfile()" class="btn btn-success">Modifier mon Profil</button>
    <button v-if="mode == 'editprofile'" @click="switchToReadProfile()" class="btn btn-warning">Annuler la Modification</button>
    <div id="edit-card">
        <div v-if="mode == 'editprofile'" id="form"> 
            <input v-model="username" type="text" class="form-control" placeholder="Username">
            <input v-model="poste" type="text" class="form-control" placeholder="Poste occupé">
            <button @click="editProfile()" class="btn btn-success">Modifier</button>
            <div id="error" v-if="error"> {{ error.message }} </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditProfile',
    data() {
        return {
            mode: 'readprofile',
            username: "",
            poste: "",
            error: "",
        }
    },
    methods: {
        switchToEditProfile() {
            this.mode = 'editprofile';
        },
        switchToReadProfile() {
            this.mode = 'readprofile';
        },
        editProfile() {
            this.$store.dispatch("editProfile", {
                username: this.username,
                poste: this.poste,
                userId: this.$store.state.user.userId
            })
            .then(() => {
                this.$store.dispatch('getUserInfos');
                this.switchToReadProfile();
            })
            .catch((error) => {
                this.error = error.response.data
                console.log(error.response.data);
            })
            this.username = "";
            this.poste = "";
        }
    }
}
</script>

<style scoped>
    #edit-card{
    border-radius: 30px;
    box-shadow: 0px 2px 3px rgb(126, 184, 223) ;
    width: 80%;
    max-width: 700px;
    margin: auto;
    }
    #form {
    width: 80%;
    margin: auto;
    padding-top: 10px;
    padding-bottom: 20px;
    margin-bottom: 30px;
    }
    #form input{
        margin-bottom: 20px;
        margin-top: 20px;
    }
    button{
        margin-bottom: 20px;
    }
    #error{
        color: red;
        font-weight: bold;
    }
</style>
