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
