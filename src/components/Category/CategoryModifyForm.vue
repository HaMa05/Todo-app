<template>
  <div class="bg-white border p-3 rounded shadow">
    <div class="d-flex justify-content-between">
      <h4>Sửa danh mục</h4>
      <button type="button" class="close" aria-label="Close" @click="closePopup">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form @submit.prevent="modifyCategory">
      <div class="row mb-3">
        <label for="categoryName" class="col-sm-12 col-form-label w-100">Tên danh mục</label>
        <div class="col-sm-12">
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
        <!-- <span class="fs-6" :class="{ 'error-text': isUserError }">{{ userErrorText }}</span> -->
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
      categoryName: '',
    };
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    item(value) {
      if (value) this.categoryName = value.name;
    },
  },
  methods: {
    closePopup() {
      this.categoryName = '';
      this.$emit('close-popup');
    },
    modifyCategory() {
      this.$emit('modify-name', {
        id: this.item.id,
        name: this.categoryName,
      });
      this.closePopup();
    },
  },
};
</script>

<style></style>
