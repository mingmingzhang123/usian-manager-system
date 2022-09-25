// 引入axios实例对象
import request from "@/utils/rqeuire";
// 获取供应商列表接口
const getgoodsList = (page, size, data) => {
    return request({
        url: `goods/list/search/${page}/${size}`,
        method: 'POST',
        data
    })
}
// 删除供应商列表接口
const Detelegoods = (id) => {
    return request({
        url: `goods/${id}`,
        method: 'DELETE'
    })
}
// 新增供应商列表接口
const Addgoods = (data) => {
    return request({
        url: 'goods',
        method: 'POST',
        data
    })
}
// 编辑供应商列表接口
const Editgoods = (id, data) => {
    return request({
        url: `goods/${id}`,
        method: 'PUT',
        data
    })
}

// 查询单个供应商列表接口
const findgoods = (id) => {
    return request({
        url: `goods/${id}`,
        method: 'GET'
    })

}










export default {
    getgoodsList,
    Detelegoods,
    Addgoods,
    Editgoods,
    findgoods
}