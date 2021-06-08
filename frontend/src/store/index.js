import { createStore } from 'vuex'
import instance from '../axios';

// Create a new store instance.
const store = createStore({
  state: {
    user: "",
    userInfos: {},
    posts: [],
    post: "",
    comments: [],
    avatar: "",
    likes: [],
  },

  getters: {
    getUser: (state) => {
      return state.user
    },
    getUserInfos: (state) => {
      return state.userInfos
    },
    getPosts: (state) => {
      return state.posts
    },
    getPost: (state) => {
      return state.post
    },
    getComments: (state) => {
      return state.comments
    },
  },

  mutations: {
    SET_USER: function (state, user) {
      state.user = user
    },
    SET_USERINFOS: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    SET_AVATAR: function (state, avatar) {
      state.userInfos.imageUrl = avatar;
    },
    LOG_OUT: function (state) {
      state.user = "",
      localStorage.removeItem('token');
    },
    SET_POST: function (state, post) {
      state.post = post;
    },
    SET_POSTS: function (state, posts) {
      state.posts = posts;
    },
    ADD_POST: function (state, post) {
      state.posts.unshift(post);
    },
    DELETE_POST: function (state, post) {
      const index = state.posts.findIndex(p => p.id 
        === post.id );
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },
    EDIT_POST: function (state, modifiedPost) {
      const postIndex = state.posts.findIndex(
        p => p.id === modifiedPost.id)
      state.posts[postIndex] = modifiedPost
      state.posts = [...state.posts]
    },
    SET_COMMENTS: (state, comments)=>{
      state.comments = comments
    },
    SET_COMMENT: (state, comment)=>{
      state.comments = {...state.comments, comment}
    },
    DELETE_COMMENT: function (state, comment) {
      const index = state.comments.findIndex(c => c.id 
        === comment.id );
      if (index !== -1) {
        state.comments.splice(index, 1);
      }
    },
    ADD_LIKE: function (state, like) {
      state.likes.push(like);
    },
    DELETE_LIKE: function (state, like) {
      const index = state.likes.findIndex(l => l.id 
        === like.id );
      if (index !== -1) {
        state.likes.splice(index, 1);
      }
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then(function (response) {
            if(response.data.token){
            commit('SET_USER', response.data);
            localStorage.setItem('token', response.data.token);
            resolve(response);
          }
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    createAccount: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos)
        .then(function (response) {
          commit;
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      });
    },
    editProfile ({commit}, user) {
      return new Promise((resolve, reject) => {
        instance.put(`/profile/${user.userId}`, user)
        .then(function (response) {
          commit('SET_USERINFOS', response.data)
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      });
    },
    uploadAvatar({commit}, data) {
      console.log(data)
      instance.post(`/profile/${data[1]}/upload`, data[0],
      {'Content-Type' : 'application/form-data'})
      .then((response) => {
        console.log(response.data)
        commit('SET_AVATAR', data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deleteProfile({commit}, userInfos) {
      instance.delete(`profile/${userInfos}`)
      .then(function () {
        commit('LOG_OUT');
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getUserInfos: ({commit, state }) => {
      instance.get(`/profile/${state.user.userId}`)
        .then(function (response) {
          commit('SET_USERINFOS', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    createPost({ commit }, file) {
      instance.post('/posts', file,
      {'content-type' : 'application/form-data'})
        .then((response) => {
          console.log(response)
          commit('ADD_POST', response.data);
          commit('SET_POST', response.data);
        })
        .catch(error => {
          console.log({ error: error })
        })
    },
    editPost({ commit }, data) {
      console.log(data);
      instance.put(`/posts/${data[1]}`, data[0],
      {'Content-Type' : 'application/form-data'})
      .then(function (response) {
        console.log(response.data)
        commit('EDIT_POST', data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deletePost: ({ commit }, post) => {
      instance.delete(`posts/${post.id}`)
      .then(function () {
        commit('DELETE_POST', post);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getAllPosts: ({ commit }) => {
      instance.get('posts', {
        headers: { Authorization: "Bearer " + localStorage.getItem('token')},
      })
      .then((response) => {
          commit('SET_POSTS', response.data);
      })
      .catch((response) => {
        console.log(response)
      })
    },
    getOnePost: ({ commit }, postId) => {
      instance.get(`posts/${postId}`)
        .then(function (response) {
          commit('SET_POST', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getComments: ({ commit }, postId) => {
      instance.get(`posts/${postId}/comment`)
      .then(function (response) {
        commit('SET_COMMENTS', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    createComment({ commit }, comment) {
      console.log(comment);
      instance.post(`/posts/${comment.postId}/comment`, comment,
      {'Content-Type' : 'application/form-data'})
        .then(function (response) {
          commit('SET_COMMENT', response.data);
        })
        .catch(error => {
          console.log({ error: error })
        })
    },
    deleteComment: ({ commit }, comment) => {
      commit('DELETE_COMMENT', comment);
      instance.delete(`posts/${comment.postId}/comment/${comment.id}`);
    },
    addLike: ({ commit }, like) => {
      instance.post(`/posts/${like.postId}/like`, like)
      .then((response) => {
        commit('ADD_LIKE', response.data);
      })
      .catch(error => {
        console.log({ error: error })
      })
    },
    deleteLike: ({ commit }, like) => {
      commit('DELETE_LIKE', like);
      instance.delete(`posts/${like.postId}/like/${like.id}`);
    },
  },
});

export default store;