// 确认 marked 库是否已加载
if (typeof marked === 'undefined') {
    console.error('marked library is not loaded');
} else {
    console.log('marked library is loaded');
}

// 加载并解析Markdown文件的函数
async function loadMarkdown(filePath, elementId) {
    try {
        const response = await fetch(filePath);
        const markdown = await response.text();
        const html = marked(markdown);
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading markdown file:', error);
    }
}

// 页面加载完成后，加载Markdown内容
document.addEventListener('DOMContentLoaded', function() {
    loadMarkdown('notes.md', 'markdown-content');
});
