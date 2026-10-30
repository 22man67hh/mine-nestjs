import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser=createParamDecorator(
    (data:string,ctx:ExecutionContext)=>{
        const request =ctx.switchToHttp().getRequest();
        const user=request.user
        if(data){
            if(data==='id' || data==='userId'){
                return user?.id 
            }
            return user?.[data]
        }
        return user
    }
)