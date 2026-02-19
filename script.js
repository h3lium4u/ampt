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

function files(index) {
  var data = `
     ./male0001.png
     ./male0002.png
     ./male0003.png
     ./male0004.png
     ./male0005.png
     ./male0006.png
     ./male0007.png
     ./male0008.png
     ./male0009.png
     ./male0010.png
     ./male0011.png
     ./male0012.png
     ./male0013.png
     ./male0014.png
     ./male0015.png
     ./male0016.png
     ./male0017.png
     ./male0018.png
     ./male0019.png
     ./male0020.png
     ./male0021.png
     ./male0022.png
     ./male0023.png
     ./male0024.png
     ./male0025.png
     ./male0026.png
     ./male0027.png
     ./male0028.png
     ./male0029.png
     ./male0030.png
     ./male0031.png
     ./male0032.png
     ./male0033.png
     ./male0034.png
     ./male0035.png
     ./male0036.png
     ./male0037.png
     ./male0038.png
     ./male0039.png
     ./male0040.png
     ./male0041.png
     ./male0042.png
     ./male0043.png
     ./male0044.png
     ./male0045.png
     ./male0046.png
     ./male0047.png
     ./male0048.png
     ./male0049.png
     ./male0050.png
     ./male0051.png
     ./male0052.png
     ./male0053.png
     ./male0054.png
     ./male0055.png
     ./male0056.png
     ./male0057.png
     ./male0058.png
     ./male0059.png
     ./male0060.png
     ./male0061.png
     ./male0062.png
     ./male0063.png
     ./male0064.png
     ./male0065.png
     ./male0066.png
     ./male0067.png
     ./male0068.png
     ./male0069.png
     ./male0070.png
     ./male0071.png
     ./male0072.png
     ./male0073.png
     ./male0074.png
     ./male0075.png
     ./male0076.png
     ./male0077.png
     ./male0078.png
     ./male0079.png
     ./male0080.png
     ./male0081.png
     ./male0082.png
     ./male0083.png
     ./male0084.png
     ./male0085.png
     ./male0086.png
     ./male0087.png
     ./male0088.png
     ./male0089.png
     ./male0090.png
     ./male0091.png
     ./male0092.png
     ./male0093.png
     ./male0094.png
     ./male0095.png
     ./male0096.png
     ./male0097.png
     ./male0098.png
     ./male0099.png
     ./male0100.png
     ./male0101.png
     ./male0102.png
     ./male0103.png
     ./male0104.png
     ./male0105.png
     ./male0106.png
     ./male0107.png
     ./male0108.png
     ./male0109.png
     ./male0110.png
     ./male0111.png
     ./male0112.png
     ./male0113.png
     ./male0114.png
     ./male0115.png
     ./male0116.png
     ./male0117.png
     ./male0118.png
     ./male0119.png
     ./male0120.png
     ./male0121.png
     ./male0122.png
     ./male0123.png
     ./male0124.png
     ./male0125.png
     ./male0126.png
     ./male0127.png
     ./male0128.png
     ./male0129.png
     ./male0130.png
     ./male0131.png
     ./male0132.png
     ./male0133.png
     ./male0134.png
     ./male0135.png
     ./male0136.png
     ./male0137.png
     ./male0138.png
     ./male0139.png
     ./male0140.png
     ./male0141.png
     ./male0142.png
     ./male0143.png
     ./male0144.png
     ./male0145.png
     ./male0146.png
     ./male0147.png
     ./male0148.png
     ./male0149.png
     ./male0150.png
     ./male0151.png
     ./male0152.png
     ./male0153.png
     ./male0154.png
     ./male0155.png
     ./male0156.png
     ./male0157.png
     ./male0158.png
     ./male0159.png
     ./male0160.png
     ./male0161.png
     ./male0162.png
     ./male0163.png
     ./male0164.png
     ./male0165.png
     ./male0166.png
     ./male0167.png
     ./male0168.png
     ./male0169.png
     ./male0170.png
     ./male0171.png
     ./male0172.png
     ./male0173.png
     ./male0174.png
     ./male0175.png
     ./male0176.png
     ./male0177.png
     ./male0178.png
     ./male0179.png
     ./male0180.png
     ./male0181.png
     ./male0182.png
     ./male0183.png
     ./male0184.png
     ./male0185.png
     ./male0186.png
     ./male0187.png
     ./male0188.png
     ./male0189.png
     ./male0190.png
     ./male0191.png
     ./male0192.png
     ./male0193.png
     ./male0194.png
     ./male0195.png
     ./male0196.png
     ./male0197.png
     ./male0198.png
     ./male0199.png
     ./male0200.png
     ./male0201.png
     ./male0202.png
     ./male0203.png
     ./male0204.png
     ./male0205.png
     ./male0206.png
     ./male0207.png
     ./male0208.png
     ./male0209.png
     ./male0210.png
     ./male0211.png
     ./male0212.png
     ./male0213.png
     ./male0214.png
     ./male0215.png
     ./male0216.png
     ./male0217.png
     ./male0218.png
     ./male0219.png
     ./male0220.png
     ./male0221.png
     ./male0222.png
     ./male0223.png
     ./male0224.png
     ./male0225.png
     ./male0226.png
     ./male0227.png
     ./male0228.png
     ./male0229.png
     ./male0230.png
     ./male0231.png
     ./male0232.png
     ./male0233.png
     ./male0234.png
     ./male0235.png
     ./male0236.png
     ./male0237.png
     ./male0238.png
     ./male0239.png
     ./male0240.png
     ./male0241.png
     ./male0242.png
     ./male0243.png
     ./male0244.png
     ./male0245.png
     ./male0246.png
     ./male0247.png
     ./male0248.png
     ./male0249.png
     ./male0250.png
     ./male0251.png
     ./male0252.png
     ./male0253.png
     ./male0254.png
     ./male0255.png
     ./male0256.png
     ./male0257.png
     ./male0258.png
     ./male0259.png
     ./male0260.png
     ./male0261.png
     ./male0262.png
     ./male0263.png
     ./male0264.png
     ./male0265.png
     ./male0266.png
     ./male0267.png
     ./male0268.png
     ./male0269.png
     ./male0270.png
     ./male0271.png
     ./male0272.png
     ./male0273.png
     ./male0274.png
     ./male0275.png
     ./male0276.png
     ./male0277.png
     ./male0278.png
     ./male0279.png
     ./male0280.png
     ./male0281.png
     ./male0282.png
     ./male0283.png
     ./male0284.png
     ./male0285.png
     ./male0286.png
     ./male0287.png
     ./male0288.png
     ./male0289.png
     ./male0290.png
     ./male0291.png
     ./male0292.png
     ./male0293.png
     ./male0294.png
     ./male0295.png
     ./male0296.png
     ./male0297.png
     ./male0298.png
     ./male0299.png
     ./male0300.png
 `;
  return data.split("\n")[index];
}

const frameCount = 300;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
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

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
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
    scroller: `#main`
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
  navigator.clipboard.writeText('mohamedfaizaan5779@gmail.com');
  // alert('Email copied to clipboard: mohamedfaizaan5779@gmail.com');

  // GSAP Notification Animation
  const notification = document.getElementById("notification");

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
        delay: 2
      });
    }
  });
}

// ========================================
// EMAILJS INTEGRATION
// ========================================
// Initialize EmailJS with your Public Key
(function () {
  emailjs.init('V4rP1oW3WscgXjyq8');
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
  emailjs.send('service_ox0v9jm', 'template_1z1h5ao', templateParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);

      // Send auto-reply to the user
      const autoReplyParams = {
        to_name: templateParams.from_name,
        to_email: templateParams.from_email,
        from_name: 'Faizaan'
      };

      console.log('--- DEBUG AUTO-REPLY ---');
      console.log('Sending auto-reply with params:', autoReplyParams);
      console.log('Template ID:', 'template_llslbnz');
      console.log('Service ID:', 'service_ox0v9jm');
      console.log('User Email (should be to_email):', autoReplyParams.to_email);

      // Send auto-reply (replace 'YOUR_AUTOREPLY_TEMPLATE_ID' with your actual auto-reply template ID)
      emailjs.send('service_ox0v9jm', 'template_llslbnz', autoReplyParams)
        .then(function (autoReplyResponse) {
          console.log('Auto-reply sent successfully!', autoReplyResponse.status);
          console.log('Auto-reply response:', autoReplyResponse);
        })
        .catch(function (autoReplyError) {
          console.error('Auto-reply FAILED:', autoReplyError);
        });

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
  const thinkingId = appendMessage('RESUME_AI', 'SCANNING_KNOWLEDGE_BASE...', 'system-msg');

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
      const botMsgId = appendMessage('RESUME_AI', '', 'bot-msg');
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
        appendMessage('RESUME_AI', `ERROR: ${errorData.error || 'Failed to connect to brain.'}`, 'system-msg');
      } catch (e) {
        // Fallback if response is not JSON
        appendMessage('RESUME_AI', `ERROR: Failed to connect to brain status ${response.status}`, 'system-msg');
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