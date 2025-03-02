// hooks/useSocketHandlers.ts
import { socket } from "@/socket";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAddIncidents,
  setDeleteIncidents,
  setUpdateIncidents,
} from "../store/slices/calendarSlice";
import { IIncident } from "../types/common/i-incident";
import { getIncident } from "../utils/getIncident";

export const useSocketHandlers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect(massage?: string) {
      console.log(`Connected to WebSocket ${massage}`);
    }

    function onDisconnect() {
      console.log("WebSocket disconnected");
    }

    socket.on("connection", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("incidentUpdatedRecive", (updatedIncident: IIncident) => {
      console.log("AAAA", updatedIncident);
      dispatch(setUpdateIncidents(updatedIncident));
    });

    socket.on("incidentDeletedRecive", (deletedIncidentId: number) => {
      dispatch(setDeleteIncidents(deletedIncidentId));
    });

    socket.on("incidentAddRecive", (addedIncident: IIncident) => {
      const newData = getIncident(addedIncident);
      dispatch(setAddIncidents(newData));
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);
};
