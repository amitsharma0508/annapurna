import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
import { map, flatMap, tap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = {};
        const params = {};
        const { method, url } = request;
        const platform = 'corodova'; // Get this value from platform status  like android, ios...etc
        return (platform === 'corodova' 
            ? this.callNative(url, method, headers, params) 
            : next.handle(request)).do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.type === 4) {}
                }
        }, 
          (error: any) => {
            if (error instanceof HttpErrorResponse) {}
          }
        );
    }

    callNative(url: any, method: any, headers: any, params: any) {
        return Observable.create((ob : any) => {
            document.addEventListener('deviceready', () => {
                switch (method) {
                    case 'GET':
                        cordova.plugin.http.get(url, headers, params, this.successCallback(ob), this.errorCallback(ob));
                        break;
                    case 'POST':
                        cordova.plugin.http.post(url, headers, params, this.successCallback(ob), this.errorCallback(ob));
                        break;
                    case 'PUT':
                        cordova.plugin.http.put(url, headers, params, this.successCallback(ob), this.errorCallback(ob));
                        break;
                    case 'DELETE':
                        cordova.plugin.http.delete(url, headers, params, this.successCallback(ob), this.errorCallback(ob));
                        break;
                }
            })
            
        });
    }

    successCallback(ob: any) {
        return (response: any) => {ob.next(new HttpResponse({ body: JSON.parse(response.data) }));
            ob.complete();
        };
    }

    errorCallback(ob: any) {
        return (response: any) => {ob.next(new HttpErrorResponse({ error: JSON.parse(response.error) }));
            ob.complete();
        };
    }
}
