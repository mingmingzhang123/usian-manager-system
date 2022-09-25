// 引入axios实例对象
import request from "@/utils/rqeuire";
// 获取供应商列表接口
const getSupplierList = (page, size, data) => {
    return request({
        url: `supplier/list/search/${page}/${size}`,
        method: 'POST',
        data
    })
}
// 删除供应商列表接口
const Detelesupplier = (id) => {
    return request({
        url: `supplier/${id}`,
        method: 'DELETE'
    })
}
// 新增供应商列表接口
const Addsupplier = (data) => {
    return request({
        url: 'supplier',
        method: 'POST',
        data
    })
}
// 编辑供应商列表接口
const Editsupplier = (id, data) => {
    return request({
        url: `supplier/${id}`,
        method: 'PUT',
        data
    })
}

// 查询单个供应商列表接口
const findsupplier = (id) => {
    return request({
        url: `supplier/${id}`,
        method: 'GET'
    })

}










export default {
    getSupplierList,
    Detelesupplier,
    Addsupplier,
    Editsupplier,
    findsupplier
}