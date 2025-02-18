// 设置主题函数，根据传入的主题名称设置页面的主题样式
function setTheme(theme) {
    // 清空 body 的 className
    document.body.className = '';
    // 添加新的主题 className
    document.body.classList.add(theme + '-theme');
    // 设置 header 的 className
    document.querySelector('header').className = theme + '-theme';
    // 设置 nav 的 className
    document.querySelector('nav').className = theme + '-theme';
    // 设置 sidebar 的 className
    document.querySelector('.sidebar').className = 'sidebar ' + theme + '-theme';
    // 设置 footer 的 className
    document.querySelector('footer').className = theme + '-theme';
    // 设置 file-list 和 toc 的 className
    document.getElementById('file-list').className = theme + '-theme';
    document.getElementById('markdown-toc').className = 'toc ' + theme + '-theme';
    // 将主题保存到 localStorage 中
    localStorage.setItem('theme', theme);
}

// 加载主题函数，从 localStorage 中读取主题并应用
function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
        setTheme(theme);
    }
}

// 页面加载完成后，加载主题
document.addEventListener('DOMContentLoaded', loadTheme);

// 页面加载完成后，添加事件处理程序
document.addEventListener('DOMContentLoaded', function() {
    // 点击设置按钮，显示或隐藏下拉菜单
    document.querySelector('.dropbtn').addEventListener('click', function() {
        document.querySelector('.dropdown-content').classList.toggle('show');
    });

    // 点击主题按钮，显示或隐藏二级菜单
    document.querySelector('.submenu-btn').addEventListener('click', function(event) {
        event.stopPropagation();
        this.nextElementSibling.classList.toggle('show');
    });

    // 点击页面其他地方时，隐藏下拉菜单和二级菜单
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn') && !event.target.matches('.submenu-btn')) {
            var dropdowns = document.getElementsByClassName('dropdown-content');
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
            var submenus = document.getElementsByClassName('submenu-content');
            for (var i = 0; i < submenus.length; i++) {
                var openSubmenu = submenus[i];
                if (openSubmenu.classList.contains('show')) {
                    openSubmenu.classList.remove('show');
                }
            }
        }
    };
});
