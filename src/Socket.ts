import socket from 'socket.io';

/*
 * The Socket class manages socket.io server
 */
export class Socket {

  // Socket
  public io: socket;

  /*
   * Initialize the IndexRouter
   */
  constructor(server, port) {
    this.io = socket(server);
    this.io.on('connection', this.onConnect);
  }

  /*
   * On connect
   */
  onConnect (client): void {
    console.log('Client connected to socket');

    client.on('disconnect', this.onDisconnect);
  };

  /*
   * On disconnect
   */
  onDisconnect (): void {
    console.log('Client disconnected');
  };
}