export default class Endpoints{
    static  baseUrl="http://192.168.0.242:8080";
    static  loginUrl=this.baseUrl+"/user/login";
    static  metaUrl=this.baseUrl+"/meta";
    static  fetchUserUrl=this.baseUrl+"/user/fetch";
    static  createUserUrl=this.baseUrl+"/user/create";
    static  editUserUrl=this.baseUrl+"/user/edit";
    static  blockUnblockUserUrl=this.baseUrl+"/user/block-unblock";
    static  fetchUserDetailUrl=this.baseUrl+"/user/fetch-user-details";
    static  transferPointsUrl=this.baseUrl+"/transaction/transfer";
    static  withdrawPointsUrl=this.baseUrl+"/transaction/withdraw";
    static  fettchTransactionUrl=this.baseUrl+"/transaction/fetch";
}
