<template>
  <div class="mt-2">
    <!-- 搜索功能 -->
    <el-form
      :inline="true"
      ref="staffQueryParams"
      :model="staffQueryParams"
      class="demo-form-inline"
    >
      <el-form-item prop="username">
        <el-input
          v-model="staffQueryParams.username"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="staffQueryParams.name"
          placeholder="姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryStaff">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button  @click="handleReset('staffQueryParams')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="staffList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="username" label="账号">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="110"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="salary" label="薪酬"> </el-table-column>
      <el-table-column prop="entryDate" label="入职时间"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDeletestaff(scope.row.id)"
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
        <el-form-item label="账号" prop="username">
          <el-input v-model="dialogForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="dialogForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="dialogForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="薪酬" prop="salary">
          <el-input v-model="dialogForm.salary" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="入职时间" prop="entryDate">
         <el-form-item prop="entryDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="dialogForm.entryDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
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
import StaffApi from "../../api/staff";
export default {
  data() {
    return {
      staffList: [], //总数据
      page: 1, //当前页码
      size: 10, //当前条数
      totle: 0, //总条数
      // 搜索表单
      staffQueryParams: {
        name: "", //姓名
        username: "", //账号
      },
      // 弹出框数据
      dialogForm: {
        name: "",
        username: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      // 弹出框的展示与隐藏
      dialogFormVisible: false,
      // 弹出框title显示的信息
      dialogTitle: "",
      // 校验弹出框表单
      dialogFormrules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
          username: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getstaff();
  },
  methods: {
    // 获取供应商列表数据
    async getstaff() {
      const { totle, rows } = await StaffApi.getstaffList(
        this.page,
        this.size,
        this.staffQueryParams
      );
      //    总条数
      this.totle = totle;
      //   总数据
      this.staffList = rows;
    },
    // 获取条数
    handleSizeChange(val) {
      this.size = val;
      this.getstaff();
    },
    // 获取当前页码
    handleCurrentChange(val) {
      this.page = val;
      this.getstaff();
    },
    // 查询供应商列表
    handleQueryStaff() {
      this.getstaff();
    },
    // 表单重置
    handleReset(formName) {
      console.log(111);
      this.$refs[formName].resetFields();
    },
    // 删除供应商列表
    handleDeletestaff(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 调用删除供应商列表的api
          try {
            const response = await StaffApi.DeteleStaff(id);
            this.getstaff();
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
        this.dialogTitle = "员工编辑";
        this.handlefindStaff(id);
        return;
      }
      // 如果不是就显示新增
      this.dialogTitle = "员工新增";
      // 将当前行id传给查找单个会员列表
    },
    // 弹出框的登录
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        // 判断有没有id有id执行编辑功能，没有id就执行添加
        this.dialogForm.id ? this.handleAddstaff() : this.handleEmitstaff();
      });
    },
    // 新增供应商列表
    async handleAddstaff() {
      try {
        // 调用member的api
        const response = await StaffApi.Addstaff(this.dialogForm);
        // 弹出框隐藏
        this.dialogFormVisible = false;
        this.$message.success("新增成功");
        // 清空表单
        this.handleReset("dialogForm");
        this.getstaff();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 编辑供应商列表
    async handleEmitstaff() {
      try {
        const response = await StaffApi.Editstaff(
          this.dialogForm.id,
          this.dialogForm
        );
        // 弹出框隐藏
        this.dialogFormVisible = false;
        this.$message.success("更改成功");
        // 清空表单
        this.handleReset("dialogForm");
        //  从新调用请求数据
        this.getstaff();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 查询单个供应商列表
    async handlefindStaff(id) {
      try {
        const response = await StaffApi.findStaff(id);
        // 将返回的数据返回给弹出框表单
        this.dialogForm = response;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>