// import * as WebSocket from 'ws';
// import { WebSocketAdapter } from '@nestjs/common';
// import { IoAdapter } from '@nestjs/websockets';
// import { MessageMappingProperties } from '@nestjs/websockets';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/observable/empty';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/filter';

// export class WsAdapter extends IoAdapter {
//   public bindMessageHandlers(
//     client,
//     handlers: MessageMappingProperties[],
//     process: (data: any) => Observable<any>,
//   ) {
//     handlers.forEach(({ message, callback }) => {
// 			client.on('event', function (data, ack) {
// 				console.log('DATA', data)
// 				ack('woot')
// 			})
// 			Observable.fromEvent(client, message)
// 			.switchMap(data => process(callback(data)))
// 			.filter(result => !!result && result.event)
// 			.subscribe(({ event, data }) => client.emit(event, data))
// 		});
//   }
// }
