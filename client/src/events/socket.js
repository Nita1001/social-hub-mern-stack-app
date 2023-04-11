import { io } from 'socket.io-client';

import { SOCKET_SERVER_URL } from './constants/server.js';

export const socket = io(SOCKET_SERVER_URL);

