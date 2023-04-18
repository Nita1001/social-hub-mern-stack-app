// import { io } from 'socket.io-client';

// import { SOCKET_SERVER_URL } from './constants/server.js';

// export const socket = io(SOCKET_SERVER_URL);

// ----------------- 

import { useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import { LoginContext } from '../contexts/LoginContext';

import { SOCKET_SERVER_URL } from './constants/server.js';

export const useSocket = () => {
    const { userId } = useContext(LoginContext);
    const socket = useMemo(
        () =>
            io(SOCKET_SERVER_URL, {
                query: {
                    clientId: userId,
                },
            }),
        [userId]
    );

    return socket;
};