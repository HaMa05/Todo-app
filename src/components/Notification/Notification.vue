<template>
  <div :class="[{ active: isActive }, background]" class="notification" id="notification">
    <span class="notification-title">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    background: {
      type: String,
      required: true,
      default: 'success',
      validator: function (value) {
        if (value === 'success' || value === 'warning' || value === 'danger') {
          return true;
        }
        return false;
      },
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped>
.success {
  background-color: #50cb93;
}
.warning {
  background-color: #ffc107;
}
.danger {
  background-color: #dc3545;
}

.notification {
  width: fit-content;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  opacity: 0;
}
.notification-title {
  display: inline-block;
  padding: 20px 30px;
  color: white;
}

.active {
  animation: notification 3s;
}
@keyframes notification {
  0% {
    transform: translate(-50%, 0);
    opacity: 0;
  }
  90% {
    transform: translate(-50%, 100%);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
}
</style>
