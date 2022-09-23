<template>
  <div class="mt-2">
    <!-- 搜索功能 -->
    <el-form :inline="true" :model="memberQueryParams" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="memberQueryParams.cardNum"
          placeholder="会员卡号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="memberQueryParams.name"
          placeholder="会员姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
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
        <el-button type="primary">新增</el-button>
        <el-button type="primary">重置</el-button>
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
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
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
      // 获取支付类型的
      payType: MemberEnum.payType,
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
        this.size=val
      this.getmember();
      },
      // 获取当前页码
      handleCurrentChange(val) {
       this.page=val
      this.getmember();
      }
  },
};
</script>
<style lang="scss" scoped>
</style>