import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import React from "react";
import { Game } from "./Game";
import { InitialSurvey } from "./intro-exit/Intro";
import { ExitSurvey } from "./intro-exit/ExitSurvey";
import { Consent } from "./intro-exit/intro-elements/Consent";
import { Lobby } from "./lobbies/Lobby";
import { NoGames } from "./lobbies/NoGames";
export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerKey = urlParams.get("participantKey") || "";

  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/query`;

  function introSteps({ game, player }) {
    return [];
  }

  function exitSteps({ game, player }) {
    return [ExitSurvey];
  }

  return (
    <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
      <div className="h-screen relative">
        <EmpiricaMenu position="bottom-left" />
        <div className="h-full overflow-auto">
          <EmpiricaContext
            introSteps={introSteps}
            exitSteps={exitSteps}
            noGames={NoGames}
            consent={({ onConsent }) => <Consent onConsent={onConsent} />}
            lobby={Lobby}
          >
            <Game />
          </EmpiricaContext>
        </div>
      </div>
    </EmpiricaParticipant>
  );
}
