import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { Media } from "./stages/Media";
import { InitialSurvey } from "./intro-exit/Intro";
import { Training } from "./intro-exit/training-elements/Training";

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const stage = useStage();

  switch (stage.get("name")) {
    case "media":
      return <Media />;
    case "initialSurvey":
      return <InitialSurvey />;
    case "training":
      return <Training />;
    default:
      return <Loading />;
  }

}