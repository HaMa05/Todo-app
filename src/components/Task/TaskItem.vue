<template>
  <tr>
    <th scope="row">{{ title }}</th>
    <td>{{ status }}</td>
    <td>
      <div class="btn-group" v-if="listCategories.length > 0">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Danh mục
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#" v-for="cate in listCategories" :key="cate.id">{{ cate.name }}</a>
        </div>
      </div>
    </td>
    <td class="text-right">
      <div>
        <button type="button" class="btn btn-warning mr-3" @click="$emit('modifyItem', id)">Sửa</button>
        <button type="button" class="btn btn-danger" @click="$emit('deleteItem', id)">Xóa</button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    categoryNode: {
      type: Array,
      default: function () {
        return [];
      },
    },
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    status: {
      type: String,
    },
    categories: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  computed: {
    listCategories() {
      let findCategories = [];
      if (this.categoryNode) {
        for (let i = 0; i < this.categories.length; i++) {
          let category = this.categoryNode.find((el) => {
            return el.id === this.categories[i].id;
          });

          findCategories.push(category);
        }
      }
      return findCategories;
    },
  },
};
</script>
