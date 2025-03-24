import request from '@/utils/request.js'
import type { TradeMarkResponseData,TradeMark } from './type.js'
enum API{
    // 获取已有信息接口
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    //添加品牌
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    // 修改品牌
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    // 删除已有品牌
    DELETE_URL= '/admin/product/baseTrademark/remove/',
}
// 获取方法
export const reqHasTrademark =(page:number,limit:number)=>request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`);

// 添加品牌与修改品牌方法
export const reqAddOrUpdateTrademark =(data:TradeMark)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATETRADEMARK_URL,data)
    }else{
        return request.post<any,any>(API.ADDTRADEMARK_URL,data)
    }
}
// 删除已有品牌方法
export const reqDeleteTrademark =(id:number)=>request.delete<any,any>(API.DELETE_URL+id)
