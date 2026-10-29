const content = document.querySelector("#markdown-content");
const markdownPath = new URLSearchParams(window.location.search).get("file");

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderInline(text) {
  const codeSpans = [];
  let html = escapeHtml(text).replace(/`([^`]+)`/g, (_, code) => {
    const placeholder = `\u0000${codeSpans.length}\u0000`;
    codeSpans.push(`<code>${code}</code>`);
    return placeholder;
  });

  html = html
    .replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (match, label, href, title) => {
      let url;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return label;
      }

      if (!["http:", "https:", "mailto:"].includes(url.protocol)) {
        return label;
      }

      const titleAttribute = title ? ` title="${title}"` : "";
      return `<a href="${url.href}"${titleAttribute} target="_blank" rel="noopener noreferrer">${label}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/(^|[^_])_([^_\n]+)_/g, "$1<em>$2</em>");

  return html.replace(/\u0000(\d+)\u0000/g, (_, index) => codeSpans[Number(index)]);
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isTableSeparator(line) {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function isBlockStart(lines, index) {
  const line = lines[index];
  return /^#{1,6}\s/.test(line)
    || /^```/.test(line)
    || /^\s{0,3}>\s?/.test(line)
    || /^\s{0,3}(?:[-*_]\s*){3,}$/.test(line)
    || /^\s*[-+*]\s+/.test(line)
    || /^\s*\d+[.)]\s+/.test(line)
    || (index + 1 < lines.length && line.includes("|") && isTableSeparator(lines[index + 1]));
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const output = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (/^```/.test(line)) {
      const language = line.slice(3).trim().split(/\s+/)[0];
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      const className = language ? ` class="language-${escapeHtml(language)}"` : "";
      output.push(`<pre><code${className}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      const level = heading[1].length;
      const slug = heading[2].toLocaleLowerCase("ru")
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .trim()
        .replace(/\s+/g, "-");
      output.push(`<h${level} id="${slug}">${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (index + 1 < lines.length && line.includes("|") && isTableSeparator(lines[index + 1])) {
      const headers = splitTableRow(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      output.push(`<div class="markdown-table-wrap"><table><thead><tr>${headers.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_, cellIndex) => `<td>${renderInline(row[cellIndex] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }

    if (/^\s{0,3}(?:[-*_]\s*){3,}$/.test(line)) {
      output.push("<hr>");
      index += 1;
      continue;
    }

    if (/^\s{0,3}>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s{0,3}>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s{0,3}>\s?/, ""));
        index += 1;
      }
      output.push(`<blockquote>${renderMarkdown(quote.join("\n"))}</blockquote>`);
      continue;
    }

    const unordered = line.match(/^\s*[-+*]\s+(.+)/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.+)/);
    if (unordered || ordered) {
      const isOrdered = Boolean(ordered);
      const tag = isOrdered ? "ol" : "ul";
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(isOrdered ? /^\s*\d+[.)]\s+(.+)/ : /^\s*[-+*]\s+(.+)/);
        if (!item) break;
        items.push(`<li>${renderInline(item[1])}</li>`);
        index += 1;
      }
      output.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines, index)) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    output.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return output.join("\n");
}

async function loadMarkdown() {
  if (!markdownPath) {
    throw new Error("Не указан файл материала.");
  }

  const sourceUrl = new URL(markdownPath, window.location.href);
  if (sourceUrl.origin !== window.location.origin || !sourceUrl.pathname.endsWith(".md")) {
    throw new Error("Можно открыть только Markdown-файл с этого сайта.");
  }

  if (window.location.protocol === "file:") {
    content.innerHTML = [
      '<p class="markdown-error">Браузер блокирует загрузку Markdown-файлов, когда сайт открыт напрямую с диска (file://).</p>',
      `<p><a href="${escapeHtml(sourceUrl.href)}">Открыть файл как обычный текст</a></p>`,
      "<p>Чтобы просматривать материалы в оформленном виде, запустите в папке проекта команду <code>python -m http.server 8000</code> и откройте <a href=\"http://localhost:8000/\">http://localhost:8000/</a>.</p>",
    ].join("");
    return;
  }

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить файл (HTTP ${response.status}).`);
  }

  const markdown = await response.text();
  content.innerHTML = renderMarkdown(markdown);
  const title = content.querySelector("h1")?.textContent;
  if (title) {
    document.title = `${title} — Курс для менторов ИКТ`;
  }
}

loadMarkdown().catch((error) => {
  content.innerHTML = `<p class="markdown-error">${escapeHtml(error.message)}</p>`;
});
