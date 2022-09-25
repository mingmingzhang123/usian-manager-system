// 引入axios实例对象
import request from "@/utils/rqeuire";
// 获取会员列表接口
const getMemberList = (page, size, data) => {
    return request({
        url: `member/list/search/${page}/${size}`,
        method: 'POST',
        data
    })
}
// 删除会员列表接口
const DeteleMember = (id) => {
    return request({
        url: `member/${id}`,
        method: 'DELETE'
    })
}
// 新增会员列表接口
const Addmember = (data) => {
    return request({
        url: 'member',
        method: 'POST',
        data
    })
}
// 编辑会员列表接口
const Editmember = (id, data) => {
    return request({
        url: `member/${id}`,
        method: 'PUT',
        data
    })
}

// 查询单个会员列表接口
const findMember = (id) => {
    return request({
        url: `member/${id}`,
        method: 'GET'
    })

}










export default {
    getMemberList,
    DeteleMember,
    Addmember,
    Editmember,
    findMember
}