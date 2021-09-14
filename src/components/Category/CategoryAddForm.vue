<template>
  <div class="bg-white border p-3 rounded shadow">
    <div class="d-flex justify-content-between">
      <h4>Thêm danh mục</h4>
      <button type="button" class="close" aria-label="Close" @click="closePopup">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form @submit.prevent="addCategory">
      <div class="row">
        <label for="categoryName" class="col-sm-12 col-form-label">Tên danh mục</label>
        <div class="col-12">
          <input
            id="categoryName"
            type="text"
            class="form-control"
            name="categoryName"
            required
            autocomplete="off"
            v-model="categoryName"
          />
        </div>
      </div>
      <div class="form-group d-flex justify-content-center mt-4">
        <button type="submit" class="btn btn-success">Thêm danh mục</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryName: '',
    };
  },
  methods: {
    closePopup() {
      this.categoryName = '';
      this.$emit('closePopup');
    },
    addCategory() {
      this.$emit('addItem', this.categoryName);
      this.closePopup();
    },
  },
};
</script>

<style scoped>
.popup {
  transform: translate(-50%, -50%);
}
</style>
