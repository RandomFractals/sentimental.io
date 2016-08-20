import { Pipe, PipeTransform  } from '@angular/core';

@Pipe({name: 'round'})
export class RoundPipe implements PipeTransform {

  transform (value: any, precision: any = 0): any {        
    if ( typeof precision === 'string') {
      precision = parseInt(precision);
    }        
    return this.createRound('round')(value, precision);
  }

  createRound (method: string): Function {
    const func = Math[method];
    return function (value: number, precision: number = 0) {        
      if (typeof value === 'string') {
        throw new TypeError('number must be a number');
      }        
      if (typeof precision === 'string') {
        throw new TypeError('precision must be a number');
      }
      if (precision) {            
        let pair = `${value}e`.split('e');
        const val = func( `${pair[0]}e` + (+pair[1] + precision));            
        pair = `${val}e`.split('e');
        return +(pair[0] + 'e' + (+pair[1] - precision));
      }        
      return func(value);
    };
  }  
}