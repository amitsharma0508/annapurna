import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, NavigationStart, PRIMARY_OUTLET, Router } from '@angular/router';
// import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  subscription: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.authService.isUserLoggedIn()) {
        if (this.isPageRefresh()) {
          this.router.navigateByUrl( this.getUrlWithoutSecondary(state) );
          return false;
        }

        return true;
      }

      this.router.navigate(['login']);
      return false;
  }

  private getUrlWithoutSecondary( routerStateSnapshot: RouterStateSnapshot ): UrlTree {
    const urlTree = this.router.parseUrl( routerStateSnapshot.url );
    let segment = urlTree.root;

    while ( segment && segment.children ) {
      delete( segment.children['secondary'] );
      segment = segment.children[ PRIMARY_OUTLET ];
    }
    return( urlTree );
  }

  // determine if the current route-request is part of a page refresh.
  private isPageRefresh(): any {
    this.subscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        return( ! this.router.navigated );
      }
    });

    return;
  }
}
