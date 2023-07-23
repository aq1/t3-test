import * as Popover from "@radix-ui/react-popover";
import { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";

export default function Index() {
  const [m, setM] = useState([]);
  const pusher = useMemo(() => {
    const p = new Pusher("test", {
      wssPort: 443,
      wsPort: 80,
      wsHost: "soketi.do-not-tread-on.me",
    });

    const channel = p.subscribe("my-channel");

    channel.bind("my-event", function (data) {
      setM((prevState) => [...prevState, data]);
    });
    console.log("bind");
    return p;
  }, []);

  useEffect(() => {
    return () => {
      pusher.unsubscribe("my-event");
    };
  }, []);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div>
        <h2>Messages length {m.length} </h2>
      </div>
      <div>
        {m.map((msg) => (
          <div key={msg.id}>{msg.message}</div>
        ))}
      </div>
    </div>
  );
}
