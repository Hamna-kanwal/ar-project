"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function cleanBlogContent(html) {
  if (!html) return "";

  return html
    // Remove soft hyphens and invisible breaks
    .replace(/[\u00AD\u200B\u200C\u200D]/g, "")
    .replace(/&shy;/gi, "")
    // Strip newlines/tabs inside paragraph blocks and replace with single space
    .replace(/\s+/g, " ");
}

function isQuestionElement(el) {
  const text = (el.textContent || "").trim();
  if (!text.endsWith("?") || text.length > 160) return false;
  if (/^H[2-6]$/.test(el.tagName)) return true;
  if (
    el.tagName === "P" &&
    el.children.length === 1 &&
    /^(STRONG|B)$/.test(el.firstElementChild.tagName) &&
    el.firstElementChild.textContent.trim() === text
  ) {
    return true;
  }
  return false;
}

function enhanceBlogContent(html, title) {
  if (!html || typeof window === "undefined") return html;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const body = doc.body;

  // 1. Remove the internal links helper section (editor note, not for readers)
  let children = Array.from(body.children);
  const internalIdx = children.findIndex((el) =>
    /internal links placed in this post/i.test(el.textContent || "")
  );
  if (internalIdx !== -1) {
    children.slice(internalIdx).forEach((el) => el.remove());
  }

  // 1b. Remove the pasted FAQ schema block if it exists in the content
  children = Array.from(body.children);
  const schemaIdx = children.findIndex((el) =>
    /faqpage schema/i.test((el.textContent || "").slice(0, 80))
  );
  if (schemaIdx !== -1) {
    children.slice(schemaIdx).forEach((el) => el.remove());
  }

  // 2. Remove first heading if it duplicates the page title
  children = Array.from(body.children);
  const firstHeading = children.find((el) => /^H[1-6]$/.test(el.tagName));
  if (
    firstHeading &&
    title &&
    firstHeading.textContent.trim().toLowerCase() === title.trim().toLowerCase()
  ) {
    firstHeading.remove();
  }

  // 3. Convert "1. text" paragraphs into a styled ordered list
  children = Array.from(body.children);
  let i = 0;
  while (i < children.length) {
    const el = children[i];
    if (el.tagName === "P" && /^\s*\d+\.\s/.test(el.textContent || "")) {
      const group = [];
      let j = i;
      while (
        j < children.length &&
        children[j].tagName === "P" &&
        /^\s*\d+\.\s/.test(children[j].textContent || "")
      ) {
        group.push(children[j]);
        j++;
      }
      const ol = doc.createElement("ol");
      ol.className = "steps-list";
      group.forEach((p, idx) => {
        const li = doc.createElement("li");

        // Real number element (no pseudo-element, so it can never overlap the text)
        const num = doc.createElement("span");
        num.className = "step-num";
        num.textContent = String(idx + 1);

        const text = doc.createElement("span");
        text.className = "step-text";
        text.innerHTML = p.innerHTML.replace(
          /^\s*(<(span|strong|b)[^>]*>\s*)?\d+\.\s*(<\/(span|strong|b)>)?\s*/i,
          ""
        );

        li.appendChild(num);
        li.appendChild(text);
        ol.appendChild(li);
      });
      group[0].replaceWith(ol);
      group.slice(1).forEach((p) => p.remove());
      children = Array.from(body.children);
      i = children.indexOf(ol) + 1;
    } else {
      i++;
    }
  }

  // 4. Tables: direct answer callout, then ONE consistent style for every other table
  Array.from(body.querySelectorAll("table")).forEach((table) => {
    const rows = Array.from(table.querySelectorAll("tr"));
    if (!rows.length) return;

    const firstRowCells = Array.from(rows[0].children);
    const firstCellText = (firstRowCells[0]?.textContent || "").trim();

    // Direct answer block -> callout
    if (/^direct\s*answer/i.test(firstCellText)) {
      const callout = doc.createElement("div");
      callout.className = "direct-answer";
      const label = doc.createElement("span");
      label.className = "direct-answer-label";
      label.textContent = "Direct Answer";
      const text = doc.createElement("div");
      text.className = "direct-answer-text";
      text.innerHTML = firstRowCells[1] ? firstRowCells[1].innerHTML : "";
      callout.appendChild(label);
      callout.appendChild(text);
      table.replaceWith(callout);
      return;
    }

    // Single column or odd table: just wrap it
    if (firstRowCells.length < 2) {
      table.classList.add("plain-table");
      const wrap = doc.createElement("div");
      wrap.className = "table-wrap";
      table.replaceWith(wrap);
      wrap.appendChild(table);
      return;
    }

    // Pressure chart (3 columns and a row starting with a "bar" reading)
    const isPressureChart =
      firstRowCells.length === 3 &&
      rows.some((r) => /\bbar\b/i.test(r.children[0]?.textContent || ""));

    // Is the first row a header row?
    let firstRowIsHeader;
    if (isPressureChart) {
      firstRowIsHeader =
        !!rows[0].querySelector("th") || !/\d/.test(firstCellText);
    } else {
      firstRowIsHeader =
        !!rows[0].querySelector("th") ||
        !!rows[0].querySelector("strong, b, mark, [style*='background']") ||
        !/\d/.test(firstCellText);
    }

    let headerLabels = null;
    if (firstRowIsHeader) {
      headerLabels = firstRowCells.map((c) => c.textContent.trim());
    } else if (isPressureChart) {
      headerLabels = ["Reading", "What it means", "What to do"];
    }
    const dataRows = firstRowIsHeader ? rows.slice(1) : rows;

    // Rebuild the table from scratch to drop any old inline styles, highlights and borders
    const newTable = doc.createElement("table");
    newTable.className = isPressureChart
      ? "chart-table bold-first"
      : "chart-table";

    if (headerLabels) {
      const thead = doc.createElement("thead");
      const headTr = doc.createElement("tr");
      headerLabels.forEach((h) => {
        const th = doc.createElement("th");
        th.textContent = h;
        headTr.appendChild(th);
      });
      thead.appendChild(headTr);
      newTable.appendChild(thead);
    }

    const tbody = doc.createElement("tbody");
    dataRows.forEach((row) => {
      const cells = Array.from(row.children);
      if (!cells.length) return;
      const tr = doc.createElement("tr");
      cells.forEach((cell, idx) => {
        const td = doc.createElement("td");
        td.innerHTML = cell.innerHTML;
        if (headerLabels && headerLabels[idx]) {
          td.setAttribute("data-label", headerLabels[idx]);
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    newTable.appendChild(tbody);

    const wrap = doc.createElement("div");
    wrap.className = "table-wrap";
    wrap.appendChild(newTable);
    table.replaceWith(wrap);
  });

  // 5. FAQ section -> accordion
  children = Array.from(body.children);
  const faqIdx = children.findIndex(
    (el) =>
      /^frequently asked questions/i.test((el.textContent || "").trim()) &&
      (el.textContent || "").trim().length < 60
  );

  if (faqIdx !== -1) {
    const faqHeading = children[faqIdx];
    const rest = children.slice(faqIdx + 1);

    const section = doc.createElement("section");
    section.className = "faq-section";

    const h2 = doc.createElement("h2");
    h2.textContent = "Frequently Asked Questions";
    section.appendChild(h2);

    let currentDetails = null;
    let currentAnswer = null;
    let count = 0;

    rest.forEach((el) => {
      if (isQuestionElement(el)) {
        currentDetails = doc.createElement("details");
        currentDetails.className = "faq-item";
        if (count === 0) currentDetails.setAttribute("open", "");
        const summary = doc.createElement("summary");
        summary.textContent = el.textContent.trim();
        currentAnswer = doc.createElement("div");
        currentAnswer.className = "faq-answer";
        currentDetails.appendChild(summary);
        currentDetails.appendChild(currentAnswer);
        section.appendChild(currentDetails);
        count++;
      } else if (currentAnswer) {
        currentAnswer.appendChild(el.cloneNode(true));
      }
    });

    if (count > 0) {
      faqHeading.replaceWith(section);
      rest.forEach((el) => el.remove());
    }
  }

  return body.innerHTML;
}

// Builds FAQPage JSON-LD from the rendered FAQ accordion so schema always matches the page
function buildFaqSchema(html) {
  if (!html || typeof window === "undefined") return null;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const items = Array.from(doc.querySelectorAll(".faq-item"));
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.querySelector("summary")?.textContent.trim() || "",
      acceptedAnswer: {
        "@type": "Answer",
        text: (item.querySelector(".faq-answer")?.textContent || "").trim(),
      },
    })),
  };
}

const blogStyles = `
.blog-content { line-height: 1.8; color: #374151; }

.blog-content > * + * { margin-top: 1.1rem; }

.blog-content p { margin: 0; }

.blog-content h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #027cc1;
  margin-top: 2.5rem;
  line-height: 1.3;
}
.blog-content h3,
.blog-content h4 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #111827;
  margin-top: 2.25rem;
  padding-left: 0.85rem;
  border-left: 4px solid #ea5408;
  line-height: 1.35;
}
.blog-content > p > strong:only-child {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  color: #111827;
  margin-top: 1.5rem;
  padding-left: 0.85rem;
  border-left: 4px solid #ea5408;
  line-height: 1.35;
}

.blog-content a {
  color: #027cc1;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1.5px;
  transition: color 0.2s;
}
.blog-content a:hover { color: #ea5408; }

.blog-content ul { list-style: disc; padding-left: 1.5rem; }
.blog-content ul li { margin-top: 0.4rem; }

/* Direct answer callout */
.blog-content .direct-answer {
  background: linear-gradient(135deg, #eaf6fd 0%, #f6fbff 100%);
  border: 1px solid #bfe3f6;
  border-left: 6px solid #027cc1;
  border-radius: 1rem;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 6px 20px rgba(2, 124, 193, 0.08);
  margin-top: 1.5rem;
}
.blog-content .direct-answer-label {
  display: inline-block;
  background: #027cc1;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  margin-bottom: 0.75rem;
}
.blog-content .direct-answer-text {
  color: #0f2f45;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.75;
}

/* Table wrapper */
.blog-content .table-wrap {
  width: 100%;
  overflow-x: auto;
  border-radius: 1rem;
  border: 1px solid #dbe5ec;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  margin-top: 1.5rem;
  background: #ffffff;
}

/* Tables (important flags override any global table styles) */
.blog-content .table-wrap table {
  width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  border: none !important;
  margin: 0 !important;
  font-size: 0.98rem;
  background: #ffffff;
}
.blog-content .table-wrap table thead th {
  background: #027cc1 !important;
  color: #ffffff !important;
  text-align: left !important;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 1rem 1.25rem !important;
  border: none !important;
}
.blog-content .table-wrap table td {
  padding: 1rem 1.25rem !important;
  vertical-align: top !important;
  text-align: left !important;
  color: #374151 !important;
  background: #ffffff !important;
  border: none !important;
  border-top: 1px solid #e8edf2 !important;
  line-height: 1.6;
}
.blog-content .table-wrap table tbody tr:first-child td {
  border-top: none !important;
}

/* Pressure chart only: bold first column, no wrapping */
.blog-content .chart-table.bold-first td:first-child {
  font-weight: 700 !important;
  color: #111827 !important;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .blog-content .chart-table thead { display: none !important; }
  .blog-content .chart-table,
  .blog-content .chart-table tbody,
  .blog-content .chart-table tr,
  .blog-content .chart-table td { display: block !important; width: 100% !important; }
  .blog-content .chart-table tr { border-top: 1px solid #e5e7eb; padding: 0.4rem 0; }
  .blog-content .chart-table tr:first-child { border-top: none; }
  .blog-content .chart-table td {
    border-top: none !important;
    padding: 0.35rem 1.25rem !important;
    white-space: normal !important;
  }
  .blog-content .chart-table td::before {
    content: attr(data-label);
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #027cc1;
    margin-bottom: 0.15rem;
  }
}

/* Steps */
.blog-content ol.steps-list {
  list-style: none !important;
  padding: 0 !important;
  margin: 1rem 0 0 0 !important;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.blog-content ol.steps-list > li {
  list-style: none !important;
  display: flex !important;
  align-items: center;
  gap: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb !important;
  border-radius: 0.9rem !important;
  padding: 0.9rem 1.1rem !important;
  margin: 0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.blog-content ol.steps-list > li::before { content: none !important; }
.blog-content ol.steps-list .step-num {
  flex: 0 0 2.2rem;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  background: #027cc1;
  color: #ffffff;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}
.blog-content ol.steps-list .step-text {
  flex: 1;
  min-width: 0;
}

/* FAQ accordion */
.blog-content .faq-section {
  margin-top: 3rem;
  padding: 2rem;
  background: #f5fafd;
  border: 1px solid #d7ebf7;
  border-radius: 1.5rem;
}
.blog-content .faq-section > h2 {
  margin-top: 0;
  margin-bottom: 1.25rem;
  text-align: center;
}
.blog-content .faq-item {
  background: #ffffff;
  border: 1px solid #e0e7ee;
  border-radius: 0.9rem;
  margin-top: 0.8rem;
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.blog-content .faq-item[open] {
  border-color: #027cc1;
  box-shadow: 0 6px 18px rgba(2, 124, 193, 0.12);
}
.blog-content .faq-item summary {
  list-style: none;
  cursor: pointer;
  padding: 1.1rem 3.25rem 1.1rem 1.25rem;
  font-weight: 700;
  font-size: 1.05rem;
  color: #111827;
  position: relative;
}
.blog-content .faq-item summary::-webkit-details-marker { display: none; }
.blog-content .faq-item summary::after {
  content: "+";
  position: absolute;
  right: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 999px;
  background: #e6f4fb;
  color: #027cc1;
  font-weight: 800;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.blog-content .faq-item[open] summary { color: #027cc1; }
.blog-content .faq-item[open] summary::after {
  content: "\\2212";
  background: #027cc1;
  color: #ffffff;
}
.blog-content .faq-item .faq-answer {
  padding: 0 1.25rem 1.25rem;
  color: #4b5563;
  line-height: 1.75;
}
.blog-content .faq-item .faq-answer > * + * { margin-top: 0.75rem; }
`;

function FormattedTitle({ title }) {
  if (!title) return null;

  if (title.includes(":")) {
    const colonIndex = title.indexOf(":");
    const orangePart = title.substring(0, colonIndex + 1);
    const bluePart = title.substring(colonIndex + 1).trim();

    return (
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight flex flex-col items-center gap-2 text-center">
        <span className="text-[#ea5408]">{orangePart}</span>
        {bluePart && <span className="text-[#027cc1]">{bluePart}</span>}
      </h1>
    );
  }

  return (
    <h1 className="text-3xl md:text-5xl font-extrabold text-[#027cc1] mb-6 leading-tight text-center">
      {title}
    </h1>
  );
}

export default function BlogDetailClient({ blog }) {
  const contentRef = useRef(null);
  const faqSchemaRef = useRef(null);

  useEffect(() => {
    const cleanContent = enhanceBlogContent(
      cleanBlogContent(blog.description),
      blog.title
    );

    if (contentRef.current) {
      contentRef.current.innerHTML = cleanContent;
    }
    if (faqSchemaRef.current) {
      const faqSchema = buildFaqSchema(cleanContent);
      faqSchemaRef.current.textContent = faqSchema
        ? JSON.stringify(faqSchema)
        : "";
    }
  }, [blog.description, blog.title]);

  return (
    <article className="mt-[50px] w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <style dangerouslySetInnerHTML={{ __html: blogStyles }} />

      <script ref={faqSchemaRef} type="application/ld+json" />

      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <header className="mb-10 text-center">

          <FormattedTitle title={blog.title} />

          <div className="w-20 h-1.5 bg-[#027cc1] mx-auto rounded-full"></div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={`/api/blogs/${encodeURIComponent(blog.slug)}/image`}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            unoptimized
            fetchPriority="high"
            className="object-cover"
          />
        </div>

        {/* Render Cleaned Content */}
        <div
          ref={contentRef}
          className="blog-content text-gray-700 text-base md:text-lg w-full"
          dangerouslySetInnerHTML={{
            __html: cleanBlogContent(blog.description),
          }}
        />

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link
            href="/blogs"
            className="text-[#ea5408] font-bold hover:underline flex items-center"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    </article>
  );
}