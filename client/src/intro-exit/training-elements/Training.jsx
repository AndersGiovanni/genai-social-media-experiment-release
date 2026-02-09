import { usePlayer, useGame, useStageTimer } from "@empirica/core/player/classic/react";
import { ControlTraining } from "./ControlTraining";
import { ChatTraining } from "./ChatTraining";
import { ConversationStarterTraining } from "./ConversationStarterTraining";
import { FeedbackTraining } from "./FeedbackTraining";
import { SuggestionsTraining } from "./SuggestionsTraining";

export function Training({ }) {
    const player = usePlayer();
    const stageTimer = useStageTimer();
    const game = useGame();
    const { chatEnabled, suggestionsEnabled, feedbackEnabled, conversationStarter } = game.get("treatment");
    const isControl = !chatEnabled && !suggestionsEnabled && !feedbackEnabled && !conversationStarter;

    if (isControl) {
        return <ControlTraining />;
    } else if (chatEnabled) {
        return <ChatTraining />;
    } else if (conversationStarter) {
        return <ConversationStarterTraining />;
    } else if (feedbackEnabled) {
        return <FeedbackTraining />;
    } else {
        return <SuggestionsTraining />;
    }
}