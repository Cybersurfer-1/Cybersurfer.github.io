document.addEventListener('DOMContentLoaded', function() {
    const chatSection = document.getElementById('chat');
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // 滚动到聊天区域
    document.querySelector('a[href="#chat"]').addEventListener('click', function(e) {
        e.preventDefault();
        chatSection.scrollIntoView({ behavior: 'smooth' });
    });

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user-message');
            userInput.value = '';
            // 模拟AI回复
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                addMessage('这是一个AI回复的示例。', 'ai-message');
            }, 1500);
        }
    }

    function addMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', className);

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = getCurrentTime();

        const content = document.createElement('div');
        content.textContent = text;

        messageElement.appendChild(timestamp);
        messageElement.appendChild(content);

        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.id = 'typingIndicator';
        typingIndicator.textContent = '正在输入...';
        typingIndicator.classList.add('message', 'ai-message');
        chatContainer.appendChild(typingIndicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // 照片轮播功能
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
        setTimeout(showSlides, 5000); // 每5秒切换一次
    }

    // 自动轮播
    setInterval(function() {
        plusSlides(1);
    }, 5000); // 每5秒切换一次
});

function currentSlide(n) {
    showSlides(slideIndex = n);
}