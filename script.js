const game = document.getElementById("game");
const start = document.getElementById("start");
const title = document.getElementById("title");
const scoreElement = document.getElementById("score");

let score = 0;

let level = 0;
let stage = 0;

const prepareTile = (id) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.id = id;
  return tile;
};

const basicBuildFunction = (id) => {
  const tile = prepareTile(id);
  tile.innerHTML = id;
  return tile;
};

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
}

const firstLevel = [
  {
    title: "Bigger",
    stages: [
      {
        tiles: ["10", "20", "30", "40"],
        correct: "40"
      },
      {
        tiles: ["35", "33", "36", "40"],
        correct: "40"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      const px = document.createElement("div");
      px.style = `background-color: #000038; width: ${id}px; height: ${id}px; pointer-events: none`;
      tile.appendChild(px);
      return tile;
    }
  }
];

const levelList = [
  {
    title: "Pure",
    stages: [
      {
        tiles: ["#ff12e0", "#a2fafb", "#ffbb00", "#ff0000"],
        correct: "#ff0000"
      },
      {
        tiles: [
          "#2bbee1",
          "#09ffbb",
          "#aaff00",
          "#213611",
          "#bb0099",
          "#0000ff",
          "#21ff00",
          "#f99abb"
        ],
        correct: "#0000ff"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      tile.style.backgroundColor = id;
      return tile;
    }
  },
  {
    title: "Happier",
    stages: [
      {
        tiles: ["😬", "😕", "😕", "🙃"],
        correct: "🙃"
      },
      {
        tiles: ["😚", "🙂", "😀", "🙃", "😵", "😵‍💫", "😑", "😘"],
        correct: "😀"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Symetrical",
    stages: [
      {
        tiles: ["🫢", "😪", "🫥", "😰"],
        correct: "🫥"
      },
      {
        tiles: ["👻", "😶‍🌫️", "🍊", "🐼", "🐡", "😜"],
        correct: "🐼"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Empty",
    stages: [
      {
        tiles: ["1", "2", "0", "3"],
        correct: "0"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      const px = document.createElement("div");
      px.style = `background-color: #000038; width: ${id}px; height: ${id}px; pointer-events: none`;
      tile.appendChild(px);
      return tile;
    }
  },
  {
    title: "Leftie",
    stages: [
      {
        tiles: ["🫲", "🤙", "👌", "👍"],
        correct: "👍"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Prime",
    stages: [
      {
        tiles: ["9", "4", "1", "8"],
        correct: "1"
      },
      {
        tiles: ["12", "7", "9", "4"],
        correct: "7"
      },
      {
        tiles: ["77", "61", "91", "4"],
        correct: "61"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      tile.innerHTML = id;
      tile.style.fontSize = "2rem";
      return tile;
    }
  },
  {
    title: "Fast",
    stages: [
      {
        tiles: ["🥐", "🥓", "🌭", "🥩"],
        correct: "🌭"
      },
      {
        tiles: ["🫘", "🌯", "🧄", "🍞", "🧀", "🍷"],
        correct: "🌯"
      },
      {
        tiles: ["🍝", "🍅", "🥠", "🍕", "🍪", "🍨", "🍬"],
        correct: "🍕"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Turquoise",
    stages: [
      {
        tiles: ["#00ccff", "#00ffff", "#00ffcc", "#00fddf"],
        correct: "#00ffff"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      tile.style.backgroundColor = id;
      return tile;
    }
  },
  {
    title: "Europe",
    stages: [
      {
        tiles: ["🇻🇺", "🇧🇪", "🇦🇺", "🇯🇵"],
        correct: "🇧🇪"
      },
      {
        tiles: ["🇮🇪", "🇵🇭", "🇺🇾", "🇧🇴"],
        correct: "🇮🇪"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "45deg",
    stages: [
      {
        tiles: ["45", "40", "25", "30"],
        correct: "45"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      const px = document.createElement("div");
      px.style = `background-color: #000038; width: 50%; height: 50%; transform: rotate(${id}deg); pointer-events: none`;
      tile.appendChild(px);
      return tile;
    }
  },
  {
    title: "Top",
    stages: [
      {
        tiles: ["0", "-10", "-5", "-18"],
        correct: "-18"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      const px = document.createElement("div");
      px.style = `background-color: #000038; width: 50%; height: 50%; transform: translateY(${id}px); pointer-events: none`;
      tile.appendChild(px);
      return tile;
    }
  },
  {
    title: "???",
    stages: [
      {
        tiles: ["🦁", "🐻", "🦅", "🦓"],
        correct: "🦓"
      },
      {
        tiles: ["🐊", "🦌", "🦊", "🐶"],
        correct: "🦌"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Bigger than",
    stages: [
      {
        tiles: [">", "<", "=", "×", "÷"],
        correct: ">"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Later",
    stages: [
      {
        tiles: ["🕒", "🕗", "🕠", "🕚"],
        correct: "🕚"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "???",
    stages: [
      {
        tiles: ["🍆", "🌽", "🥕", "🍋"],
        correct: "🍋"
      },
      {
        tiles: ["🥔", "🧅", "🫑", "🍓"],
        correct: "🍓"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      tile.innerHTML = id;
      return tile;
    }
  },
  {
    title: "???",
    stages: [
      {
        tiles: ["🏀", "🥎", "🎱", "🏐"],
        correct: "🎱"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "School?",
    stages: [
      {
        tiles: ["🖋️", "📏", "🖍️", "🎒", "🔧"],
        correct: "🔧"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "???",
    stages: [
      {
        tiles: ["🏈", "⚽", "⚾", "🥎"],
        correct: "🏈"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Warmer",
    stages: [
      {
        tiles: ["#ff0000", "#ff3344", "#ff00ee", "#ff2222", "#ff9900"],
        correct: "#ff0000"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      tile.style.backgroundColor = id;
      return tile;
    }
  },
  {
    title: "Lighter",
    stages: [
      {
        tiles: ["#eeeedd", "#ccbbbb", "#bbcccc", "#ddccdd", "#aa99aa"],
        correct: "#eeeedd"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      tile.style.backgroundColor = id;
      return tile;
    }
  },
  {
    title: "Black",
    stages: [
      {
        tiles: ["#000000", "#000022", "#330000", "#111111", "#222200"],
        correct: "#000000"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      tile.style.backgroundColor = id;
      return tile;
    }
  },
  {
    title: "Light?",
    stages: [
      {
        tiles: ["🕯️", "💡", "🔦", "🧨"],
        correct: "🧨"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "???",
    stages: [
      {
        tiles: ["🐶", "🐱", "🐹", "🦊"],
        correct: "🦊"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Love?",
    stages: [
      {
        tiles: ["💜", "💙", "💚", "💛", "🩷", "💔"],
        correct: "💔"
      }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Moon?",
    stages: [
      { tiles: ["🌒", "🌓", "🌔", "🟡", "🌖", "🌗", "🌘", "🌑"], correct: "🟡" }
    ],
    buildFunction: basicBuildFunction
  },
  {
    title: "Ace?",
    stages: [{ tiles: ["♠︎", "♥︎", "♦︎", "♣︎", "♟︎"], correct: "♟︎" }],
    buildFunction: basicBuildFunction
  },
  {
    title: "Death?",
    stages: [{ tiles: ["🪦", "👻", "💀", "⛄"], correct: "⛄" }],
    buildFunction: basicBuildFunction
  },
  {
    title: "America?",
    stages: [{ tiles: ["🇲🇽", "🇨🇺", "🇧🇷", "🇨🇴", "🇮🇹"], correct: "🇮🇹" }],
    buildFunction: basicBuildFunction
  },
  {
    title: "???",
    stages: [{ tiles: ["🥳", "🎊", "🎈", "🎉"], correct: "🎈" }],
    buildFunction: basicBuildFunction
  },
  {
    title: "Transparent",
    stages: [
      {
        tiles: ["#799df1", "transparent", "#60c1ec", "#7bd9de", "#cfb0d2"],
        correct: "transparent"
      }
    ],
    buildFunction: (id) => {
      const tile = prepareTile(id);
      tile.style.backgroundColor = id;
      return tile;
    }
  },
  {
    title: "???",
    stages: [{ tiles: ["🎸", "💻", "📱", "🪇"], correct: "🪇" }],
    buildFunction: basicBuildFunction
  }
];

shuffle(levelList);

const levels = [...firstLevel, ...levelList];

const checkTile = (event) => {
  if (event.target.id === levels[level].stages[stage].correct) {
    score = score + 2;
    winStage();
  } else {
    score = score - 1;
    event.target.style.opacity = "30%";
  }
  scoreElement.innerHTML = score;
};

const generateLevel = () => {
  game.innerHTML = "";
  const currentLevel = levels[level];
  title.innerHTML = `${level}-${currentLevel.title}`;

  const tiles = currentLevel.stages[stage].tiles;
  shuffle(tiles);

  tiles.forEach((tile) => {
    const tileElement = currentLevel.buildFunction(tile);
    tileElement.addEventListener("click", checkTile);
    game.appendChild(tileElement);
  });
};

const winGame = () => {
  score.innerHTML = "";
  game.style.fontSize = "2rem";
  game.innerHTML = `Your score is ${score} ${
    score > 10 ? (score > 40 ? "😄" : "🤨") : "😨"
  }`;
  title.innerHTML = "THE END";
};

const winStage = () => {
  stage++;
  if (stage >= levels[level].stages.length) {
    level++;
    stage = 0;

    if (level >= levels.length) {
      winGame();
      return;
    }
  }
  generateLevel();
};

start.addEventListener("click", () => (start.style.display = "none"));

generateLevel();
