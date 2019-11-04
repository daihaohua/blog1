
import $axios from "axios"

// export function ajax(url,data={},method="get"){
//     return new Promise(async (res,rej)=>{
//         let result ;
//         if(method==="get"){
//             result = await $axios.get(url,{params: data})
//             res(result)
//         }else{
//             result = await $axios.post(url,data)
//             res(result)
//         }
// 		
//     }).then((result)=>{
//         result.data.returnState = 1
//         return result.data
//     }).catch((err)=>{
//         return "请求数据失败"+err;
//     })
// }
//改版
export function ajax(url,data={},method="get"){
    return new Promise((res,rej)=>{
        let result ;
        if(method==="get"){
            result = $axios.get(url,{params: data})
            res(result)
        }else{
            result = $axios.post(url,data)
            res(result)
        }
		
		result.then((result)=>{
			// 请求成功
			res(result)
		}).catch((err)=>{
			// 请求失败
			Message({
				type: 'error',
				message: "接口请求失败"
			});
		})
    })
}