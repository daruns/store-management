// import { Logger } from "@nestjs/common";
// import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
// // import { AnyLengthString } from "aws-sdk/clients/comprehendmedical";
// import { Socket } from "dgram";
// const options = {
//     cors: {
//         credentials: true,
//         origin: true,
//         }
//   }
  
// @WebSocketGateway(options)
// export class ChatGateway implements OnGatewayInit {
//     @WebSocketServer() server;
//     private logger: Logger = new Logger('AppGateway')
//     afterInit(client: Socket) {
//         this.logger.log("connected")
//     }
//     on
    

//     @SubscribeMessage('message')
//     handleMessage(
//         @MessageBody() data: string,
//         @ConnectedSocket() client: Socket,
//       ): string {
//         return data;
//       }
//   }
