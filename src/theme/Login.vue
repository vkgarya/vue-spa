<template>
  <div class="content">
    <div v-if="isAuthenticated">
      Hello authenticated user!
      <!-- <p>Name: {{profile.firstName}}</p>
      <p>Favorite Sandwich: {{profile.favoriteSandwich}}</p> -->
      <button v-on:click="logout" class="button is-primary">
        Logout
      </button>
    </div>
    <div v-else>
    <h2>Login</h2>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Username</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model="username" placeholder="Your username" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Password</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" type="password" v-model="password" placeholder="Your password" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <!-- Left empty for spacing -->
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <button v-on:click="login()" class="button is-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    login () {
      this.$store.dispatch('login', {username: this.username, password: this.password})
        .then((data) => {
          this.username = ''
          this.password = ''
        })
    }
  }
}
</script>
