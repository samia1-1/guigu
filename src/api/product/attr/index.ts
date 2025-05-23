import request from '@/utils/request.js'
import type { CategoryResponseData, AttrResponseData } from './type.js'
enum API {
    // 获取一级分类
    C1_URL = '/admin/product/getCategory1',
    // 获取二级分类
    C2_URL = '/admin/product/getCategory2/',
    // 获取三级分类
    C3_URL = '/admin/product/getCategory3/',
    // 获取内容
    ATTR_URL = '/admin/product/attrInfoList/',
    // 添加或修改属性
    ADDORUPDATE_URL = '/admin/product/saveAttrInfo',
    // 删除属性
    DELETEATTR_URL = '/admin/product/deleteAttr/',
}

// 方法
export const reqC1 = () => request.get<any,CategoryResponseData>(API.C1_URL);
export const reqC2 = (category1Id: number|string) => request.get<any,CategoryResponseData>(API.C2_URL + category1Id);
export const reqC3 = (category2Id: number|string) => request.get<any,CategoryResponseData>(API.C3_URL + category2Id);
export const reqAttr = (category1Id: number|string, category2Id: number|string, category3Id: number|string) => request.get<any,AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`);
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATE_URL, data);
export const reqRemoveAttr = (attrid: number|string) => request.delete<any, any>(API.DELETEATTR_URL + attrid);