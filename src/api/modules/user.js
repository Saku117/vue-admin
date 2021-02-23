import url from '../url'
import axios from 'axios'


export default {
    /**
     * 登录接口
     * @param {String} name 用户名 
     * @param {String} password 密码
     */
    async Login(name,password){
        try{
            const urls = url.baseUrl + url.user.login;
            const params = {
                name,
                password
            }
            const resp = await axios.post(urls,params);
            return resp;
        }catch(e){
            return e;
        }
    },
    /**
     * 注册接口
     * @param {String} name 用户名
     * @param {String} password 密码
     */
    async register(name,password){
        try{
            const urls = url.baseUrl + url.user.register;
            const params = {
                name,
                password
            }
            const resp = await axios.post(urls,params);
            return resp;
        }catch(e){
            return e;
        }
    },
    async updatepassword(name,oldPassword,newPassword){
        try{
            const urls = url.baseUrl+url.user.updatepassword;
            const params = {
                name,
                oldPassword,
                newPassword
            }
            const resp = await axios.post(urls,params);
            return resp;
        }catch(e){
            return e;
        }
    }
}