 AOS.init({ duration: 1000, once: true, offset: 100 });

        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        new bootstrap.Collapse(navbarCollapse).hide();
                    }
                }
            });
        });

        // Counter Animation
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    let count = 0;
                    const increment = target / 100;
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            entry.target.textContent = target + (entry.target.nextElementSibling.textContent.includes('%') ? '%' : '+');
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(count) + (entry.target.nextElementSibling.textContent.includes('%') ? '%' : '+');
                        }
                    }, 20);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(counter => counterObserver.observe(counter));

        // Product Filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                document.querySelectorAll('.product-item').forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // WhatsApp Order
        function whatsappOrder(productName) {
            const phone = '2349151579732';
            const message = `Hello AYNIX! I'm interested in:\n\nProduct: ${productName}\n\nPlease provide more details.`;
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        }

        // Chatbot
        const chatbotToggle = document.getElementById('chatbotToggle');
        const chatbotContainer = document.getElementById('chatbotContainer');
        const chatbotClose = document.getElementById('chatbotClose');
        const chatbotMessages = document.getElementById('chatbotMessages');
        const chatbotInput = document.getElementById('chatbotInput');
        const chatbotSend = document.getElementById('chatbotSend');

        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });

        chatbotClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });

        function addMessage(text, isBot = true) {
            const msg = document.createElement('div');
            msg.className = `chatbot-message ${isBot ? 'bot' : 'user'}`;
            msg.textContent = text;
            chatbotMessages.appendChild(msg);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'typing-indicator';
            typing.id = 'typingIndicator';
            typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
            chatbotMessages.appendChild(typing);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function hideTyping() {
            const typing = document.getElementById('typingIndicator');
            if (typing) typing.remove();
        }

        function askBot(topic) {
            const responses = {
                services: 'We offer:\n• Screen Replacement\n• Battery Replacement\n• Water Damage Repair\n• Software Repair\n• Device Protection\n• Phone Unlocking',
                contact: 'Contact us:\n📍 23 AYNIX Plaza, Abeokuta\n📞 +234 2349151579732 AYNIX\n📧 info@aynix.com',
                products: 'We sell premium smartphones, authentic accessories, and repair tools. All products come with warranty!',
                whatsapp: 'Chat with us on WhatsApp: +234 9151579732 AYNIX\n\nClick below to start:',
                hello: 'Hello! How can I assist you with AYNIX today?',
                thanks: 'You\'re welcome! Feel free to ask anything else.'
            };

            let userMsg = topic;
            if (topic === 'services') userMsg = 'What services do you offer?';
            else if (topic === 'contact') userMsg = 'How can I contact you?';
            else if (topic === 'products') userMsg = 'Tell me about your products';
            else if (topic === 'whatsapp') userMsg = 'WhatsApp contact';

            addMessage(userMsg, false);
            showTyping();

            setTimeout(() => {
                hideTyping();
                addMessage(responses[topic] || 'I can help with services, products, contact info, or WhatsApp. What would you like to know?');
                
                if (topic === 'whatsapp') {
                    const options = document.createElement('div');
                    options.className = 'chatbot-options';
                    options.innerHTML = '<button class="chatbot-option-btn" onclick="window.open(\'https://wa.me/2349151579732\', \'_blank\')"><i class="fab fa-whatsapp me-2"></i>Open WhatsApp</button>';
                    chatbotMessages.lastChild.appendChild(options);
                }
            }, 1500);
        }

        chatbotSend.addEventListener('click', () => {
            const text = chatbotInput.value.trim().toLowerCase();
            if (text) {
                addMessage(chatbotInput.value, false);
                chatbotInput.value = '';
                
                showTyping();
                setTimeout(() => {
                    hideTyping();
                    if (text.includes('service')) askBot('services');
                    else if (text.includes('contact') || text.includes('phone') || text.includes('email')) askBot('contact');
                    else if (text.includes('product') || text.includes('buy') || text.includes('sell')) askBot('products');
                    else if (text.includes('whatsapp') || text.includes('wa')) askBot('whatsapp');
                    else if (text.includes('hello') || text.includes('hi')) askBot('hello');
                    else if (text.includes('thank')) askBot('thanks');
                    else addMessage('I can help with:\n• Services\n• Products\n• Contact Info\n• WhatsApp');
                }, 1500);
            }
        });

        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') chatbotSend.click();
        });

        // Forms
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! We\'ll get back to you soon.');
            e.target.reset();
        });

        document.querySelector('.newsletter-btn').addEventListener('click', () => {
            const email = document.querySelector('.newsletter-input').value;
            if (email) {
                alert('Thank you for subscribing!');
                document.querySelector('.newsletter-input').value = '';
            }
        });

        console.log('%c⚡ AYNIX - Born from Love. Built for Power.', 'font-size: 18px; color: #000; font-weight: bold;');
   