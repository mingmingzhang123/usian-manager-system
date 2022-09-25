<template>
  <div class="mt-2">
    <!-- 搜索功能 -->
    <el-form
      :inline="true"
      ref="memberQueryForm"
      :model="memberQueryParams"
      class="demo-form-inline"
    >
      <el-form-item prop="cardNum">
        <el-input
          v-model="memberQueryParams.cardNum"
          placeholder="会员卡号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="memberQueryParams.name"
          placeholder="会员姓名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="region">
        <el-select v-model="memberQueryParams.region" placeholder="支付类型">
          <el-option
            v-for="(item, index) in payType"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryMember">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button  @click="handleReset('memberQueryForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="memberList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号" width="110">
      </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          {{ scope.row.payType | filterspayType }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="150">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpenDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDeletemember(scope.row.id)"
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
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="dialogForm.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="dialogForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="dialogForm.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="dialogForm.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="dialogForm.payType" placeholder="支付类型">
            <el-option
              v-for="(item, index) in payType"
              :key="index"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="dialogForm.address"></el-input>
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
// 引入会员管理的api
import MemberApi from "../../api/member";
// 引入支付类型
import MemberEnum from "../../enum/member";

export default {
  data() {
    return {
      memberList: [], //总数据
      page: 1, //当前页码
      size: 10, //当前条数
      memberQueryParams: {
        cardNum: "", //会员卡号
        name: "", //会员姓名
        payType: "", //支付类型
        birthday: "", //出生日期
      },
      totle: 0, //总条数
      // 获取支付类型的方法
      payType: MemberEnum.payType,
      // 弹出框数据
      dialogForm: {
        cardNum: "",
        name: "",
        phone: "",
        money: "",
        integral: "",
        payType: "",
        address: "",
      },
      // 弹出框的展示与隐藏
      dialogFormVisible: false,
      // 弹出框title显示的信息
      dialogTitle: "",
      // 校验弹出框表单
      dialogFormrules: {
        cardNum: [
          { required: true, message: "请输入会员卡号", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入会员姓名", trigger: "blur" }],
        payType: [
          { required: true, message: "请输入支付类型", trigger: "change" },
        ],
      },
    };
  },
  //   过滤器
  filters: {
    filterspayType(val) {
      // console.log(val);
      //   将支付类型遍历
      let data = MemberEnum.payType.find((item, index) => {
        // 看当前支付类型跟item是否一致并返回给data
        return item.type === val;
      });
      // 判断data能不能获取到能的话就把当前的名字返回出去，不能就返回一个空
      return data ? data.name : "";
    },
  },
  created() {
    this.getmember();
  },
  methods: {
    // 获取会员列表数据
    async getmember() {
      const { totle, rows } = await MemberApi.getMemberList(
        this.page,
        this.size,
        this.memberQueryParams
      );
      //    总条数
      this.totle = totle;
      //   总数据
      this.memberList = rows;
    },
    // 查询会员列表
    handleQueryMember() {
      this.getmember();
    },
    // 获取条数
    handleSizeChange(val) {
      this.size = val;
      this.getmember();
    },
    // 获取当前页码
    handleCurrentChange(val) {
      this.page = val;
      this.getmember();
    },
    // 表单重置
    handleReset(formName) {
      console.log(111);
      this.$refs[formName].resetFields();
    },
    // 删除会员列表
    handleDeletemember(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 调用删除会员列表的api
          try {
            const response = await MemberApi.DeteleMember(id);
            this.getmember();
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
        this.dialogTitle = "会员编辑";
        this.handlefindMember(id);
        return;
      }
      // 如果不是就显示新增
      this.dialogTitle = "会员新增";
      // 将当前行id传给查找单个会员列表
    },
    // 弹出框的登录
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        // 判断有没有id有id执行编辑功能，没有id就执行添加
        this.dialogForm.id ? this.handleEmitmember() : this.handleAddmember();
      });
    },
    // 新增会员列表
    async handleAddmember() {
      try {
        // 调用member的api
        const response = await MemberApi.Addmember(this.dialogForm);
        // 弹出框隐藏
        this.dialogFormVisible = false;
        this.$message.success("新增成功")
        // 清空表单
        this.handleReset("dialogForm");
        this.getmember();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 编辑会员列表
    async handleEmitmember() {
      try {
        const response = await MemberApi.Editmember(
          this.dialogForm.id,
          this.dialogForm
        );
        // 弹出框隐藏
        this.dialogFormVisible = false;
        this.$message.success("更改成功");
        // 清空表单
        this.handleReset("dialogForm");
        //  从新调用请求数据
        this.getmember();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 查询单个会员列表
    async handlefindMember(id) {
      try {
        const response = await MemberApi.findMember(id);
        // 将返回的数据返回给弹出框表单
        this.dialogForm = response;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>