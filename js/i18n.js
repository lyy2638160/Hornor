let currentLang = localStorage.getItem('selectedLanguage') || (navigator.language == 'zh-CN' ? 'zh' : 'en');
let translations = {};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`i18n/${lang}.json`);
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function applyTranslations() {
    // 导航菜单翻译
    var nodes = document.querySelectorAll('#mainNav li a')
    for (var i = 0; i < nodes.length; i++)
    {
        nodes[i].textContent = translations.导航[i];
    }

    // 轮播图翻译
    nodes = document.querySelectorAll('.carousel-inner .item h2')
    for (var i = 0; i < nodes.length; i++)
    {
        nodes[i].innerHTML = 
        `${translations.滚屏[i].大字}<br><strong>${translations.滚屏[i].小字}</strong>`;
    }

    // 关于我们
    document.querySelector('#aboutUs .container h2').textContent = translations.关于我们;
    document.querySelector('#aboutUs .container h6').textContent = translations.公司简介;
    document.querySelector('#aboutUs .container h3').textContent = translations.详情标题;
    document.querySelector('#aboutUs .container p').innerHTML = translations.公司详情;
    // 公司优势
    var content = ""
    for (var i = 0; i < translations.公司优势.length; i++)
    {
        content += 
        `<li class="points">${translations.公司优势[i]}</li>`;
    }
    document.querySelector('.about-us-list').innerHTML = content;
    // 服务范围
    document.querySelector('#service .container h2').textContent = translations.服务范围;
    document.querySelector('#service .container h6').textContent = translations.服务简介;
    // 服务项目
    nodes = document.querySelectorAll('#service .service_block')
    for (var i = 0; i < nodes.length; i++)
    {
        nodes[i].innerHTML = 
        `<h3 class="animated fadeInUp wow">${translations.服务项目[i].名称}</h3><p class="animated fadeInDown wow">${translations.服务项目[i].介绍}</p>`;
    }
}

// 初始化语言
document.addEventListener('DOMContentLoaded', () => {
    // 设置初始语言
    document.getElementById('langSelect').value = currentLang;
    loadTranslations(currentLang);

    // 语言切换监听
    document.getElementById('langSelect').addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('selectedLanguage', currentLang);
        loadTranslations(currentLang);
    });
});