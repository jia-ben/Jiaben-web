// 加载并解析Markdown文件的函数
async function loadMarkdown(filePath, elementId) {
    try {
        const response = await fetch(filePath);
        const markdown = await response.text();
        // 确保 marked.parse 是一个函数
        if (typeof marked.parse === 'function') {
            const htmltext = marked.parse(markdown); // 使用 marked.parse 解析 Markdown
            document.getElementById(elementId).innerHTML = htmltext;
            generateToc(markdown, 'markdown-toc'); // 生成目录
        } else {
            console.error('marked.parse is not a function');
        }
    } catch (error) {
        console.error('Error loading markdown file:', error);
    }
}

// 生成目录的函数
function generateToc(markdown, tocElementId) {
    const toc = [];
    const lines = markdown.split('\n');
    for (const line of lines) {
        const match = line.match(/^(#{1,6})\s+(.*)/);
        if (match) {
            const level = match[1].length;
            const title = match[2];
            const id = title.toLowerCase().replace(/\s+/g, '-');
            toc.push({ level, title, id });
        }
    }
    const tocElement = document.getElementById(tocElementId);
    tocElement.innerHTML = toc.map(item => `<div style="margin-left: ${item.level * 10}px;"><a href="#${item.id}">${item.title}</a></div>`).join('');
}

// 动态检索 Notes 文件夹中的 Markdown 文件
async function loadFileList() {
    try {
        const response = await fetch('Notes/');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a');
        const fileList = document.getElementById('file-list');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href.endsWith('.md')) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="#" onclick="loadMarkdown('${href}', 'markdown-content')">${href}</a>`;
                fileList.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error('Error loading file list:', error);
    }
}

// 页面加载完成后，加载文件列表和默认的Markdown内容
document.addEventListener('DOMContentLoaded', function() {
    loadFileList();
    loadMarkdown('Notes/notes1.md', 'markdown-content');
});
