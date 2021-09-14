<template>
  <div class="mt-4">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col" class="text-right">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <category-item
          v-for="category in categories"
          :key="category.id"
          :title="category.name"
          :id="category.id"
          @modifyItem="$emit('modifyItem', $event)"
          @deleteItem="$emit('deleteItem', $event)"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import CategoryItem from './CategoryItem.vue';
export default {
  components: { CategoryItem },
  data() {
    return {};
  },
  props: {
    categories: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>
