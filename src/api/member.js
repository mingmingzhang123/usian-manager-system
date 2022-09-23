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

export default {
    getMemberList
}