<template>
  <div class="container">
    <header class="d-flex justify-content-between">
      <h2 class="title fw-bold">Công việc</h2>
      <button type="button" class="btn btn-success" @click="btnAdd">Thêm công việc</button>
    </header>
    <div class="d-flex align-items-center w-100 mt-2">
      <form class="d-flex w-75">
        <input
          class="form-control me-2 w-75"
          type="search"
          placeholder="Tên công việc"
          aria-label="Tên công việc"
          v-model.lazy.trim="taskName"
        />
      </form>
      <select class="custom-select w-25" v-model="filterName">
        <option selected value="">Lọc danh sách...</option>
        <option v-for="value in valueFilterList" v-bind:value="value.value" :key="value.id">
          {{ value.text }}
        </option>
        <span>{{ filterTask }}</span>
      </select>
    </div>
    <div>
      <task-list v-if="filterTask.length > 0" :tasks="filterTask" @delete-item="deleteBtn" @modify-item="modifyBtn" />
      <div v-else class="no-content w-50 mx-auto mt-3">
        <img class="img-fluid" src="../../assets/images/noContent.svg" alt="No Content" />
      </div>
    </div>
    <div v-show="componentName === 'task-add-form'" class="position-absolute popup">
      <task-add-form @close-popup="closePopup" @add-item="addItem" :categories="getCategories" />
    </div>
    <div v-show="componentName === 'task-modify-form'" class="position-absolute popup">
      <task-modify-form @close-popup="closePopup" :item="itemTask" @modify-name="modifyName" :categories="getCategories" />
    </div>
    <notification :isActive="isActiveNoti" :background="backgroundNoti" :text="textNoti" />
    <paging v-if="totalPages" :link="links" :totalPages="totalPages" @change-page="chagnePage" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskAddForm from './TaskAddForm.vue';
import TaskList from './TaskList.vue';
import TaskModifyForm from './TaskModifyForm.vue';
import Notification from '../Notification/Notification.vue';
import Paging from '../Paging/Paging.vue';
export default {
  components: { TaskList, TaskAddForm, TaskModifyForm, Notification, Paging },
  data() {
    return {
      tasks: null,
      taskName: null,
      filterName: null,
      valueFilterList: [
        { id: '1', value: 'title', text: 'Tên' },
        { id: '2', value: 'status', text: 'Trạng thái' },
      ],
      itemTask: null,
      componentName: null,
      token: null,
      isActiveNoti: false,
      backgroundNoti: 'success',
      textNoti: null,
      links: null,
      totalPages: 0,
    };
  },
  watch: {
    isActiveNoti(value) {
      if (value) {
        const displayNotification = setTimeout(() => {
          this.isActiveNoti = false;
          clearTimeout(displayNotification);
        }, 4000);
      }
    },
  },
  async created() {
    const {
      $route: { query },
    } = this;
    await this.getData(query);
  },
  mounted() {
    this.$store.dispatch('task/getTasks');
    console.log(123);
  },
  computed: {
    ...mapGetters({ getCategories: 'category/getCategories' }),
    filterTask() {
      if (!this.tasks) {
        return [];
      }
      if (!this.taskName) {
        return this.tasks;
      } else {
        let newTask = this.tasks.filter((el) => {
          const attr = this.filterName ? this.filterName : 'title';
          if (!this.taskName) {
            return el;
          } else {
            return el[`${attr}`].toLowerCase().includes(this.taskName.toLowerCase());
          }
        });
        if (!newTask) return [];
        return newTask;
      }
    },
  },
  methods: {
    ...mapActions({ getTasks: 'task/getTasks' }),
    async getData(query) {
      const data = await this.getTasks(query);
      if (data) {
        this.tasks = data.items;
        this.links = data.links;
        this.totalPages = parseInt(data.meta.totalPages);
      }
    },
    async chagnePage({ query }) {
      await this.getData(query);
      this.$router.push({
        query: {
          ...query,
        },
      });
    },
    btnAdd() {
      this.componentName = 'task-add-form';
    },
    closePopup() {
      this.componentName = null;
      this.itemTask = null;
    },
    modifyBtn(id) {
      this.componentName = 'task-modify-form';
      this.itemTask = this.tasks.find((el) => el.id === id);
    },
    addItem(task) {
      this.resetAttrNoti();
      this.$store
        .dispatch('task/createTask', task)
        .then(async () => {
          const { query } = this.$route;
          await this.getData(query);
          this.setAttriNoti('success', 'Thêm công việc thành công');
        })
        .catch(() => {
          this.setAttriNoti('danger', 'Hệ thống lỗi, vui lòng thực hiện lại.');
        });
    },
    modifyName({ id, task }) {
      this.$store
        .dispatch('task/modifyTask', { id, task })
        .then(async () => {
          const { query } = this.$route;
          await this.getData(query);
          this.setAttriNoti('warning', 'Thay đổi công việc thành công');
        })
        .catch(() => {
          this.setAttriNoti('warning', 'Hệ thống lỗi, vui lòng thực hiện lại.');
        });
    },
    deleteBtn(id) {
      this.$store
        .dispatch('task/deleteTask', id)
        .then(async () => {
          const { query } = this.$route;
          await this.getData(query);
          this.setAttriNoti('danger', 'Xóa công việc thành công');
        })
        .catch(() => {
          this.setAttriNoti('danger', 'Hệ thống lỗi, vui lòng thực hiện lại.');
        });
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
.popup {
  transform: translate(-50%, -50%);
}
</style>
