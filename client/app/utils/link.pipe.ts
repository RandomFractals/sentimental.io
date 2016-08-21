import { Pipe, PipeTransform  } from '@angular/core';

/**
 * Defines simple url rewrite pipe 
 * that converts http* strings into html links.
 */
@Pipe({name: 'link'})
export class LinkPipe implements PipeTransform {

  transform (text: string): string {
    let urlRegEx = /(https?:\/\/[^\s]+)/g;
    return text.replace( urlRegEx, function(url) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    })
  }
}