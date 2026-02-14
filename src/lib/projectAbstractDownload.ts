type AbstractSection = {
  heading: string;
  body: string;
};

type ProjectAbstractDocument = {
  title: string;
  subtitle: string;
  filename: string;
  generatedBy?: string;
  sections: AbstractSection[];
};

const PAGE_WIDTH = 595.28; // A4 width in pt
const PAGE_HEIGHT = 841.89; // A4 height in pt
const MARGIN_X = 56;
const TOP_MARGIN = 68;
const BOTTOM_MARGIN = 56;
const BODY_FONT_SIZE = 12;
const LINE_HEIGHT = 18;

const escapePdfText = (text: string) => text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const approximateWrap = (text: string, maxCharsPerLine: number) => {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
};

const drawLine = (ops: string[], x: number, y: number, size: number, text: string) => {
  ops.push(`BT /F1 ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(text)}) Tj ET`);
};

const buildPdfBuffer = (payload: ProjectAbstractDocument) => {
  const pages: string[][] = [[]];
  let pageIndex = 0;
  let cursorY = PAGE_HEIGHT - TOP_MARGIN;

  const ensureSpace = (requiredHeight: number) => {
    if (cursorY - requiredHeight < BOTTOM_MARGIN) {
      pages.push([]);
      pageIndex += 1;
      cursorY = PAGE_HEIGHT - TOP_MARGIN;
    }
  };

  const pushText = (text: string, size = BODY_FONT_SIZE, spacingAfter = 0, maxChars = 78) => {
    const lines = approximateWrap(text, maxChars);
    for (const line of lines) {
      ensureSpace(LINE_HEIGHT);
      drawLine(pages[pageIndex], MARGIN_X, cursorY, size, line);
      cursorY -= LINE_HEIGHT;
    }
    cursorY -= spacingAfter;
  };

  // Title block
  pushText("PROJECT ABSTRACT", 10, 8, 90);
  pushText(payload.title, 26, 8, 40);
  pushText(payload.subtitle, 15, 12, 66);
  pushText(`Generated ${new Date().toLocaleDateString()}${payload.generatedBy ? ` · ${payload.generatedBy}` : ""}`, 10, 16, 90);

  for (const section of payload.sections) {
    pushText(section.heading.toUpperCase(), 12, 4, 90);
    pushText(section.body, BODY_FONT_SIZE, 12, 88);
  }

  const objects: string[] = [];

  const addObject = (content: string) => {
    objects.push(content);
    return objects.length;
  };

  const fontObj = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  const pageObjects: number[] = [];

  for (const pageOps of pages) {
    const stream = pageOps.join("\n");
    const contentObj = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pageObj = addObject(
      `<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${PAGE_WIDTH.toFixed(2)} ${PAGE_HEIGHT.toFixed(2)}] /Resources << /Font << /F1 ${fontObj} 0 R >> >> /Contents ${contentObj} 0 R >>`
    );
    pageObjects.push(pageObj);
  }

  const pagesObj = addObject(`<< /Type /Pages /Count ${pageObjects.length} /Kids [${pageObjects.map((id) => `${id} 0 R`).join(" ")}] >>`);

  // patch parent references
  for (const id of pageObjects) {
    objects[id - 1] = objects[id - 1].replace("/Parent 0 0 R", `/Parent ${pagesObj} 0 R`);
  }

  const catalogObj = addObject(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];

  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
};

export const downloadProjectAbstract = (payload: ProjectAbstractDocument) => {
  const pdfBytes = buildPdfBuffer(payload);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = payload.filename.endsWith(".pdf") ? payload.filename : `${payload.filename}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};
