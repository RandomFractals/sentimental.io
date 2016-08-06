// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable
// Note: see node_module/rxjs/Rxjs.js for more info

// import just rxjs statics and operators we need for this app

// statics
import 'rxjs/add/observable/throw';

// operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
