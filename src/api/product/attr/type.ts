import { b } from "node_modules/vite-plugin-mock/dist/types-b01b7736.js";

// 分类相关的数据ts类型
export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

// 分类ts类型
export interface CategoryObj {
    id: number | string; // 分类id
    name: string;
    catagory1Id?: number | string; // 二级分类id
    catagory2Id?: number | string; // 三级分类id
}

// 相应的分类接口返回数据ts类型
export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]; // 分类数据
}

// 属性ts类型
export interface AttrValue {
    id?: number | string; // 属性id
    valueName: string; // 属性名称
    attrId?: number | string; // 属性id
    flag?: boolean; // 是否被选中
}

// 属性值的数组ts类型
export type AttrValueList = AttrValue []; // 属性值的数组

// 属性对象
export interface Attr {
    id?: number | string; // 属性id
    attrName: string; // 属性名称
    categoryId: number | string; // 分类id
    categoryLevel: number | string; // 分类级别
    attrValueList: AttrValueList; // 属性值的数组
}

// 存储每一个属性对象的数组ts类型
export type AttrList = Attr[]; // 存储每一个属性对象的数组

// 接口返回的数据ts类型
export interface AttrResponseData extends ResponseData {
    data: AttrList; // 属性对象的数组
}
