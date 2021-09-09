<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="logo" />
    </div>
    <h1 class="login-title">Đăng ký tài khoản</h1>
    <form class="form w-100" @submit.prevent="submitData">
      <div class="row mb-3">
        <label for="username" class="col-4 col-form-label">Tài khoản</label>
        <div class="col-sm-12">
          <input type="text" class="form-control" name="username" id="username" v-model="username" required autocomplete="off" />
        </div>
        <span class="fs-6" :class="{ 'error-text': isUserError }">{{ userErrorText }}</span>
      </div>
      <div class="row mb-3">
        <label for="password" class="col-4 col-form-label">Mật khẩu</label>
        <div class="col-sm-12">
          <input type="password" class="form-control" name="password" id="password" v-model="password" required />
        </div>
        <span class="fs-6" :class="{ 'error-text': isPassError }">{{ passErrorText }}</span>
      </div>
      <div class="form-group">
        <router-link to="/login">Đăng nhập tài khoản</router-link>
      </div>
      <div class="form-group d-flex justify-content-center mt-4">
        <button type="submit" class="btn">Đăng ký</button>
      </div>
    </form>
    <notification :isActive="isActiveNoti" :background="backgroundNoti" :text="textNoti" />
  </div>
</template>

<script>
import Notification from '../components/Notification/Notification.vue';
export default {
  components: { Notification },
  name: 'SignUp',
  data() {
    return {
      username: '',
      password: '',
      userErrorText: '',
      isUserError: false,
      passErrorText: '',
      isPassError: false,
      isActiveNoti: false,
      backgroundNoti: 'success',
      textNoti: null,
      isSignup: false,
    };
  },
  watch: {
    username(value) {
      if (!value || value.trim().length === 0) {
        this.userErrorText = 'Không được để trống';
        this.isUserError = true;
      } else {
        this.userErrorText = '';
        this.isUserError = false;
      }
    },

    password(value) {
      if (!value || value.trim().length === 0) {
        this.passErrorText = 'Không được để trống';
        this.isPassError = true;
      } else if (!this.passInvalid(value)) {
        this.passErrorText = 'Mật khẩu tối thiếu 8 ký tự gồm: a-z, A-Z, 0-9';
        this.isPassError = true;
      } else {
        this.passErrorText = '';
        this.isPassError = false;
      }
    },

    isActiveNoti(value) {
      if (value) {
        const displayNotification = setTimeout(() => {
          this.isActiveNoti = false;
          if (this.isSignup) {
            this.$router.push('/login');
            clearTimeout(displayNotification);
          }
        }, 4000);
      }
    },
  },
  methods: {
    async submitData() {
      this.resetAttrNoti();
      const { username, password } = this;
      await this.$store
        .dispatch('signup', { username, password })
        .then(() => {
          this.isSignup = true;
          this.setAttriNoti('success', 'Đăng ký tài khoản thành công');
        })
        .catch(() => {
          this.setAttriNoti('danger', 'Đăng ký tài khoản thất bại');
        });
    },
    passInvalid(pass) {
      const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,32}$/;
      return regPass.test(pass);
    },
    setAttriNoti(bg, text) {
      this.isActiveNoti = true;
      this.backgroundNoti = bg;
      this.textNoti = text;
    },
    resetAttrNoti() {
      this.isActiveNoti = false;
    },
  },
};
</script>

<style scoped>
.login {
  position: absolute;
  top: 40%;
  left: 50%;
  max-width: 100%;
  width: 500px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 70px;
  height: 70px;
}

.logo img {
  width: 100%;
  object-fit: cover;
}

.login-title {
  margin: 2rem 0;
  font-size: 2.5rem;
}
.error-text {
  display: inline-block;
  margin-top: 0.5rem;
  color: rgb(245, 63, 63);
  font-size: 1.4rem;
}

a {
  text-decoration: none;
  font-size: 16px;
  color: #000;
}

a:hover {
  color: #0880d0;
}

.btn {
  background: #0880d0;
  color: #fff;
  padding: 10px 15px;
  outline: 0;
  border: 0;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  font-size: 17px;
  transition: all 0.2s;
}

.btn:hover {
  background: #fff;
  color: #0880d0;
  border: 1px solid currentColor;
}
</style>
