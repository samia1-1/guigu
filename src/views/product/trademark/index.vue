<template>
  <div class="trademark-container">
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <el-table style="margin: 10px 0px" border :data="trademarkArr" stripe>
        <!-- 默认使用div -->
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName">
          <template #="{ row, $index }">
            <pre style="color: brown">
            {{ row.tmName }}
          </pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" alt="图片不存在" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="($event) => updateTrademark(row)">修改</el-button>
            <el-popconfirm :title="`您确定删除${row.tmName}?`" width="250px" icon="Delete"
              @confirm="($event) => removeTrademark(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
        :background="true" layout="prev,pager,next,jumper,->,sizes,total" :total="total"
        @current-change="getHasTrademark" @size-change="getHasTrademark" />
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="30%">
      <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="80px" props="tmName">
          <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px" props="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="text-align: right">
          <el-button type="primary" size="default" @click="cancel">取消</el-button>
          <el-button type="primary" size="default" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import { ElMessage } from 'element-plus';
import type { UploadProps } from 'element-plus';
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from "@/api/product/trademark";
import type {
  TradeMark,
  TradeMarkResponseData,
} from "@/api/product/trademark/type";

let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let trademarkArr = ref([]);
let dialogFormVisible = ref<boolean>(false);
let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
let formRef = ref();
// 通过判断传入的值是否为页面大小选项之一来区分事件类型
const getHasTrademark = async (val = 1) => {
  // 如果传入值是分页大小选项之一，说明是 size-change 事件
  if ([3, 5, 7, 9].includes(val) && val !== pageNo.value) {
    pageNo.value = 1; // 重置到第一页
    limit.value = val; // 更新每页显示数量
  } else {
    // 否则就是 current-change 事件或初始加载
    pageNo.value = val;
  }

  try {
    let result: TradeMarkResponseData = await reqHasTrademark(
      pageNo.value,
      limit.value
    );
    if (result.code === 200) {
      total.value = result.data.total;
      trademarkArr.value = result.data.records;
    } else {
      console.error("获取品牌数据失败", result.message);
    }
  } catch (error) {
    console.error("获取品牌数据时发生错误", error);
  }
};

onMounted(() => {
  console.log("品牌管理页面已挂载");
  getHasTrademark();
});
// 添加品牌
const addTrademark = () => {
  dialogFormVisible.value = true;
  (trademarkParams.id = 0), (trademarkParams.tmName = "");
  trademarkParams.logoUrl = "";
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });
};

// 修改品牌
const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });
  dialogFormVisible.value = true;

  Object.assign(trademarkParams, row);
};

// 取消上传
const cancel = () => {
  dialogFormVisible.value = false;
};
// 上传图片
const confirm = async () => {
  await formRef.value.validate();
  if (!trademarkParams.tmName || !trademarkParams.logoUrl) {
    ElMessage.error("品牌名称和LOGO不能为空!");
    return;
  }
  try {
    let result = await reqAddOrUpdateTrademark(trademarkParams);
    if (result.code === 200) {
      // Different message based on operation type
      ElMessage.success(trademarkParams.id ? "修改品牌成功" : "添加品牌成功");
      dialogFormVisible.value = false;
      getHasTrademark(trademarkParams.id ? pageNo.value : 1); // Refresh the list
    } else {
      ElMessage.error(trademarkParams.id ? "修改品牌失败" : "添加品牌失败");
    }
  } catch (error) {
    console.error("品牌操作出现错误", error);
    ElMessage.error("操作失败，请检查网络或数据格式");
  }
};
//上传前
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/png" ||
    rawFile.type == "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage.error("上传图片大小不能超过 4MB!");
    }
  } else {
    ElMessage.error("上传图片只能是 JPG/PNG/GIF 格式!");
  }
};
// 上传成功
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  trademarkParams.logoUrl = response.data;
  formRef.value.clearValidate("logoUrl");
};
//自定义校验规则
const validatorTmName = (rule, value, callBack) => {
  if (value.trim().length >= 2) {
    callBack;
  } else {
    callBack(new Error("品牌名称长度至少为2位"));
  }
};

const validatorLogoUrl = (rule, value, callBack) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error("请上传品牌LOGO"));
  }
};
// 表单校验规则
const rules = {
  tmName: [{ required: true, trigger: "blur", validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
};

// 删除品牌
const removeTrademark = async (id: number) => {
  try {
    let result = await reqDeleteTrademark(id);
    if (result.code === 200) {
      ElMessage.success("删除品牌成功");
      getHasTrademark(
        trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1
      );
    } else {
      ElMessage.error("删除品牌失败");
    }
  } catch (error) {
    console.error("删除品牌时发生错误", error);
    ElMessage.error("删除品牌失败，请检查网络或数据格式");
  }
};
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.trademark-container {
  width: 100%;
}
</style>
