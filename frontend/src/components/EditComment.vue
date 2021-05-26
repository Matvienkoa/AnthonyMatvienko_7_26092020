<template>
    <div class="container" id="edit-comment">
    <label for="comment" class="form-label">Votre commentaire :</label>
    <input type="text" name="comment" class="form-control comment" v-model="content">
    <button class="btn btn-success">Modifier</button>
  </div>
</template>

<script>

export default {
    name: 'EditComment'
}

</script>


