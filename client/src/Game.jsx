import { Chat, useGame } from "@empirica/core/player/classic/react";

import React from "react";
import { Profile } from "./Profile";
import { Stage } from "./Stage";
import { ChatHf } from "./components/Chat";
import { CommentSection } from "./components/Suggestions";

export function Game() {
  const game = useGame();
  const { chatEnabled, suggestionsEnabled } = game.get("treatment");

  return (
    <div className="h-full w-full flex overflow-y-auto">
      <div className="h-full w-full flex flex-col">
        <Profile />
        <div className="h-full flex items-center overflow-y-auto">
          <div style={{ width: '100%', maxWidth: '800px' }}>
            <Stage />
          </div>
        </div>
      </div>
    </div>
  );
}
