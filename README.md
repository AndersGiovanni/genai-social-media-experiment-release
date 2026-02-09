# GenAI Social Media Experiment

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![DOI](https://img.shields.io/badge/DOI-pending-lightgrey.svg)]()

An experimental platform for studying how generative AI tools influence social media engagement. Built on [Empirica](https://empirica.ly/), the platform simulates a social media environment where participants interact with posts and comments under different AI-assistance conditions. The experiment implements a between-subjects design with five treatment conditions to isolate the effects of various AI interventions on user engagement behavior.

## Repository Structure

```
.
├── .empirica/                  # Empirica configuration
│   ├── empirica.toml           # Server auth and project settings
│   ├── treatments.yaml         # Treatment conditions and factors
│   └── lobbies.yaml            # Lobby/waiting room configuration
├── client/                     # React frontend (Vite)
│   ├── public/
│   │   └── posts/              # Seed data (posts, comments, participants)
│   └── src/
│       ├── components/         # Shared UI components (Chat, Suggestions, etc.)
│       ├── intro-exit/         # Pre/post experiment surveys and consent
│       ├── lobbies/            # Waiting room UI
│       ├── prompts/            # LLM system prompts for all AI features
│       ├── stages/             # Main experiment stage (Media)
│       ├── treatments/         # Treatment-specific components
│       │   ├── conversation-starter/
│       │   └── feedback/
│       └── utils/              # Data handlers and formatting utilities
├── server/                     # Empirica server callbacks
│   └── src/
│       ├── callbacks.js        # Game, round, and stage lifecycle logic
│       └── index.js            # Server entry point
├── package.json                # Root dependencies
└── LICENSE                     # Apache 2.0
```

## Experiment Design

The experiment uses a between-subjects design with five treatment conditions:

| Condition | Key Factor | Description |
|---|---|---|
| **Baseline** | No AI | Participants engage with social media content without any AI assistance |
| **Chat** | `chatEnabled` | An AI chatbot assistant answers questions about the content |
| **Suggestions** | `suggestionsEnabled` | AI generates three reply suggestions (agree, neutral, disagree) |
| **Feedback** | `feedbackEnabled` | AI provides feedback on the participant's drafted comment |
| **Conversation Starter** | `conversationStarter` | AI suggests conversation approaches for engaging with content |

Each condition is tested across varying group sizes (1-5 players). Treatment configurations are defined in `.empirica/treatments.yaml`.

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- npm (included with Node.js)
- [Empirica CLI](https://docs.empirica.ly/getting-started/setup)
- [OpenAI API key](https://platform.openai.com/api-keys)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<org>/genai-social-media-experiment-release.git
   cd genai-social-media-experiment-release
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd client && npm install && cd ..
   cd server && npm install && cd ..
   ```

3. **Configure environment:**
   ```bash
   cp client/.env.example client/.env
   ```
   Edit `client/.env` and add your OpenAI API key.

4. **Configure Empirica:**

   Edit `.empirica/empirica.toml` and replace the `CHANGE_ME` placeholders with secure values for `srtoken` and admin `password`.

## Usage

Start the Empirica development server:

```bash
empirica
```

- **Participant view:** http://localhost:3000
- **Admin panel:** http://localhost:3000/admin

From the admin panel, create a new batch, select a treatment condition, and start the game. Participants join via the participant URL.

## Data Availability

The `client/public/posts/` directory contains **seed data** (initial posts, comments, and participants) used to populate the social media environment at the start of each round. These are synthetic/curated content and do not contain participant data.

**Participant data** from the experiment is not included in this repository. It is available upon reasonable request to the authors.

## License

This project is licensed under the [Apache License 2.0](LICENSE).
