<script setup lang="ts">
import { defineProps } from 'vue';

interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'medium' | 'small' | 'mini';
  loading?: boolean;
  disabled?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
}
const props = defineProps<ButtonProps>();
console.log(props);
</script>
<script lang="ts">
export default {
  name: 'avicii-button',
};
</script>
<template>
  <button class="avicii-button" :class="[props.type]">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.avicii-button {
  //和elemnt-plus的button样式一致
  display: inline-block;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  min-width: 64px;
  height: 36px;
  padding: 0 15px;
  font-size: 14px;
  font-weight: 500;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
  transition: 0.1s;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  color: #606266;
  background-color: #fff;
  border-color: #dcdfe6;
  margin-right: 10px;
  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  &:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    background-color: #deecff;
  }
  &:focus {
    border-color: #409eff;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  &:disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ebeef5;
  }
  // 用primary\success\warning\danger集合结合@for循环生成每种类型的样式
  &.primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    &:hover {
      background-color: #66b1ff;
      border-color: #66b1ff;
    }
    &:active {
      background-color: #3a8ee6;
      border-color: #3a8ee6;
    }
    &:focus {
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
    }
    &:disabled {
      background-color: #c6e2ff;
      border-color: #c6e2ff;
    }
  }
  &.success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
    &:hover {
      background-color: #85ce61;
      border-color: #85ce61;
    }
    &:active {
      background-color: #58b129;
      border-color: #58b129;
    }
    &:focus {
      box-shadow: 0 0 0 2px rgba(103, 194, 58, 0.2);
    }
    &:disabled {
      background-color: #c3e6cb;
      border-color: #c3e6cb;
    }
  }
  &.warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
    &:hover {
      background-color: #ebb563;
      border-color: #ebb563;
    }
    &:active {
      background-color: #d89c29;
      border-color: #d89c29;
    }
    &:focus {
      box-shadow: 0 0 0 2px rgba(230, 162, 60, 0.2);
    }
    &:disabled {
      background-color: #fceec9;
      border-color: #fceec9;
    }
  }
  &.danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
    &:hover {
      background-color: #f78989;
      border-color: #f78989;
    }
    &:active {
      background-color: #ec5252;
      border-color: #ec5252;
    }
    &:focus {
      box-shadow: 0 0 0 2px rgba(245, 108, 108, 0.2);
    }
    &:disabled {
      // 灰色
      background-color: #fde2e2;
      border-color: #fde2e2;
    }
  }
}
</style>
