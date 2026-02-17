import { recordAuditEvent } from "@/lib/analyticsAudit";

type AbstractSection = {
  heading: string;
  body: string;
};

type ProjectAbstractTemplate = "premium" | "compact";

type ProjectAbstractDocument = {
  title: string;
  subtitle: string;
  filename: string;
  generatedBy?: string;
  projectSlug: string;
  projectName: string;
  source?: string;
  template?: ProjectAbstractTemplate;
  sections: AbstractSection[];
};

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 56;
const TOP_MARGIN = 68;
const BOTTOM_MARGIN = 56;
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

const drawText = (
  ops: string[],
  {
    x,
    y,
    size,
    text,
    font = "F1",
    color = "0 0 0",
  }: { x: number; y: number; size: number; text: string; font?: "F1" | "F2"; color?: string }
) => {
  ops.push(`BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(text)}) Tj ET`);
};

const drawRect = (ops: string[], { x, y, w, h, color }: { x: number; y: number; w: number; h: number; color: string }) => {
  ops.push(`q ${color} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f Q`);
};

const drawDualBrandHeader = (ops: string[], topY: number) => {
  const cardY = topY - 32;
  drawRect(ops, { x: MARGIN_X, y: cardY, w: PAGE_WIDTH - MARGIN_X * 2, h: 26, color: "0.97 0.97 0.98" });

  // Rodent lockup (left)
  drawRect(ops, { x: MARGIN_X + 10, y: cardY + 5, w: 14, h: 14, color: "0.13 0.13 0.13" });
  drawText(ops, { x: MARGIN_X + 13.4, y: cardY + 8.4, size: 7.5, text: "R", font: "F2", color: "1 1 1" });
  drawText(ops, { x: MARGIN_X + 30, y: cardY + 8, size: 11, text: "Rodent", font: "F2", color: "0.13 0.13 0.13" });

  // Squirrell lockup (right, alongside company logo)
  const rightX = PAGE_WIDTH - MARGIN_X - 172;
  drawRect(ops, { x: rightX, y: cardY + 5, w: 14, h: 14, color: "0.95 0.40 0.17" });
  drawText(ops, { x: rightX + 3.2, y: cardY + 8.4, size: 8, text: "S", font: "F2", color: "1 1 1" });
  drawText(ops, { x: rightX + 20, y: cardY + 8, size: 11, text: "Squirrell®", font: "F2", color: "0.08 0.08 0.08" });
};

const buildPdfBuffer = (payload: ProjectAbstractDocument) => {
  const pages: string[][] = [[]];
  let pageIndex = 0;
  let cursorY = PAGE_HEIGHT - TOP_MARGIN;

  const isPremium = (payload.template ?? "premium") === "premium";
  const bodySize = isPremium ? 12 : 11;
  const subtitleSize = isPremium ? 15 : 13;
  const titleSize = isPremium ? 26 : 22;
  const maxChars = isPremium ? 86 : 92;

  const ensureSpace = (requiredHeight: number) => {
    if (cursorY - requiredHeight < BOTTOM_MARGIN) {
      pages.push([]);
      pageIndex += 1;
      cursorY = PAGE_HEIGHT - TOP_MARGIN;
      drawDualBrandHeader(pages[pageIndex], cursorY + 18);
      cursorY -= 36;
    }
  };

  const pushText = (
    text: string,
    {
      size = bodySize,
      spacingAfter = 0,
      lineChars = maxChars,
      font = "F1",
      color = "0.16 0.16 0.16",
    }: { size?: number; spacingAfter?: number; lineChars?: number; font?: "F1" | "F2"; color?: string } = {}
  ) => {
    const lines = approximateWrap(text, lineChars);
    for (const line of lines) {
      ensureSpace(LINE_HEIGHT);
      drawText(pages[pageIndex], { x: MARGIN_X, y: cursorY, size, text: line, font, color });
      cursorY -= LINE_HEIGHT;
    }
    cursorY -= spacingAfter;
  };

  drawDualBrandHeader(pages[pageIndex], cursorY + 18);
  cursorY -= 36;

  // Apple-like clean sans-serif style via Helvetica/Helvetica-Bold
  pushText("PROJECT ABSTRACT", { size: 9.5, spacingAfter: 8, lineChars: 90, font: "F2", color: "0.42 0.42 0.44" });
  pushText(payload.title, { size: titleSize, spacingAfter: 8, lineChars: 42, font: "F2", color: "0.08 0.08 0.1" });
  pushText(payload.subtitle, { size: subtitleSize, spacingAfter: 12, lineChars: 68, color: "0.26 0.26 0.28" });
  pushText(`Generated ${new Date().toLocaleDateString()}${payload.generatedBy ? ` · ${payload.generatedBy}` : ""}`, {
    size: 9,
    spacingAfter: 18,
    lineChars: 92,
    color: "0.45 0.45 0.48",
  });

  for (const section of payload.sections) {
    pushText(section.heading.toUpperCase(), { size: 11, spacingAfter: 4, lineChars: 90, font: "F2", color: "0.14 0.14 0.16" });
    pushText(section.body, { size: bodySize, spacingAfter: 12, lineChars: maxChars, color: "0.18 0.18 0.2" });
  }

  pages.forEach((ops, i) => {
    drawText(ops, {
      x: MARGIN_X,
      y: 28,
      size: 8.5,
      text: `Rodent Inc. × Squirrell® · ${payload.projectName} · Page ${i + 1}/${pages.length}`,
      color: "0.42 0.42 0.45",
    });
  });

  const objects: string[] = [];

  const addObject = (content: string) => {
    objects.push(content);
    return objects.length;
  };

  const fontObjRegular = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontObjBold = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const pageObjects: number[] = [];

  for (const pageOps of pages) {
    const stream = pageOps.join("\n");
    const contentObj = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pageObj = addObject(
      `<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${PAGE_WIDTH.toFixed(2)} ${PAGE_HEIGHT.toFixed(2)}] /Resources << /Font << /F1 ${fontObjRegular} 0 R /F2 ${fontObjBold} 0 R >> >> /Contents ${contentObj} 0 R >>`
    );
    pageObjects.push(pageObj);
  }

  const pagesObj = addObject(`<< /Type /Pages /Count ${pageObjects.length} /Kids [${pageObjects.map((id) => `${id} 0 R`).join(" ")}] >>`);

  for (const id of pageObjects) {
    objects[id - 1] = objects[id - 1].replace("/Parent 0 0 R", `/Parent ${pagesObj} 0 R`);
  }

  const infoObj = addObject(
    `<< /Title (${escapePdfText(payload.title)}) /Author (${escapePdfText(payload.generatedBy ?? "Rodent Inc.")}) /Creator (Rodent Abstract Exporter · Helvetica Sans) /Subject (${escapePdfText(payload.subtitle)}) >>`
    `<< /Title (${escapePdfText(payload.title)}) /Author (${escapePdfText(payload.generatedBy ?? "Rodent Inc.")}) /Creator (Rodent Abstract Exporter) /Subject (${escapePdfText(payload.subtitle)}) >>`
  );
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

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R /Info ${infoObj} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
};

export const downloadProjectAbstract = (payload: ProjectAbstractDocument) => {
  const source = payload.source ?? "project_detail";
  recordAuditEvent({
    eventType: "abstract_download_requested",
    projectSlug: payload.projectSlug,
    projectName: payload.projectName,
    source,
  });

  try {
    const pdfBytes = buildPdfBuffer(payload);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = payload.filename.endsWith(".pdf") ? payload.filename : `${payload.filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);

    recordAuditEvent({
      eventType: "abstract_download_succeeded",
      projectSlug: payload.projectSlug,
      projectName: payload.projectName,
      source,
      details: `template=${payload.template ?? "premium"}`,
    });
  } catch (error) {
    recordAuditEvent({
      eventType: "abstract_download_failed",
      projectSlug: payload.projectSlug,
      projectName: payload.projectName,
      source,
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
