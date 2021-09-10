<template>
  <div class="container">
    <header class="d-flex justify-content-between">
      <h2 class="title fw-bold">Danh mục</h2>
      <button type="button" class="btn btn-success" @click="btnAdd">Thêm danh mục</button>
    </header>
    <div class="d-flex align-items-center w-100 mt-2">
      <form class="d-flex w-75">
        <input
          class="form-control me-2 w-75"
          type="search"
          placeholder="Tên danh mục"
          aria-label="Tên danh mục"
          v-model.lazy.trim="categoryName"
        />
      </form>
    </div>
    <div>
      <category-list v-if="filterCategories.length > 0" :categories="filterCategories" @delete-item="deleteBtn" @modify-item="modifyBtn" />
      <div v-else class="no-content w-50 mx-auto mt-3">
        <img class="img-fluid" src="../../assets/images/noContent.svg" alt="No Content" />
      </div>
    </div>
    <div v-show="componentName === 'category-add-form'" class="position-absolute popup">
      <category-add-form @close-popup="closePopup" @add-item="addItem"></category-add-form>
    </div>
    <div v-show="componentName === 'category-modify-form'" class="position-absolute popup">
      <category-modify-form @close-popup="closePopup" :item="itemCategory" @modify-name="modifyName"></category-modify-form>
    </div>
    <notification :isActive="isActiveNoti" :background="backgroundNoti" :text="textNoti" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CategoryAddForm from './CategoryAddForm.vue';
import CategoryModifyForm from './CategoryModifyForm.vue';
import CategoryList from './CategoryList.vue';
import Notification from '../Notification/Notification.vue';
export default {
  components: { CategoryList, CategoryAddForm, CategoryModifyForm, Notification },
  data() {
    return {
      itemCategory: null,
      token: null,
      componentName: null,
      categoryName: null,
      isActiveNoti: false,
      backgroundNoti: 'success',
      textNoti: null,
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
  computed: {
    ...mapGetters({ getCategories: 'category/getCategories' }),
    filterCategories() {
      if (!this.categoryName) {
        return this.getCategories;
      } else {
        let newcategories = this.getCategories.filter((el) => {
          return el.name.toLowerCase().includes(this.categoryName.toLowerCase());
        });
        return newcategories ? newcategories : [];
      }
    },
  },
  mounted() {
    this.$store.dispatch('category/getCategories');
  },
  methods: {
    btnAdd() {
      this.componentName = 'category-add-form';
    },
    closePopup() {
      this.componentName = null;
      this.itemCategory = null;
    },
    deleteBtn(id) {
      this.resetAttrNoti();
      this.$store
        .dispatch('category/deleteCategory', id)
        .then(() => {
          this.setAttriNoti('danger', 'Xóa danh mục thành công');
        })
        .catch(() => {
          this.setAttriNoti('danger', 'Hệ thống lỗi, vui lòng thực hiện lại.');
        });
    },
    modifyBtn(id) {
      this.componentName = 'category-modify-form';
      const name = this.getCategories.find((el) => el.id === id).name;
      this.itemCategory = {
        id,
        name,
      };
    },
    modifyName({ id, name }) {
      this.resetAttrNoti();
      this.$store
        .dispatch('category/modifyCategory', { id, name })
        .then(() => {
          this.setAttriNoti('warning', 'Thay đổi danh mục thành công');
        })
        .catch(() => {
          this.setAttriNoti('danger', 'Hệ thống lỗi, vui lòng thực hiện lại.');
        });
    },
    addItem(name) {
      this.resetAttrNoti();
      this.$store
        .dispatch('category/createCategory', { name })
        .then(() => {
          this.setAttriNoti('success', 'Thêm danh mục thành công');
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

<style>
.popup {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
