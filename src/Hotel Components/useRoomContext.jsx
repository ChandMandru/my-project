import React, { useMemo,useState,createContext,useContext,useCallback} from "react";

export const RoomContext = createContext(undefined);

export function RoomContextProvider({ children }) {

  const [room, setRoom] = useState();

  const setRoomContext = useCallback((room) => {
    setRoom(room)
  }, []);

  const value = useMemo(
    () => ({
      room,
      setRoomContext
    }),
    [room]
  );

  return (
    <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
  );
}

export function useRoomContext() {
  const context = useContext(RoomContext);
  return context;
}
