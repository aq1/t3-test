import { Doc } from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useState } from "react";
import { USER_COLORS, USER_NAMES } from "../utils/constants";

export function Author() {
  return (
    <a
      className="author"
      href="https://twitter.com/nayajunimesh"
      target="_blank"
      rel="noreferrer"
    >
      @nayajunimesh
    </a>
  );
}

interface CursorProps {
  cursor: {
    x: number;
    y: number;
  };
  color: string;
  name: string;
}

export const Cursor = React.memo(({ cursor, color, name }: CursorProps) => {
  const { x, y } = cursor;

  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        userSelect: "none",
        left: 0,
        top: 0,
        transition: "transform 0.5s cubic-bezier(.17,.93,.38,1)",
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <svg
        className="cursor"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>

      <div
        style={{
          backgroundColor: color,
          borderRadius: 4,
          position: "absolute",
          top: 20,
          left: 10,
          padding: "5px 10px",
        }}
      >
        <p
          style={{
            whiteSpace: "nowrap",
            fontSize: 13,
            color: "white",
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
});
import { useUsers } from "y-presence";
import React, { ComponentProps } from "react";

function Room() {
  const users = useUsers(awareness);

  const handlePointMove = React.useCallback((e: React.PointerEvent) => {
    awareness.setLocalStateField("cursor", {
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  return (
    <div className="room" onPointerMove={handlePointMove}>
      <div className="info">Number of connected users: {users.size}</div>

      {Array.from(users.entries()).map(([key, value]) => {
        if (key === awareness.clientID) return null;

        if (!value.cursor || !value.color || !value.name) return null;
        return (
          <Cursor
            key={key}
            cursor={value.cursor as ComponentProps<typeof Cursor>["cursor"]}
            color={value.color as ComponentProps<typeof Cursor>["color"]}
            name={value.name as ComponentProps<typeof Cursor>["name"]}
          />
        );
      })}
    </div>
  );
}

export function Link() {
  return (
    <div className="link">
      <a
        className="y-presence"
        href="https://github.com/nimeshnayaju/y-presence"
        target="_blank"
        rel="noreferrer"
      >
        y-presence
      </a>
    </div>
  );
}

const VERSION = 1;

// Create the shared doc
const doc = new Doc();

// Create a websocket provider
const provider = new WebsocketProvider(
  "ws://localhost:1235",
  `y-presence-cursors-${VERSION}`,
  doc
);

export const awareness = provider.awareness;

const random = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const name = random(USER_NAMES);
const color = random(USER_COLORS);

awareness.setLocalState({ name, color });

export default function YjsTest() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onSync = (isSynced: boolean) => {
      if (isSynced) {
        setLoading(false);
      }
    };

    provider.on("sync", onSync);

    return () => provider.off("sync", onSync);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      <Link />
      <Author />
      <Room />
    </div>
  );
}
