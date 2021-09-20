export const formFieldMixin = {
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
  },
  methods: {
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
