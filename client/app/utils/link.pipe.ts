import { Pipe, PipeTransform  } from '@angular/core';

/**
 * Simple url and twitter user links rewrite pipe.
 */
@Pipe({name: 'link'})
export class LinkPipe implements PipeTransform {

  transform (text: string): string {
    // rewrite urls
    let urlRegEx = /(https?:\/\/[^\s]+)/g;
    text = text.replace( urlRegEx, function(url) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    });

    // rewrite user mentions
    let userRegEx = /(\@[^\s]+)/g;
    text = text.replace( userRegEx, function(user) {
      return `<a href="https://www.twitter.com/${user.substring(1).replace(':', '')}" target="_blank">${user}</a>`;
    });

   return text; 
  }
}