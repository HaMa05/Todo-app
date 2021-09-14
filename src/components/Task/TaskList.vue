<template>
  <div class="mt-4">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Danh mục</th>
          <th scope="col" class="text-right">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <task-item
          v-for="task in tasks"
          :key="task.id"
          :title="task.title"
          :id="task.id"
          :status="task.status"
          :categories="task.categories"
          :categoryNode="categoryNode"
          @modifyItem="$emit('modifyItem', $event)"
          @deleteItem="$emit('deleteItem', $event)"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TaskItem from './TaskItem.vue';
export default {
  components: { TaskItem },
  data() {
    return {
      categoryNode: null,
    };
  },
  props: {
    tasks: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  async created() {
    await this.getData();
  },
  methods: {
    ...mapActions({
      getCategories: 'category/getCategories',
    }),
    async getData() {
      const data = await this.getCategories();
      if (data) {
        this.categoryNode = data.items;
      }
    },
  },
};
</script>
