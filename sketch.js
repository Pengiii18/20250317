let angle = 0;
let segments = 4; // 將枝節數量減少到四段
let seaweed = [];

function setup() { //初始設定函數，只會執行一次
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件
  noFill(); // 確保形狀內部不填充顏色

  // 初始化海草
  for (let j = 0; j < 40; j++) {
    seaweed.push({
      x: (width / 40) * j + (width / 80),
      segmentLength: random(40, 80),
      swayFactor: random(15, 30),
      color: [random(255), random(255), random(255)],
      weight: random(30, 60),
      frequency: random(0.02, 0.1) // 每條線條的搖晃頻率不一樣
    });
  }

  // 嵌入 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw');
  iframe.attribute('width', windowWidth);
  iframe.attribute('height', windowHeight);
  iframe.style('position', 'absolute');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('z-index', '-1'); // 將 iframe 放在動畫背後
  document.body.appendChild(iframe.elt); // 將 iframe 添加到 body 中
}

function draw() { //畫圖函數，會一直執行
  clear(); // 清除畫布，保持透明背景
  blendMode(BLEND); // 使用BLEND混合模式

  for (let j = 0; j < seaweed.length; j++) {
    let x = seaweed[j].x;
    let y = height;
    let segmentLength = seaweed[j].segmentLength;
    let swayFactor = seaweed[j].swayFactor;
    let color = seaweed[j].color;
    let weight = seaweed[j].weight;
    let frequency = seaweed[j].frequency;

    stroke(color[0], color[1], color[2], 150); // 設定線條顏色，增加透明度
    strokeWeight(weight); // 設定線條寬度

    noFill(); // 確保形狀內部不填充顏色
    beginShape(); // 開始繪製形狀
    vertex(x, y); // 設定初始點

    for (let i = 0; i < segments; i++) {
      let sway = sin(angle * frequency + i * 0.5) * (i + 1) * swayFactor; // 搖晃幅度隨著i的增加而增加，頻率不同
      let nextX = x + sway;
      let nextY = y - segmentLength;
      vertex(nextX, nextY); // 設定頂點
      x = nextX;
      y = nextY;
    }

    endShape(); // 結束繪製形狀
  }

  angle += 0.1; // 每次執行draw時，增加角度，產生更快的波動效果
}
