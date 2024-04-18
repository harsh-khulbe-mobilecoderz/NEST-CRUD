
class ResponseHelper {
    public async responseHandler(res:any,statusCode:any,statusText:any,message:any,
        data:any,token?:any
    )
    {
        return res.status(statusCode).json({status:statusCode,statusText,message,data,token})
    }
}

export default new ResponseHelper();