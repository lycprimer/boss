<template>

  <h1>Boss Demo</h1>

  <a-modal v-model:open="isModalOpen" ok-text="确认" cancel-text="取消" @ok="modalOk" @cancel="modalCancel" title="学生评价">

    <span>The student grade is &nbsp;</span> <strong style="color: green">{{modalDetailData}}</strong>

  </a-modal>

  <div class="table_view">
    
    <a-table
        :columns="columns"
        :dataSource="paginatedData"
        :pagination="false"
        rowKey="id"
        size="small"
    >
      <template #bodyCell="{ column, stu_info_text, record }">
        <template v-if="column.dataIndex==='detail'">
          <a-button type="primary" @click="showDetail(record)">查看详情</a-button>
        </template>
      </template>

    </a-table>
    
    <a-pagination
        v-model:current="currentPage"
        :total="filteredData.length"
        :pageSize="itemsInPage"
        @change="handlePageChange"
        :responsive="true"
        style="text-align: center; margin-top: 20px; padding-left: 130px"
    />
  </div>
</template>

<script>
import {message} from "ant-design-vue";

export default {
  data() {
    return {
      filteredStudentText: '',
      currentPage: 1,
      itemsInPage: 10,
      isModalOpen:false,
      modalDetailData:null,
      columns: [
        { title: 'stu_id', dataIndex: 'id', key: 'id' },
        { title: 'name', dataIndex: 'name', key: 'name' },
        {
          title: 'math_score', dataIndex: 'math_score', key: 'math_score' ,
          filters:[
              {text:'0~60',value:0},
              {text:'60~80',value:1},
              {text:'80~100',value:2}
          ],
          onFilter: (value, record) => {
            if (value === 0) {
              return record.math_score >= 0 && record.math_score < 60;
            } else if (value === 1) {
              return record.math_score >= 60 && record.math_score < 80;
            } else if (value === 2) {
              return record.math_score >= 80 && record.math_score <= 100;
            }
          }
        },
        {
          title: 'chinese_score', dataIndex: 'chinese_score', key: 'chinese_score',
          filters:[
            {text:'0~60',value:0},
            {text:'60~80',value:1},
            {text:'80~100',value:2}
          ],
          onFilter: (value, record) => {
            if (value === 0) {
              return record.chinese_score >= 0 && record.chinese_score < 60;
            } else if (value === 1) {
              return record.chinese_score >= 60 && record.chinese_score < 80;
            } else if (value === 2) {
              return record.chinese_score >= 80 && record.chinese_score <= 100;
            }
          }
        },
        {
          title: 'english_score', dataIndex: 'english_score', key: 'english_score',
          filters:[
            {text:'0~60',value:0},
            {text:'60~80',value:1},
            {text:'80~100',value:2}
          ],
          onFilter: (value, record) => {
            if (value === 0) {
              return record.english_score >= 0 && record.english_score < 60;
            } else if (value === 1) {
              return record.english_score >= 60 && record.english_score < 80;
            } else if (value === 2) {
              return record.english_score >= 80 && record.english_score <= 100;
            }
          }
        },
        { title: 'detail', dataIndex: 'detail', key: 'detail' },
      ],
      data: [
        { id: 1, name: 'Tom', math_score: 91,chinese_score:85, english_score:91,detail: 'A' },
        { id: 2, name: 'Jerry', math_score: 86,chinese_score:74, english_score:86,detail: 'A-' },
        { id: 3, name: 'Kitty', math_score: 63,chinese_score:45, english_score:45,detail: 'B-' },
        { id: 4, name: 'Jimmy', math_score: 13,chinese_score:34, english_score:13,detail: 'C+' },
        { id: 5, name: 'Simon', math_score: 75,chinese_score:85, english_score:75,detail: 'A-' },
        { id: 6, name: 'Tommy', math_score: 71,chinese_score:88, english_score:77,detail: 'B+' },
        { id: 7, name: 'White', math_score: 32,chinese_score:23, english_score:32,detail: 'C' },
        { id: 8, name: 'Black', math_score: 88,chinese_score:99, english_score:99,detail: 'A+' },
        { id: 9, name: 'Smith', math_score: 34,chinese_score:23, english_score:34,detail: 'C-' },
        { id: 10, name: 'Judy', math_score: 86,chinese_score:97, english_score:86,detail: 'A+' },
        { id: 11, name: 'Amanda', math_score: 56,chinese_score:45, english_score:56,detail: 'B-' },
        { id: 12, name: 'Annie ', math_score: 94,chinese_score:98, english_score:87,detail: 'A+' },
        { id: 13, name: 'Bertie', math_score: 99,chinese_score:88, english_score:90,detail: 'A+' },
        { id: 14, name: 'Bright', math_score: 45,chinese_score:23, english_score:45,detail: 'C' },
        { id: 15, name: 'Google ', math_score: 34,chinese_score:64, english_score:66,detail: 'C+' },
        { id: 16, name: 'Alex', math_score: 21,chinese_score:23, english_score:22,detail: 'C-' },
        { id: 17, name: 'Aaron', math_score: 99,chinese_score:89, english_score:89,detail: 'A+' },
        { id: 18, name: 'Abraha', math_score: 67,chinese_score:67, english_score:77,detail: 'B' },
        { id: 19, name: 'Alfven', math_score: 12,chinese_score:13, english_score:56,detail: 'C-' },
        { id: 20, name: 'Adele', math_score: 97,chinese_score:89, english_score:86,detail: 'A+' },
        { id: 21, name: 'Romeo', math_score: 89,chinese_score:90, english_score:84,detail: 'A' },
        { id: 22, name: 'Juliet', math_score: 88,chinese_score:85, english_score:91,detail: 'A' },
      ],
    };
  },
  computed: {
    filteredData() {
      return this.data.filter(item => item.name.includes(this.filteredStudentText));
    },
    paginatedData() {
      const start_index = (this.currentPage - 1) * this.itemsInPage;
      const end_index = this.currentPage * this.itemsInPage;
      return this.filteredData.slice(start_index, end_index);
    },

  },
  methods: {
    filterMathScore() {
      this.currentPage = 1;
    },
    handlePageChange(page) {
      this.currentPage = page;
    },

    showDetail(record){
      this.isModalOpen=true;
      this.modalDetailData=record.detail;
    },

    modalOk(){
      this.isModalOpen=false;
      this.modalDetailData=null;
    },

    modalCancel(){
      this.isModalOpen=false;
      this.modalDetailData=null;
    }

  },
};
</script>

<style scoped>
.table_view {
  padding: 20px 8px 0 3px;
}
</style>





