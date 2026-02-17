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

const drawLine = (ops: string[], x: number, y: number, size: number, text: string) => {
  ops.push(`BT /F1 ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(text)}) Tj ET`);
};

const drawAccentBar = (ops: string[], y: number) => {
  ops.push(`q 0.67 0.73 0.93 rg ${MARGIN_X.toFixed(2)} ${y.toFixed(2)} ${(PAGE_WIDTH - MARGIN_X * 2).toFixed(2)} 2 re f Q`);
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
      if (isPremium) drawAccentBar(pages[pageIndex], cursorY + 8);
    }
  };

  const pushText = (text: string, size = bodySize, spacingAfter = 0, lineChars = maxChars) => {
    const lines = approximateWrap(text, lineChars);
    for (const line of lines) {
      ensureSpace(LINE_HEIGHT);
      drawLine(pages[pageIndex], MARGIN_X, cursorY, size, line);
      cursorY -= LINE_HEIGHT;
    }
    cursorY -= spacingAfter;
  };

  if (isPremium) drawAccentBar(pages[pageIndex], cursorY + 8);

  pushText("PROJECT ABSTRACT", 10, 8, 90);
  pushText(payload.title, titleSize, 8, 42);
  pushText(payload.subtitle, subtitleSize, 12, 68);
  pushText(`Generated ${new Date().toLocaleDateString()}${payload.generatedBy ? ` · ${payload.generatedBy}` : ""}`, 10, 16, 92);

  for (const section of payload.sections) {
    pushText(section.heading.toUpperCase(), 12, 4, 90);
    pushText(section.body, bodySize, 12, maxChars);
  }

  pages.forEach((ops, i) => {
    drawLine(ops, MARGIN_X, 28, 9, `Rodent Inc. · ${payload.projectName} · Page ${i + 1}/${pages.length}`);
  });

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

  for (const id of pageObjects) {
    objects[id - 1] = objects[id - 1].replace("/Parent 0 0 R", `/Parent ${pagesObj} 0 R`);
  }

  const infoObj = addObject(
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
