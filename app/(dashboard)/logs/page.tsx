"use client";

import LogTable from "@/components/logs/log-table";
import { Badge } from "@/components/ui/badge";
import { Log, LogsContext } from "@/lib/contexts/logs-context";
import { fetchAPI } from "@/lib/utils";
import React from "react";

export default function Logs() {
  const [logs, setLogs] = React.useState<Log[]>([]);
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    let host = process.env.NEXT_PUBLIC_API_URL || "localhost:8000";
    host = host.replace("http://", "");

    const ws = new WebSocket(
      `ws://${host}/api/v1/logs/connect`
    );

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLogs((logs) => [data, ...logs]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <LogsContext.Provider value={{ data: logs }}>
      <h1 className="text-6xl font-bold mt-10 mb-5 flex items-center gap-5">Logs <Badge variant="default" className={`ml-2 ${connected ? "bg-green-200" : "bg-red-500"}`}>{connected ? "Connected" : "Disconnected"}</Badge></h1>
      <LogTable />
    </LogsContext.Provider>
  );
}
