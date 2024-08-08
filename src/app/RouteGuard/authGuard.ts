import { ActivatedRouteSnapshot, RouterState } from "@angular/router"
import { AuthService } from "../Services/auth.service"
import { inject } from "@angular/core"
import { map } from "rxjs/operators"
export const  canActivate=(router:ActivatedRouteSnapshot,state:RouterState)=>{
    const authService:AuthService=inject(AuthService)
    return authService.user.pipe(map((user)=>{
        return user?true:false
    }))
}