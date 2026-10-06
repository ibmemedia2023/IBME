// Controlador Principal de la Aplicación Evangelística
let deferredPrompt = null;
let currentView = 'hub';

// Estados locales de juegos y secciones
let currentKidsStageIndex = 0;
let kidsStarsLit = 0;
let kidsChainTaps = 0;
let kidsSpongeCleanedPercent = 0;

let currentAdultStepIndex = 1;

document.addEventListener('DOMContentLoaded', () => {
  initServiceWorker();
  initTheme();
  initNetwork();
  initInstallPrompt();
  
  // Iniciar en selector de edades
  navigateTo('hub');
});

// =========================================================================
// 1. SERVICE WORKER & OFFLINE
// =========================================================================
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('[PWA] SW Registrado:', reg.scope))
        .catch(err => console.warn('[PWA] SW Error:', err));
    });
  }
}

function initNetwork() {
  const statusPill = document.getElementById('network-status');
  const statusText = document.getElementById('network-text');

  function update() {
    if (navigator.onLine) {
      statusPill.className = 'status-pill status-offline';
      statusText.textContent = 'Offline Listo';
    } else {
      statusPill.className = 'status-pill status-offline';
      statusText.textContent = 'Modo Sin Conexión';
    }
  }

  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}

function initInstallPrompt() {
  const banner = document.getElementById('install-banner');
  const btnInstall = document.getElementById('btn-install-prompt');
  const btnClose = document.getElementById('btn-close-banner');

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isStandalone) {
    banner.style.display = 'none';
    return;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!sessionStorage.getItem('install_dismissed')) {
      banner.style.display = 'flex';
    }
  });

  btnInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      banner.style.display = 'none';
    } else {
      openShareModal();
    }
  });

  btnClose.addEventListener('click', () => {
    banner.style.display = 'none';
    sessionStorage.setItem('install_dismissed', 'true');
  });
}

function initTheme() {
  const theme = localStorage.getItem('app_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  document.getElementById('btn-theme-toggle').addEventListener('click', () => {
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('app_theme', next);
  });
}

// =========================================================================
// 2. NAVEGACIÓN GENERAL
// =========================================================================
function navigateTo(viewName) {
  currentView = viewName;

  document.querySelectorAll('.main-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.add('active');

  const targetNav = document.getElementById(`nav-${viewName}`);
  if (targetNav) targetNav.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Inicializar vistas específicas al entrar
  if (viewName === 'kids') {
    selectKidsStage(currentKidsStageIndex);
  } else if (viewName === 'youth') {
    selectYouthTopic(0);
  } else if (viewName === 'adults') {
    renderAdultStep(currentAdultStepIndex);
  }
}

// =========================================================================
// 3. SECCIÓN 1: NIÑOS - LA AVENTURA DE LOS COLORES
// =========================================================================
function selectKidsStage(index) {
  currentKidsStageIndex = index;
  const stage = APP_DATA.kids.stages[index];
  if (!stage) return;

  // Actualizar indicadores
  const dots = document.querySelectorAll('.kids-step-dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });

  // Ocultar versículo anterior
  const verseCard = document.getElementById('kids-verse-card');
  verseCard.style.display = 'none';

  // Configurar textos
  document.getElementById('kids-audio-caption').textContent = stage.audioText;
  document.getElementById('kids-instruction-text').textContent = stage.instruction;

  const arena = document.getElementById('kids-game-arena');
  arena.style.background = stage.bgGradient;

  // Cargar juego según color
  const stageContainer = document.getElementById('kids-dynamic-stage');
  stageContainer.innerHTML = '';

  switch (stage.id) {
    case 'oro':
      initStageOro(stageContainer);
      break;
    case 'negro':
      initStageNegro(stageContainer);
      break;
    case 'rojo':
      initStageRojo(stageContainer);
      break;
    case 'blanco':
      initStageBlanco(stageContainer);
      break;
    case 'verde':
      initStageVerde(stageContainer);
      break;
  }

  // Reproducir narración por voz automática o amigable
  playKidsAudio();
}

function playKidsAudio() {
  const stage = APP_DATA.kids.stages[currentKidsStageIndex];
  if (!stage) return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(stage.audioText);
    utt.lang = 'es-ES';
    utt.rate = 0.95;
    window.speechSynthesis.speak(utt);
  }
}

function completeKidsStage() {
  const stage = APP_DATA.kids.stages[currentKidsStageIndex];
  SoundEffects.playChime();

  const verseCard = document.getElementById('kids-verse-card');
  document.getElementById('kids-verse-ref').textContent = stage.verse.ref;
  document.getElementById('kids-verse-text').textContent = `«${stage.verse.text}»`;

  verseCard.style.display = 'block';
  verseCard.style.background = 'rgba(15, 23, 42, 0.95)';
  verseCard.style.border = `2px solid ${stage.colorHex}`;
  verseCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextKidsStage() {
  if (currentKidsStageIndex < APP_DATA.kids.stages.length - 1) {
    selectKidsStage(currentKidsStageIndex + 1);
  } else {
    // Si completó todos los colores
    SoundEffects.playVictory();
    alert('¡Felicitaciones! Has completado La Aventura de los Colores con Jesús.');
    navigateTo('hub');
  }
}

// --- Juego 1: Oro (Arrastrar estrellas a la corona) ---
function initStageOro(container) {
  kidsStarsLit = 0;
  container.innerHTML = `
    <div class="sky-arena">
      <div class="crown-target" id="crown-target">
        <span style="font-size: 2rem;">👑</span>
        <span style="font-size: 0.72rem; color: #fbbf24; font-weight: 700;">Corona Celestial</span>
      </div>
      <div class="stars-pool">
        <span class="draggable-star" id="star-1" draggable="true">⭐</span>
        <span class="draggable-star" id="star-2" draggable="true">⭐</span>
        <span class="draggable-star" id="star-3" draggable="true">⭐</span>
      </div>
    </div>
  `;

  const target = document.getElementById('crown-target');
  const stars = document.querySelectorAll('.draggable-star');

  stars.forEach((star) => {
    // Soporte para Click / Toque simple y Drag
    star.addEventListener('click', () => lightStar(star));
    star.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', star.id);
    });

    // Touch drag simple
    star.addEventListener('touchend', () => lightStar(star));
  });

  target.addEventListener('dragover', (e) => e.preventDefault());
  target.addEventListener('drop', (e) => {
    e.preventDefault();
    const starId = e.dataTransfer.getData('text/plain');
    const starEl = document.getElementById(starId);
    if (starEl) lightStar(starEl);
  });

  function lightStar(starEl) {
    if (starEl.classList.contains('lit')) return;
    starEl.classList.add('lit');
    SoundEffects.playChime();
    kidsStarsLit++;

    if (kidsStarsLit >= 3) {
      target.classList.add('filled');
      setTimeout(completeKidsStage, 500);
    }
  }
}

// --- Juego 2: Negro (Laberinto y choque con muro) ---
function initStageNegro(container) {
  container.innerHTML = `
    <div class="maze-arena" id="maze-arena">
      <div class="maze-wall-alert" id="maze-alert">⚠️ ¡Muro Invisible! El pecado nos detiene</div>
      <div class="maze-walker" id="maze-walker">🚶</div>
    </div>
  `;

  const arena = document.getElementById('maze-arena');
  const walker = document.getElementById('maze-walker');
  const alertEl = document.getElementById('maze-alert');
  let walkAttempts = 0;

  arena.addEventListener('click', () => {
    walkAttempts++;
    SoundEffects.playBump();

    // Mover un poco hacia adelante y chocar
    walker.style.transform = `translateX(${walkAttempts * 28}px)`;
    alertEl.style.display = 'block';

    setTimeout(() => {
      walker.style.transform = `translateX(${walkAttempts * 10}px)`;
    }, 200);

    if (walkAttempts >= 2) {
      setTimeout(() => {
        completeKidsStage();
      }, 400);
    }
  });
}

// --- Juego 3: Rojo (Romper cadenas tocando la cruz) ---
function initStageRojo(container) {
  kidsChainTaps = 0;
  container.innerHTML = `
    <div class="cross-arena">
      <div class="glowing-red-cross" id="cross-btn">
        ✝️
        <div class="chains-overlay" id="chains-icon">⛓️</div>
      </div>
      <div class="taps-counter" id="chain-taps-text">¡Toca la cruz 5 veces para romper las cadenas! (0/5)</div>
    </div>
  `;

  const cross = document.getElementById('cross-btn');
  const chains = document.getElementById('chains-icon');
  const counterText = document.getElementById('chain-taps-text');

  cross.addEventListener('click', () => {
    kidsChainTaps++;
    const isDone = kidsChainTaps >= 5;
    SoundEffects.playChainHit(isDone);

    chains.style.transform = `scale(${1 + kidsChainTaps * 0.1}) rotate(${(kidsChainTaps % 2 === 0 ? 8 : -8)}deg)`;
    counterText.textContent = `¡Toca la cruz! (${kidsChainTaps}/5)`;

    if (isDone) {
      chains.classList.add('broken');
      counterText.textContent = '¡Cadenas rotas para siempre por Jesús!';
      setTimeout(completeKidsStage, 500);
    }
  });
}

// --- Juego 4: Blanco (Esponja frotando la mancha en Canvas) ---
function initStageBlanco(container) {
  kidsSpongeCleanedPercent = 0;
  container.innerHTML = `
    <div class="clean-arena">
      <div style="position: absolute; font-size: 6rem; color: #ffffff; z-index: 1;">🤍</div>
      <canvas id="sponge-canvas" width="220" height="200" style="position: relative; z-index: 2;"></canvas>
    </div>
  `;

  const canvas = document.getElementById('sponge-canvas');
  const ctx = canvas.getContext('2d');

  // Rellenar con mancha oscura inicial
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(110, 100, 85, 0, Math.PI * 2);
  ctx.fill();

  let isDrawing = false;
  let scrubPoints = 0;

  function scrub(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    scrubPoints++;
    if (scrubPoints % 6 === 0) {
      SoundEffects.playScrub();
    }

    if (scrubPoints >= 38) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      completeKidsStage();
    }
  }

  // Eventos de ratón
  canvas.addEventListener('mousedown', () => isDrawing = true);
  window.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    scrub(e.clientX - rect.left, e.clientY - rect.top);
  });

  // Eventos táctiles
  canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchend', () => isDrawing = false);
  canvas.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    scrub(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();
  }, { passive: false });
}

// --- Juego 5: Verde (Regadera y árbol frondoso) ---
function initStageVerde(container) {
  container.innerHTML = `
    <div class="plant-arena">
      <div class="watering-can" id="watering-can" draggable="true">🚿</div>
      <div class="seed-target" id="seed-target">🌱</div>
    </div>
  `;

  const can = document.getElementById('watering-can');
  const seed = document.getElementById('seed-target');
  let isWatered = false;

  function waterSeed() {
    if (isWatered) return;
    isWatered = true;
    can.style.transform = 'rotate(-35deg) scale(1.1)';
    SoundEffects.playSprout();

    setTimeout(() => {
      seed.classList.add('grown');
      seed.textContent = '🌳';
      setTimeout(completeKidsStage, 700);
    }, 400);
  }

  can.addEventListener('click', waterSeed);
  can.addEventListener('touchend', waterSeed);
  seed.addEventListener('click', waterSeed);
}

// =========================================================================
// 4. SECCIÓN 2: JÓVENES - CONEXIÓN REAL: DESBLOQUEA LA VERDAD
// =========================================================================
function selectYouthTopic(index) {
  document.getElementById('tab-youth-1').classList.toggle('active', index === 0);
  document.getElementById('tab-youth-2').classList.toggle('active', index === 1);

  const container = document.getElementById('youth-topic-content');
  const topic = APP_DATA.youth.topics[index];
  if (!topic) return;

  if (index === 0) {
    // Tema 1: Ciencia vs Fe (Swipe)
    renderYouthTopic1(container, topic);
  } else {
    // Tema 2: Sexualidad e Identidad (Chat de dilema)
    renderYouthTopic2(container, topic);
  }
}

function renderYouthTopic1(container, topic) {
  container.innerHTML = `
    <div class="swipe-container">
      <div class="swipe-card" id="swipe-card-science">
        <span class="age-badge badge-youth" style="margin-bottom: 8px;">${topic.badge}</span>
        <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 6px;">${topic.cardQuestion}</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Desliza o usa los botones para responder</p>
      </div>
      <div class="swipe-actions-bar">
        <button class="btn-swipe btn-swipe-left" onclick="handleYouthSwipe('left')">← ${topic.swipeLeftText}</button>
        <button class="btn-swipe btn-swipe-right" onclick="handleYouthSwipe('right')">${topic.swipeRightText} →</button>
      </div>
    </div>

    <div class="chat-window" id="youth-chat-window" style="display: none;"></div>

    <div class="unlock-box" id="youth-unlock-box" style="display: none;" onclick="openStoryModal('${topic.verse.ref}', '${topic.verse.text.replace(/'/g, "\\'")}')">
      <div style="font-size: 2.2rem; margin-bottom: 4px;">🔓</div>
      <strong style="color: var(--accent); display: block;">¡Toca el candado para desbloquear la Verdad!</strong>
      <span style="font-size: 0.8rem; color: #cbd5e1;">Ver lo que enseña ${topic.verse.ref}</span>
    </div>
  `;
}

function handleYouthSwipe(direction) {
  const topic = APP_DATA.youth.topics[0];
  const flow = topic.chatFlow[direction];
  const chatWindow = document.getElementById('youth-chat-window');
  const unlockBox = document.getElementById('youth-unlock-box');

  SoundEffects.playUnlock();
  chatWindow.style.display = 'flex';
  chatWindow.innerHTML = `
    <div class="chat-bubble chat-user">${flow.userReply}</div>
    <div class="chat-bubble chat-bot">${flow.botReply}</div>
    <div class="chat-bubble chat-bot" style="background: rgba(59, 130, 246, 0.15); border-left: 3px solid var(--primary);">
      💡 <strong>Dato Clave:</strong> ${flow.insight}
    </div>
  `;

  unlockBox.style.display = 'block';
  unlockBox.scrollIntoView({ behavior: 'smooth' });
}

function renderYouthTopic2(container, topic) {
  container.innerHTML = `
    <div class="chat-window" id="youth-dilemma-window">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
        <span style="font-size: 1.6rem;">👤</span>
        <strong style="font-size: 0.88rem; color: #cbd5e1;">Pregunta Real:</strong>
      </div>
      <div class="chat-bubble chat-bot" style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3);">
        "${topic.avatarDilemma}"
      </div>
    </div>

    <div style="margin-bottom: 16px;">
      <p style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 8px;">Elige tu respuesta:</p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <button class="btn-swipe" style="background: var(--bg-surface); border: 1px solid var(--border); color: var(--text-main); text-align: left;" onclick="handleDilemmaChoice('A')">
          <strong>A)</strong> ${topic.options[0].text}
        </button>
        <button class="btn-swipe" style="background: var(--bg-surface); border: 1px solid var(--border); color: var(--text-main); text-align: left;" onclick="handleDilemmaChoice('B')">
          <strong>B)</strong> ${topic.options[1].text}
        </button>
      </div>
    </div>

    <div id="dilemma-response-area" style="display: none;"></div>

    <div class="unlock-box" id="dilemma-unlock-box" style="display: none;" onclick="openStoryModal('${topic.verse.ref}', '${topic.verse.text.replace(/'/g, "\\'")}')">
      <div style="font-size: 2rem; margin-bottom: 4px;">⬆️</div>
      <strong style="color: var(--accent); display: block;">Desliza hacia arriba o Toca aquí</strong>
      <span style="font-size: 0.8rem; color: #cbd5e1;">Leer la Palabra: ${topic.verse.ref}</span>
    </div>
  `;
}

function handleDilemmaChoice(key) {
  const topic = APP_DATA.youth.topics[1];
  const option = topic.options.find(o => o.key === key);
  const respArea = document.getElementById('dilemma-response-area');
  const unlockBox = document.getElementById('dilemma-unlock-box');

  SoundEffects.playUnlock();
  respArea.style.display = 'block';
  respArea.innerHTML = `
    <div class="chat-bubble chat-bot" style="margin-bottom: 12px; background: rgba(59, 130, 246, 0.15); border-left: 4px solid var(--primary);">
      <p style="margin-bottom: 6px;"><strong>Respuesta:</strong> ${option.botReply}</p>
      <p style="font-size: 0.84rem; color: var(--text-muted);">${option.explanation}</p>
    </div>
  `;

  unlockBox.style.display = 'block';
  unlockBox.scrollIntoView({ behavior: 'smooth' });
}

function openStoryModal(ref, text) {
  SoundEffects.playChime();
  document.getElementById('story-ref').textContent = ref;
  document.getElementById('story-text').textContent = `«${text}»`;
  document.getElementById('modal-story').classList.add('active');
}

function closeStoryModal() {
  document.getElementById('modal-story').classList.remove('active');
}

// =========================================================================
// 5. SECCIÓN 3: ADULTOS - EL PLAN ETERNO: LÓGICA Y GRACIA (PUENTE DE VIDA)
// =========================================================================
function renderAdultStep(stepNumber) {
  currentAdultStepIndex = stepNumber;

  // Actualizar pills
  for (let i = 1; i <= 5; i++) {
    const pill = document.getElementById(`pill-step-${i}`);
    if (pill) {
      pill.classList.toggle('active', i === stepNumber);
      pill.classList.toggle('completed', i < stepNumber);
    }
  }

  const step = APP_DATA.adults.steps[stepNumber - 1];
  const cross = document.getElementById('bridge-cross-span');
  const walker = document.getElementById('bridge-walker');
  const caption = document.getElementById('bridge-stage-caption');
  const interactionArea = document.getElementById('adult-interaction-area');
  const verseBox = document.getElementById('adult-verse-display');

  caption.textContent = step.screenText;

  // Visualizaciones según paso
  if (stepNumber >= 3) {
    cross.classList.add('expanded');
  } else {
    cross.classList.remove('expanded');
  }

  if (stepNumber === 5) {
    walker.classList.add('crossed');
  } else {
    walker.classList.remove('crossed');
  }

  // Renderizar interacción
  if (stepNumber <= 4) {
    interactionArea.innerHTML = `
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">${step.blockDescription}</p>
      <div class="draggable-card-adult" id="adult-drag-card" onclick="advanceAdultStep(${stepNumber})">
        <span>🤏</span>
        <span>${step.draggableBlock}</span>
      </div>
      <p style="font-size: 0.74rem; color: var(--text-dim); margin-top: 8px;">(Toca o arrastra la tarjeta)</p>
    `;
  } else {
    // Paso 5: Cruzar al otro lado
    interactionArea.innerHTML = `
      <button class="btn-install" style="font-size: 1.05rem; padding: 12px 24px;" onclick="advanceAdultStep(5)">
        🚶 Toca para Cruzar al otro lado
      </button>
    `;
  }

  // Versículo RVC
  verseBox.style.display = 'block';
  verseBox.innerHTML = `
    <strong style="color: var(--accent); font-size: 0.8rem; text-transform: uppercase;">${step.verse.ref}</strong>
    <p style="font-size: 0.98rem; font-style: italic; margin-top: 4px;">«${step.verse.text}»</p>
    <small style="color: var(--text-muted); display: block; margin-top: 6px;">${step.explanation}</small>
  `;
}

function advanceAdultStep(stepNumber) {
  SoundEffects.playChime();

  if (stepNumber < 5) {
    renderAdultStep(stepNumber + 1);
  } else {
    SoundEffects.playVictory();
    showAdultPrayer();
  }
}

function showAdultPrayer() {
  const interactionArea = document.getElementById('adult-interaction-area');
  interactionArea.innerHTML = `
    <div class="adult-decision-box">
      <h3 style="color: var(--accent); font-size: 1.25rem; font-weight: 800; margin-bottom: 8px;">
        ${APP_DATA.adults.prayer.title}
      </h3>
      <p style="font-size: 0.88rem; color: #cbd5e1; margin-bottom: 14px;">
        ${APP_DATA.adults.prayer.lead}
      </p>
      <div style="background: rgba(11, 17, 32, 0.8); padding: 14px; border-radius: 12px; font-style: italic; font-size: 0.95rem; color: #fef3c7; margin-bottom: 16px; text-align: left; line-height: 1.6;">
        ${APP_DATA.adults.prayer.text}
      </div>
      <button class="btn-install" style="width: 100%; font-size: 1.05rem; padding: 12px;" onclick="confirmAdultDecision()">
        ❤️ ¡Hice esta oración de corazón!
      </button>
    </div>
  `;
  interactionArea.scrollIntoView({ behavior: 'smooth' });
}

function confirmAdultDecision() {
  SoundEffects.playVictory();
  alert('¡Felicidades! Has dado el paso más trascendental de tu vida: De muerte a vida eterna.');
  navigateTo('hub');
}

// =========================================================================
// 6. COMPARTIR & CÓDIGO QR
// =========================================================================
document.getElementById('btn-share-app').addEventListener('click', openShareModal);

function openShareModal() {
  const modal = document.getElementById('modal-share');
  modal.classList.add('active');

  const canvas = document.getElementById('qr-canvas');
  if (canvas && window.QRCodeMinimal) {
    window.QRCodeMinimal.draw(canvas, window.location.href.split('#')[0]);
  }
}

function closeShareModal() {
  document.getElementById('modal-share').classList.remove('active');
}
