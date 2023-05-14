import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { switchMap, take, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any>{
    //   if(!this.authService.isUserAuthentication){
    //     this.router.navigateByUrl('/auth');
    //   }
    //   return this.authService.isUserAuthentication;
    return this.authService.isUserAuthentication.pipe(
      take(1),
      switchMap(isAuthenticated => {
        if(!isAuthenticated){
          return this.authService.autoLogin();
        }else{
          return of(isAuthenticated);
        }
      }),
      tap((isAuthenticated: any) =>{
        if(!isAuthenticated){
          this.router.navigateByUrl('/auth');
        }
      })
    )
  }
  
}
