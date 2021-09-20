<template>
  <nav v-if="totalPages > 1" class="navigation text-center">
    <paginate
      :page-count="totalPages"
      :click-handler="functionName"
      :prev-text="'Trước'"
      :next-text="'Sau'"
      container-class="pagination pagination-sm flex-center"
      page-class="page-item"
      page-link-class="page-link rounded-sm page-font"
      prev-class="page-item"
      prev-link-class="page-link rounded-sm page-font "
      next-class="page-item"
      next-link-class="page-link rounded-sm page-font"
      :value="parseInt($route.query.page || 1)"
    >
    </paginate>
  </nav>
</template>

<script>
import Paginate from 'vuejs-paginate';
export default {
  name: 'Pagination',
  components: { Paginate },
  props: {
    totalPages: {
      type: Number,
      default: 2,
    },
    link: {
      type: Object,
      default: function () {
        return {
          first: null,
          last: null,
          next: null,
          previous: null,
        };
      },
    },
  },
  methods: {
    functionName(page) {
      const { query } = this.$route;
      this.$emit('change-page', {
        query: {
          ...query,
          page,
        },
      });
    },
  },
};
</script>
