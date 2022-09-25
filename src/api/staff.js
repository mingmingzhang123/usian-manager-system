// 引入axios实例对象
import request from "@/utils/rqeuire";
// 获取会员列表接口
const getstaffList = (page, size, data) => {
    return request({
        url: `staff/list/search/${page}/${size}`,
        method: 'POST',
        data
    })
}
// 删除会员列表接口
const DeteleStaff = (id) => {
    return request({
        url: `staff/${id}`,
        method: 'DELETE'
    })
}
// 新增会员列表接口
const Addstaff = (data) => {
    return request({
        url: 'staff',
        method: 'POST',
        data
    })
}
// 编辑会员列表接口
const Editstaff = (id, data) => {
    return request({
        url: `staff/${id}`,
        method: 'PUT',
        data
    })
}

// 查询单个会员列表接口
const findStaff = (id) => {
    return request({
        url: `staff/${id}`,
        method: 'GET'
    })

}










export default {
    getstaffList,
    DeteleStaff,
    Addstaff,
    Editstaff,
    findStaff
}