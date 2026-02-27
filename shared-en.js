(() => {
  const isHome = document.body.classList.contains('home');
  if (!isHome) return;

  const locale = document.documentElement.lang === 'en' ? 'en-US' : 'id-ID';
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const nameInput = $('#waName');
  const amountInput = $('#waAmount');
  const dueInput = $('#waDue');
  const toneInputs = $$('input[name="tone"]');
  const messageOutput = $('#waMessage');
  const waLink = $('#waLink');
  const copyBtn = $('#copyMessage');
  const generateBtn = $('#generateMessage');
  const toast = $('#toast');

  const track = (eventName) => {
    console.log(eventName);
  };

  const formatRupiah = (value) => {
    const number = Number(value);
    if (!number) return 'Rp ____';
    return `Rp ${number.toLocaleString(locale)}`;
  };

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getTone = () => {
    const selected = toneInputs.find((input) => input.checked);
    return selected ? selected.value : 'sopan';
  };

  const buildMessage = () => {
    const name = nameInput.value.trim() || (locale === 'en-US' ? 'customer' : 'pelanggan');
    const amount = formatRupiah(amountInput.value);
    const dueDate = formatDate(dueInput.value);
    const tone = getTone();

    if (tone === 'tegas') {
      if (dueDate) {
        return `Hi ${name}, your shop debt of ${amount} is still unpaid. Please settle it before ${dueDate}. Thank you.`;
      }
      return `Hi ${name}, your shop debt of ${amount} is still unpaid. Please settle it as soon as possible. Thank you.`;
    }

    if (tone === 'netral') {
      if (dueDate) {
        return `Hi ${name}, this is a reminder for your shop debt of ${amount}. Please pay before ${dueDate}. Thank you.`;
      }
      return `Hi ${name}, this is a reminder for your shop debt of ${amount}. Please pay soon. Thank you.`;
    }

    if (dueDate) {
      return `Hi ${name}, I'd like to remind you about your shop debt of ${amount}. If possible, please pay before ${dueDate}. Thank you very much.`;
    }
    return `Hi ${name}, I'd like to remind you about your shop debt of ${amount}. If possible, please pay this week. Thank you very much.`;
  };

  const updateMessage = () => {
    if (!messageOutput) return;
    const message = buildMessage();
    messageOutput.value = message;
    if (waLink) {
      const encoded = encodeURIComponent(message);
      waLink.href = `https://wa.me/?text=${encoded}`;
    }
  };

  const setLoading = (isLoading) => {
    if (!generateBtn) return;
    generateBtn.disabled = isLoading;
    generateBtn.textContent = isLoading ? 'AI is drafting your message...' : 'Generate Message (AI)';
    generateBtn.classList.toggle('opacity-70', isLoading);
  };

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('toast-hide');
    toast.classList.add('toast-show');
    setTimeout(() => {
      toast.classList.add('toast-hide');
      toast.classList.remove('toast-show');
    }, 2000);
  };

  const copyMessage = async () => {
    const message = messageOutput.value.trim();
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
    } catch (err) {
      messageOutput.select();
      document.execCommand('copy');
    }
    showToast('Message copied successfully ✅');
  };

  const wireTracking = () => {
    $$('[data-track]').forEach((el) => {
      el.addEventListener('click', () => {
        track(el.getAttribute('data-track'));
      });
    });
  };

  const wireInputs = () => {
    [nameInput, amountInput, dueInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', updateMessage);
      input.addEventListener('change', updateMessage);
    });
    toneInputs.forEach((input) => {
      input.addEventListener('change', updateMessage);
    });
  };

  if (generateBtn) {
    generateBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const delay = 400;
      setLoading(true);
      if (messageOutput) {
        messageOutput.value = 'AI is drafting your message...';
      }
      track('click_secondary_cta');
      setTimeout(() => {
        updateMessage();
        setLoading(false);
      }, delay);
    });
  }

  $$('.js-scroll-ai').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.getElementById('ai-demo');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus({ preventScroll: true });
        }, 500);
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyMessage();
    });
  }

  wireInputs();
  wireTracking();
  updateMessage();
})();
