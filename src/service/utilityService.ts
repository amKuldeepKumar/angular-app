import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {


  delay = (delay: number) => {
    return new Promise(res => setTimeout(res, delay ? delay : 0));
  }
}
