<template>
  <tr>
    <th scope="row">{{ title }}</th>
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
    id: {
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
