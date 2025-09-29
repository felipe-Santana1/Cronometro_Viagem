// Data alvo: 16 de outubro de 2025
const targetDate = new Date('2025-10-16T00:00:00').getTime();

function updateCountdown() {
    // Pega a data/hora atual
    const now = new Date().getTime();
    
    // Calcula a diferença
    const distance = targetDate - now;
    
    // Se a data passou, mostra zeros
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Opcional: mostrar mensagem de que chegou o dia
        document.querySelector('.title').textContent = 'Chegou o Grande Dia!';
        return;
    }
    
    // Calcula dias, horas, minutos e segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Atualiza o DOM com formatação de dois dígitos
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Atualiza o contador imediatamente
updateCountdown();

// Atualiza o contador a cada segundo
setInterval(updateCountdown, 1000);

// Adiciona efeito de animação nos números quando mudam
function addChangeAnimation(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('number-change');
    setTimeout(() => {
        element.classList.remove('number-change');
    }, 300);
}

// Monitora mudanças nos números para adicionar animação
let lastValues = {
    days: document.getElementById('days').textContent,
    hours: document.getElementById('hours').textContent,
    minutes: document.getElementById('minutes').textContent,
    seconds: document.getElementById('seconds').textContent
};

setInterval(() => {
    const currentValues = {
        days: document.getElementById('days').textContent,
        hours: document.getElementById('hours').textContent,
        minutes: document.getElementById('minutes').textContent,
        seconds: document.getElementById('seconds').textContent
    };
    
    // Verifica se algum valor mudou e adiciona animação
    Object.keys(currentValues).forEach(key => {
        if (currentValues[key] !== lastValues[key]) {
            addChangeAnimation(key);
            lastValues[key] = currentValues[key];
        }
    });
}, 100);

// ==================== FUNCIONALIDADE BIOMÉTRICA ====================

const biometricBtn = document.getElementById('biometricBtn');
const modal = document.getElementById('biometricModal');
const closeBtn = document.querySelector('.close');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const processBtn = document.getElementById('processBtn');
const result = document.getElementById('result');

let stream = null;
let capturedImage = null;

// Abrir modal
biometricBtn.addEventListener('click', async () => {
    modal.style.display = 'block';
    await startCamera();
});

// Fechar modal
closeBtn.addEventListener('click', () => {
    closeModal();
});

// Fechar modal clicando fora
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Função para iniciar a câmera
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { 
                facingMode: 'user', // Câmera frontal
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        });
        video.srcObject = stream;
        result.innerHTML = '📱 Posicione seu rosto na câmera e clique em capturar';
    } catch (error) {
        console.error('Erro ao acessar a câmera:', error);
        result.innerHTML = '❌ Erro ao acessar a câmera. Verifique as permissões.';
    }
}

// Função para parar a câmera
function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}

// Função para fechar modal
function closeModal() {
    modal.style.display = 'none';
    stopCamera();
    captureBtn.style.display = 'inline-block';
    processBtn.style.display = 'none';
    result.innerHTML = '';
    capturedImage = null;
}

// Capturar imagem
captureBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Desenha o frame do vídeo no canvas
    context.drawImage(video, 0, 0);
    
    // Converte para imagem
    capturedImage = canvas.toDataURL('image/jpeg', 0.8);
    
    // Mostra botão de processar
    captureBtn.style.display = 'none';
    processBtn.style.display = 'inline-block';
    result.innerHTML = '✅ Imagem capturada! Clique em processar para análise.';
});

// Processar imagem (simulação)
processBtn.addEventListener('click', () => {
    result.innerHTML = '🔍 Processando biometria...';
    processBtn.disabled = true;
    
    // Simula processamento com loading
    let dots = 0;
    const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        result.innerHTML = '🔍 Processando biometria' + '.'.repeat(dots);
    }, 500);
    
    // Após 3 segundos, mostra o resultado
    setTimeout(() => {
        clearInterval(loadingInterval);
        processBtn.disabled = false;
        
        // Mensagem humorística
        result.innerHTML = `
            <div style="color: #ff6b6b; font-size: 18px; margin-bottom: 10px;">
                🚫 ACESSO NEGADO
            </div>
            <div style="color: #ffd93d;">
                🐾 Não reconhecemos animais...
            </div>
            <div style="color: #6bcf7f; font-size: 14px; margin-top: 10px;">
                😄 Brincadeirinha! Tente novamente!
            </div>
        `;
        
        // Reset após 5 segundos
        setTimeout(() => {
            captureBtn.style.display = 'inline-block';
            processBtn.style.display = 'none';
            result.innerHTML = '📱 Posicione seu rosto na câmera e clique em capturar';
        }, 5000);
        
    }, 3000);
});
