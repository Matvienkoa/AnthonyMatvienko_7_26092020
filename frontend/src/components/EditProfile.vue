<template>
    <div id="edit-card">
        <div id="form"> 
            <input v-model="username" type="text" class="form-control" placeholder="Username">
            <input v-model="poste" type="text" class="form-control" placeholder="Poste occupé">
            <button @click="editProfile()" class="btn btn-success">Modifier</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditProfile',
    data() {
        return {
            username: "",
            poste: "",
        }
    },
    methods: {
        editProfile() {
            this.$store.dispatch("editProfile", {
                username: this.username,
                poste: this.poste,
                userId: this.$store.state.user.userId
            })
        }
    }
}
</script>

<style scoped>
#edit-card{
  border-radius: 30px;
  box-shadow: 0px 2px 3px rgb(126, 184, 223) ;
  width: 80%;
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
</style>
