import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ajax, AjaxResponse} from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  key: string = '3696f7d6';
  URL: string = 'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint';

  constructor() { }

  public getArchivio() : Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.URL+'/get?key='+this.key,
      crossDomain: true,
    });

  }
  public setArchivio(newArchivio) : Observable<AjaxResponse<any>> {
    return ajax({
      method: 'POST',
      url: this.URL+'/set?key='+this.key,
      crossDomain: true,
      body: newArchivio
    });

  }

}