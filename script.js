function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  return locoScroll;
}
const scroll = locomotive();

function scrollToSection(target) {
  const targetEl = document.querySelector(target);
  if (targetEl) {
    scroll.scrollTo(targetEl);
  }
}

// Flashlight Cursor Logic
const flashlight = document.getElementById('flashlight');
if (flashlight) {
  document.addEventListener('mousemove', (e) => {
    gsap.to(flashlight, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.6,
      ease: "power2.out"
    });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to(flashlight, { opacity: 1, duration: 0.3 });
  });

  document.addEventListener('mouseleave', () => {
    gsap.to(flashlight, { opacity: 0, duration: 0.3 });
  });

  // Initial reveal
  flashlight.style.opacity = "1";
}


const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

const frameCount = 192;

const currentFrame = (index) =>
  `./${(index + 1).toString().padStart(4, "0")}.jpg`;

const images = [];
const imageSeq = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page>canvas`,
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[0].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({
  trigger: "#page>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `top top`,
  end: `600% top`,
});



gsap.to("#page1", {
  scrollTrigger: {
    trigger: `#page1`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`
  }
})
gsap.to("#page2", {
  scrollTrigger: {
    trigger: `#page2`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
    onEnter: () => {
      showGlobalNotification("Use ai bot to know more about my project");
    }
  }
})
gsap.to("#page3", {
  scrollTrigger: {
    trigger: `#page3`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`
  }
})

// Page 4 - CTA Section
gsap.to("#page4", {
  scrollTrigger: {
    trigger: `#page4`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`
  }
})

// Navbar Glassmorphism Scroll Effect
ScrollTrigger.create({
  trigger: "#main",
  start: "50px top",
  scroller: "#main",
  onEnter: () => {
    document.querySelector("#nav").classList.add("scrolled");
  },
  onLeaveBack: () => {
    document.querySelector("#nav").classList.remove("scrolled");
  }
});

// Hero Content Visibility & Scroll-Out
// Forcing preset visibility and ensuring it remains visible when scrolling back to top.
gsap.fromTo(".hero-content",
  { opacity: 1, y: 0 },
  {
    opacity: 0,
    y: -50,
    scrollTrigger: {
      trigger: "#page",
      start: "0% top",
      end: "15% top",
      scroller: "#main",
      scrub: 1
    }
  }
);

gsap.from("#page1 .content-left", {
  opacity: 0,
  x: -50,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#page1",
    start: "top center",
    end: "top top",
    scroller: "#main",
    scrub: 1
  }
});

// Skills Section Right Content (if any)
gsap.from("#page1 .content-right", {
  opacity: 0,
  x: 50,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#page1",
    start: "top center",
    end: "top top",
    scroller: "#main",
    scrub: 1
  }
});

gsap.from("#page3 .content-left", {
  opacity: 0,
  x: -50,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#page3",
    start: "top center",
    end: "top top",
    scroller: "#main",
    scrub: 1
  }
});

gsap.from("#page3 .content-right", {
  opacity: 0,
  x: 50,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#page3",
    start: "top center",
    end: "top top",
    scroller: "#main",
    scrub: 1
  }
});

gsap.from(".cta-content", {
  opacity: 0,
  scale: 0.95,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#page4",
    start: "top center",
    end: "top top",
    scroller: "#main",
    scrub: 1
  }
});

function copyEmail() {
  navigator.clipboard.writeText('amalavinobia3007@gmail.com');
  showGlobalNotification("Email copied to clipboard!");
}

// Reusable Global Notification Helper
function showGlobalNotification(message) {
  const notification = document.getElementById("notification");
  if (!notification) return;

  notification.textContent = message;

  gsap.to(notification, {
    autoAlpha: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      gsap.to(notification, {
        autoAlpha: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        delay: 3
      });
    }
  });
}

// ========================================
// EMAILJS INTEGRATION
// ========================================
// Initialize EmailJS with your Public Key
(function () {
  emailjs.init('KaD9j4s9mJGNldA2D');
})();

// Contact Form Submission Handler
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const submitBtn = event.target.querySelector('.btn-submit');
  const notification = document.getElementById('form-notification');
  const originalBtnText = submitBtn.textContent;

  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Get form data - using standard EmailJS variable names
  const templateParams = {
    from_name: document.getElementById('user-name').value,
    from_email: document.getElementById('user-email').value,
    message: document.getElementById('message').value,
    reply_to: document.getElementById('user-email').value
  };

  // Send email using EmailJS
  emailjs.send('service_iw0agcf', 'template_8qo1hep', templateParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);

      // Send auto-reply to the user
      const autoReplyParams = {
        to_name: templateParams.from_name,
        to_email: templateParams.from_email,
        from_name: 'Amala Vinobia'
      };

      emailjs.send('service_iw0agcf', 'template_1hl9ny3', autoReplyParams);

      // Show success notification
      notification.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      notification.className = 'form-notification success';

      // Reset form
      document.getElementById('contact-form').reset();

      // Hide notification after 5 seconds
      setTimeout(() => {
        notification.className = 'form-notification';
      }, 5000);

    }, function (error) {
      console.log('FAILED...', error);
      console.error('EmailJS Error Details:', error.text || error);

      // Show error notification
      notification.textContent = 'Failed to send message. Please try again or email me directly.';
      notification.className = 'form-notification error';

      // Hide notification after 5 seconds
      setTimeout(() => {
        notification.className = 'form-notification';
      }, 5000);
    })
    .finally(function () {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    });
});

// Show LinkedIn "Updated Soon" Notice
function showLinkedInNotice() {
  const notification = document.getElementById("notification");
  const originalText = notification.textContent;
  notification.textContent = "LinkedIn will be updated soon!";

  gsap.to(notification, {
    autoAlpha: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      gsap.to(notification, {
        autoAlpha: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        delay: 2,
        onComplete: () => {
          // Reset text
          setTimeout(() => {
            notification.textContent = originalText;
          }, 500);
        }
      });
    }
  });
}

// Mobile Notice Dismissal
function dismissMobileNotice() {
  gsap.to("#mobile-notice", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      document.getElementById("mobile-notice").style.display = "none";
      sessionStorage.setItem("mobileNoticeDismissed", "true");
    }
  });
}

// Check if notice should be shown
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("mobileNoticeDismissed") === "true") {
    const notice = document.getElementById("mobile-notice");
    if (notice) notice.style.display = "none";
  }
});

// ========================================
// AI CHATBOT LOGIC
// ========================================

function toggleChat() {
  const chatWindow = document.getElementById('ai-chat-window');
  if (chatWindow) {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      const input = document.getElementById('chat-input');
      if (input) input.focus();
    }
  }
}

function handleChatKey(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;

  const message = input.value.trim();
  if (!message) return;

  // Add User Message to UI
  appendMessage('USER', message, 'user-msg');
  input.value = '';

  // Show AI "Thinking" state
  const thinkingId = appendMessage('NEURAL_LINK', 'SCANNING_KNOWLEDGE_BASE...', 'system-msg');

  try {
    // 1. Attempt Real API Call to Vercel Backend
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }]
      })
    });

    removeMessage(thinkingId);

    if (response.ok) {
      // Create a message placeholder for the streaming response
      const botMsgId = appendMessage('NEURAL_LINK', '', 'bot-msg');
      const botMsgElement = document.getElementById(botMsgId).querySelector('.msg-content');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullText = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        botMsgElement.textContent = fullText;

        // Scroll to bottom
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    } else {
      // Handle API error
      try {
        const errorData = await response.json();
        appendMessage('NEURAL_LINK', `ERROR: ${errorData.error || 'Failed to connect to brain.'}`, 'system-msg');
      } catch (e) {
        // Fallback if response is not JSON
        appendMessage('NEURAL_LINK', `ERROR: Failed to connect to brain status ${response.status}`, 'system-msg');
      }
    }
  } catch (error) {
    console.error('Chat Error:', error);
    removeMessage(thinkingId);
    appendMessage('SYSTEM', 'CONNECTIVITY_ISSUE: PLEASE_RETRY_AFTER_DEPLOYMENT.', 'system-msg');
  }
}

function appendMessage(origin, content, className, animate = false) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return null;

  const msgDiv = document.createElement('div');
  const id = 'msg-' + Date.now() + Math.random().toString(36).substr(2, 9);
  msgDiv.id = id;
  msgDiv.className = `message ${className}`;

  msgDiv.innerHTML = `
    <span class="msg-origin">[${origin}]</span>
    <span class="msg-content">${animate ? '' : content}</span>
  `;

  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  if (animate) {
    typeWriter(msgDiv.querySelector('.msg-content'), content);
  }

  return id;
}

function removeMessage(id) {
  const msg = document.getElementById(id);
  if (msg) msg.remove();
}

function typeWriter(element, text, i = 0) {
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    i++;
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(() => typeWriter(element, text, i), 15);
  }
}