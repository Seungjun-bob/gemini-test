import { useState, useEffect } from 'react';
import './App.css';

interface StoryNode {
  text: string;
  choices?: { text: string; nextNode: string; }[];
  aiResponse?: string; // Simulated AI response for this node
}

const story: { [key: string]: StoryNode } = {
  start: {
    text: "어두운 숲 속, 당신은 낡은 지도를 들고 서 있습니다. 희미한 달빛 아래 두 갈래 길이 나타납니다. 어느 길로 가시겠습니까?",
    choices: [
      { text: "왼쪽의 좁은 오솔길", nextNode: "path1" },
      { text: "오른쪽의 넓은 자갈길", nextNode: "path2" },
    ],
  },
  path1: {
    text: "오솔길로 들어서자마자, 으스스한 침묵이 당신을 감쌉니다. 저 멀리 희미한 불빛이 보입니다. 불빛을 향해 가시겠습니까, 아니면 숨어 기다리시겠습니까?",
    choices: [
      { text: "불빛을 향해 간다", nextNode: "light" },
      { text: "숨어 기다린다", nextNode: "hide" },
    ],
  },
  path2: {
    text: "자갈길은 예상보다 험난합니다. 갑자기 거대한 그림자가 당신을 덮칩니다. 그림자의 정체는 무엇일까요? Gemini에게 물어보시겠습니까?",
    choices: [
      { text: "Gemini에게 묻는다", nextNode: "gemini_ask" },
      { text: "스스로 해결한다", nextNode: "fight" },
    ],
  },
  light: {
    text: "불빛은 작은 오두막에서 새어 나오고 있었습니다. 문을 열자, 친절해 보이는 노인이 당신을 맞이합니다. 노인에게 도움을 요청하시겠습니까?",
    choices: [
      { text: "도움을 요청한다", nextNode: "old_man_help" },
      { text: "경계하며 지켜본다", nextNode: "old_man_watch" },
    ],
  },
  hide: {
    text: "숲 속에 몸을 숨기자, 수상한 발소리가 가까워집니다. 당신은 숨을 죽이고 기다립니다. 발소리의 주인은 누구일까요?",
    aiResponse: "[Gemini AI: 발소리의 주인은 숲을 순찰하는 고대 요정의 수호자입니다. 그들은 숲의 평화를 지키며, 길 잃은 여행자를 돕기도 합니다.]",
    choices: [
      { text: "요정 수호자를 따라간다", nextNode: "fairy_guide" },
      { text: "여전히 숨어 있는다", nextNode: "still_hide" },
    ],
  },
  gemini_ask: {
    text: "당신은 Gemini에게 그림자의 정체를 묻습니다.",
    aiResponse: "[Gemini AI: 그림자는 고대 숲의 수호신인 거대한 나무 정령입니다. 그는 숲을 침범하는 자들을 막아서지만, 순수한 마음을 가진 이에게는 길을 열어줍니다.]",
    choices: [
      { text: "나무 정령에게 말을 건다", nextNode: "tree_spirit_talk" },
      { text: "도망친다", nextNode: "run_away" },
    ],
  },
  fight: {
    text: "당신은 용감하게 그림자를 향해 돌진합니다. 하지만 그림자는 너무나 거대하고 강력합니다. 당신은 큰 부상을 입고 쓰러집니다. 게임 오버.",
  },
  old_man_help: {
    text: "노인은 당신을 따뜻하게 맞아주며, 하룻밤 묵어갈 곳과 따뜻한 식사를 제공합니다. 다음 날 아침, 노인은 당신에게 숲을 벗어날 수 있는 비밀 통로를 알려줍니다. 당신은 무사히 숲을 벗어났습니다. 게임 클리어!",
  },
  old_man_watch: {
    text: "당신은 노인을 경계하며 지켜봅니다. 노인은 당신에게 아무런 해를 끼치지 않았지만, 당신은 불안감에 밤새 잠을 이루지 못합니다. 다음 날 아침, 노인은 사라지고 오두막은 텅 비어 있습니다. 당신은 다시 길을 잃었습니다. 게임 오버.",
  },
  fairy_guide: {
    text: "요정 수호자는 당신을 안전한 길로 안내합니다. 그들은 당신에게 숲의 신비로운 힘을 나누어주며, 당신은 새로운 능력을 얻게 됩니다. 당신은 숲을 벗어나 새로운 모험을 시작합니다. 게임 클리어!",
  },
  still_hide: {
    text: "당신은 계속 숨어 있습니다. 요정 수호자들은 당신을 발견하지 못하고 지나쳐갑니다. 당신은 숲 속에서 길을 잃고 헤매다 결국 지쳐 쓰러집니다. 게임 오버.",
  },
  tree_spirit_talk: {
    text: "당신은 나무 정령에게 당신의 순수한 의도를 설명합니다. 나무 정령은 당신의 진심을 알아보고, 당신을 숲의 가장 아름다운 곳으로 안내합니다. 그곳에서 당신은 숲의 지혜를 얻고, 평화롭게 여정을 마칩니다. 게임 클리어!",
  },
  run_away: {
    text: "당신은 나무 정령에게서 도망치려 하지만, 숲은 미로처럼 복잡합니다. 당신은 결국 길을 잃고 헤매다 지쳐 쓰러집니다. 게임 오버.",
  },
};

function App() {
  const [currentNode, setCurrentNode] = useState<string>('start');
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showChoices, setShowChoices] = useState<boolean>(false);
  const [showAiResponse, setShowAiResponse] = useState<boolean>(false);

  const typeText = (text: string) => {
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    const characters = Array.from(text); // Handle multi-byte characters correctly
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + characters[i]);
      i++;
      if (i === characters.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        if (story[currentNode].aiResponse) {
          setShowAiResponse(true);
        } else {
          setShowChoices(true);
        }
      }
    }, 30);
  };

  useEffect(() => {
    setShowChoices(false);
    setShowAiResponse(false);
    typeText(story[currentNode].text);
  }, [currentNode]);

  const handleChoice = (nextNode: string) => {
    setCurrentNode(nextNode);
  };

  const restartGame = () => {
    setCurrentNode('start');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gemini AI Storyteller</h1>
      </header>
      <main className="story-container">
        <div className="story-text-box">
          <p className="story-text">{displayedText}</p>
          {isTyping && <span className="typing-cursor">_</span>}
        </div>

        {showAiResponse && story[currentNode].aiResponse && (
          <div className="ai-response-box">
            <p className="ai-response-text">{story[currentNode].aiResponse}</p>
            {!isTyping && story[currentNode].choices && (
              <div className="choices">
                {story[currentNode].choices?.map((choice, index) => (
                  <button key={index} onClick={() => handleChoice(choice.nextNode)} disabled={isTyping}>
                    {choice.text}
                  </button>
                ))}
              </div>
            )}
            {!isTyping && !story[currentNode].choices && (
              <button onClick={restartGame}>다시 시작</button>
            )}
          </div>
        )}

        {!showAiResponse && showChoices && story[currentNode].choices && (
          <div className="choices">
            {story[currentNode].choices?.map((choice, index) => (
              <button key={index} onClick={() => handleChoice(choice.nextNode)} disabled={isTyping}>
                {choice.text}
              </button>
            ))}
          </div>
        )}

        {!story[currentNode].choices && !isTyping && !showAiResponse && (
          <button onClick={restartGame}>다시 시작</button>
        )}
      </main>
    </div>
  );
}

export default App;