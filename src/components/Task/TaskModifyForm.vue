<template>
  <div class="bg-white border p-3 rounded shadow">
    <div class="d-flex justify-content-between">
      <h4>Sửa danh mục</h4>
      <button type="button" class="close" aria-label="Close" @click="closePopup">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form @submit.prevent="modifyTask">
      <div class="row mb-3">
        <label for="categoryName" class="col-sm-12 col-form-label w-100">Tên danh mục</label>
        <div class="col-sm-12">
          <input id="categoryName" type="text" class="form-control" name="categoryName" required autocomplete="off" v-model="taskName" />
        </div>
        <div class="col-sm-12 mt-3 d-flex flex-wrap justify-content-between">
          <div class="form-group form-check" v-for="category in categories" :key="category.id">
            <input type="checkbox" class="form-check-input" :id="category.id" :value="category.id" v-model="checkCategories" />
            <label class="form-check-label" for="exampleCheck1">{{ category.name }}</label>
          </div>
        </div>
      </div>
      <div class="form-group d-flex justify-content-center mt-4">
        <button type="submit" class="btn btn-warning">Sửa danh mục</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: '',
      checkCategories: [],
    };
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return {};
      },
    },
    categories: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  created() {
    if (this.item) {
      this.item.categories.forEach((el) => {
        this.checkCategories.push(el.id);
      });
      this.taskName = this.item.title;
    }
  },
  methods: {
    closePopup() {
      this.resetValue();
      this.$emit('closePopup');
    },
    modifyTask() {
      const task = {
        title: this.taskName,
        categoryIds: this.checkCategories,
        status: this.item.status,
      };
      this.$emit('modifyName', { id: this.item.id, task });
      this.closePopup();
    },
    resetValue() {
      this.taskName = '';
      this.checkCategories = [];
    },
  },
};
</script>
