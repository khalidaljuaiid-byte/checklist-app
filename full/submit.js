document.getElementById('submitBtn').addEventListener('click', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerText;

    // Collect data
    const name = document.getElementById('name').value.trim();
    const department = document.getElementById('department').value;
    const checkboxes = document.querySelectorAll('.ack-checkbox:checked');
    const agreement = document.querySelector('input[name="agreement"]:checked');

    // Reset errors
    document.getElementById('name').classList.remove('input-error');
    document.getElementById('department').classList.remove('input-error');
    document.getElementById('checkboxError').style.display = 'none';

    // Validate
    let isValid = true;

    if (!name) {
        document.getElementById('name').classList.add('input-error');
        isValid = false;
    }
    if (!department) {
        document.getElementById('department').classList.add('input-error');
        isValid = false;
    }

    if (!isValid) {
        alert('الرجاء تعبئة جميع الحقول المطلوبة (الاسم والإدارة).');
        return;
    }

    if (checkboxes.length < 7) {
        document.getElementById('checkboxError').style.display = 'block';
        alert('يجب الموافقة على جميع بنود الإقرار (7 بنود).');
        return;
    }

    if (!agreement) {
        alert('الرجاء تحديد الموافقة على الشروط.');
        return;
    }

    if (agreement.value === 'لا أوافق') {
        alert('لا يمكن إتمام العملية دون الموافقة على الشروط.');
        return;
    }

    // Submit via hidden iframe
    submitBtn.disabled = true;
    submitBtn.innerText = 'جاري الإرسال...';

    // Create hidden iframe if it doesn't exist
    let iframe = document.getElementById('hidden_iframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden_iframe';
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    // Create form
    const form = document.createElement('form');
    form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSc6KEIh6gWPkodDpAgWTQN1sIQq8r-v1mWv7q2Jdqfk-lUyEw/formResponse';
    form.method = 'POST';
    form.target = 'hidden_iframe';

    // Add inputs
    const addInput = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    };

    addInput('entry.88294716', name);
    addInput('entry.1038598923', department);
    addInput('entry.1639981020', agreement.value);

    checkboxes.forEach(cb => {
        addInput('entry.1883722675', cb.value);
    });

    document.body.appendChild(form);
    form.submit();

    // Show success after delay
    setTimeout(() => {
        document.body.removeChild(form);

        // Hide all sections
        document.querySelectorAll('.form-section, .pdf-section, .actions').forEach(section => {
            section.style.display = 'none';
        });

        // Create and show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-section';
        successDiv.style.textAlign = 'center';
        successDiv.style.padding = '40px 20px';
        successDiv.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">✅</div>
            <h2 style="color: var(--primary-color); margin-bottom: 15px;">تم إرسال إقرارك بنجاح!</h2>
            <p style="color: #666; font-size: 1.1rem; margin-bottom: 30px;">شكرًا لك، تم تسجيل ردك في النظام.</p>
            <button onclick="window.location.reload()" class="btn-primary">إرسال رد آخر</button>
        `;

        document.querySelector('.container').appendChild(successDiv);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
});
