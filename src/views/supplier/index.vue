<template>
  <div class="mt-2">
    <!-- 搜索功能 -->
    <el-form
      :inline="true"
      ref="supplierQueryParams"
      :model="supplierQueryParams"
      class="demo-form-inline"
    >
      <el-form-item prop="name">
        <el-input
          v-model="supplierQueryParams.name"
          placeholder="供应商名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input
          v-model="supplierQueryParams.linkman"
          placeholder="联系人"
        ></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input
          v-model="supplierQueryParams.mobile"
          placeholder="联系电话"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuerySupplier">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button  @click="handleReset('supplierQueryParams')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="supplierList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="供应商名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人" width="110">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDeletesupplier(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
    <!-- 弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        :model="dialogForm"
        style="width: 300px"
        ref="dialogForm"
        :rules="dialogFormrules"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="dialogForm.linkman" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="dialogForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dialogForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('dialogForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SupplierApi from "../../api/supplier";
export default {
  data() {
    return {
      supplierList: [], //总数据
      page: 1, //当前页码
      size: 10, //当前条数
      totle: 0, //总条数
      // 搜索表单
      supplierQueryParams: {
        name: "", //供应商名称
        linkman: "", //联系人
        mobile: "", //联系电话
      },
      // 弹出框数据
      dialogForm: {
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      // 弹出框的展示与隐藏
      dialogFormVisible: false,
      // 弹出框title显示的信息
      dialogTitle: "",
      // 校验弹出框表单
      dialogFormrules: {
        name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getsupplier();
  },
  methods: {
    // 获取供应商列表数据
    async getsupplier() {
      const { totle, rows } = await SupplierApi.getSupplierList(
        this.page,
        this.size,
        this.supplierQueryParams
      );
      //    总条数
      this.totle = totle;
      //   总数据
      this.supplierList = rows;
    },
    // 获取条数
    handleSizeChange(val) {
      this.size = val;
      this.getsupplier();
    },
    // 获取当前页码
    handleCurrentChange(val) {
      this.page = val;
      this.getsupplier();
    },
    // 查询供应商列表
    handleQuerySupplier() {
      this.getsupplier();
    },
    // 表单重置
    handleReset(formName) {
      console.log(111);
      this.$refs[formName].resetFields();
    },
    // 删除供应商列表
    handleDeletesupplier(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 调用删除供应商列表的api
          try {
            const response = await SupplierApi.Detelesupplier(id);
            this.getsupplier();
          } catch (e) {
            console.log(e.message);
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 弹出框展示
    handleOpenDialog(id) {
      this.dialogFormVisible = true;
      // 判断id的是不是number类型如果是显示编辑的信息
      if (typeof id == "number") {
        this.dialogTitle = "供应商编辑";
        this.handlefindSupplier(id);
        return;
      }
      // 如果不是就显示新增
      this.dialogTitle = "供应商新增";
      // 将当前行id传给查找单个会员列表
    },
    // 弹出框的登录
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        // 判断有没有id有id执行编辑功能，没有id就执行添加
        this.dialogForm.id ? this.handleAddsupplier() : this.handleEmitsupplier();
      });
    },
    // 新增供应商列表
    async handleAddsupplier() {
      try {
        // 调用member的api
        const response = await SupplierApi.Addsupplier(this.dialogForm);
        // 弹出框隐藏
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        // 清空表单
        this.handleReset("dialogForm");
        this.getsupplier();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 编辑供应商列表
    async handleEmitsupplier() {
      try {
        const response = await SupplierApi.Editsupplier(
          this.dialogForm.id,
          this.dialogForm
        );
        // 弹出框隐藏
        this.dialogFormVisible = false;
        this.$message.success("更改成功");
        // 清空表单
        this.handleReset("dialogForm");
        //  从新调用请求数据
        this.getsupplier();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 查询单个供应商列表
    async handlefindSupplier(id) {
      try {
        const response = await SupplierApi.findsupplier(id);
        // 将返回的数据返回给弹出框表单
        this.dialogForm = response;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>