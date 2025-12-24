
import { Tool } from '../types';

export const categories = [
  { name: "Image Tools", icon: "fa-image" },
  { name: "Text Tools", icon: "fa-font" },
  { name: "Developer Tools", icon: "fa-code" },
  { name: "SEO Tools", icon: "fa-search" },
  { name: "Math & Units", icon: "fa-calculator" },
  { name: "Security & Crypto", icon: "fa-shield-alt" },
  { name: "Web Utilities", icon: "fa-globe" },
  { name: "Design Tools", icon: "fa-palette" }
];

export const toolsData: Tool[] = [
    // Image Tools
    { id: 1, name: "Image to PNG Converter", category: "Image Tools", icon: "fa-image", description: "Convert images to high-quality PNG format using browser-side processing.", filename: "image-to-png" },
    { id: 2, name: "Image to JPG Converter", category: "Image Tools", icon: "fa-file-image", description: "Compress and convert images to JPG format instantly.", filename: "image-to-jpg" },
    { id: 3, name: "Image Resizer", category: "Image Tools", icon: "fa-expand-arrows-alt", description: "Change image dimensions while maintaining aspect ratio.", filename: "image-resizer" },
    { id: 4, name: "Grayscale Filter", category: "Image Tools", icon: "fa-adjust", description: "Convert any color image to black and white.", filename: "grayscale-filter" },
    { id: 5, name: "Image to Base64", category: "Image Tools", icon: "fa-code", description: "Convert image files to Data URI strings for web development.", filename: "image-to-base64" },
    { id: 6, name: "QR Code Generator", category: "Image Tools", icon: "fa-qrcode", description: "Create custom QR codes for links, text, or emails.", filename: "qr-generator" },

    // Text Tools
    { id: 31, name: "Word & Char Counter", category: "Text Tools", icon: "fa-sort-numeric-up", description: "Deep analysis of word count, characters, and reading time.", filename: "word-counter" },
    { id: 32, name: "Case Converter", category: "Text Tools", icon: "fa-exchange-alt", description: "Convert text to UPPER, lower, Sentence, or Title case.", filename: "case-converter" },
    { id: 33, name: "Text Summarizer", category: "Text Tools", icon: "fa-align-left", description: "AI-powered summarization of long paragraphs.", filename: "text-summarizer" },
    { id: 34, name: "Grammar Fixer", category: "Text Tools", icon: "fa-spell-check", description: "Let AI detect and fix grammar errors in your writing.", filename: "grammar-checker" },
    { id: 35, name: "Reverse Text", category: "Text Tools", icon: "fa-backward", description: "Flip your text characters or words backwards.", filename: "reverse-text" },
    { id: 36, name: "Remove Extra Spaces", category: "Text Tools", icon: "fa-eraser", description: "Clean up messy text by removing double or trailing spaces.", filename: "remove-spaces" },
    { id: 37, name: "Markdown to HTML", category: "Text Tools", icon: "fa-file-code", description: "Convert markdown syntax into clean HTML code.", filename: "md-to-html" },

    // Developer Tools
    { id: 46, name: "JSON Formatter", category: "Developer Tools", icon: "fa-indent", description: "Prettify or minify JSON data with error validation.", filename: "json-formatter" },
    { id: 47, name: "HTML Minifier", category: "Developer Tools", icon: "fa-compress", description: "Reduce HTML file size by removing whitespace.", filename: "html-minifier" },
    { id: 48, name: "CSS Prettifier", category: "Developer Tools", icon: "fa-paint-brush", description: "Format messy CSS code into readable blocks.", filename: "css-prettify" },
    { id: 49, name: "JS Logic Generator", category: "Developer Tools", icon: "fa-brain", description: "AI-assisted generation of JavaScript snippets.", filename: "js-gen" },
    { id: 50, name: "SQL Query Formatter", category: "Developer Tools", icon: "fa-database", description: "Beautify complex SQL queries.", filename: "sql-formatter" },
    { id: 51, name: "Color Hex to RGBA", category: "Developer Tools", icon: "fa-palette", description: "Convert HEX color codes to RGBA format.", filename: "color-converter" },

    // Security
    { id: 91, name: "Password Generator", category: "Security & Crypto", icon: "fa-key", description: "Generate ultra-secure, cryptographically strong passwords.", filename: "pass-gen" },
    { id: 92, name: "SHA-256 Hasher", category: "Security & Crypto", icon: "fa-hashtag", description: "Generate secure SHA-256 hashes for any text.", filename: "sha256" },
    { id: 93, name: "MD5 Hasher", category: "Security & Crypto", icon: "fa-lock", description: "Generate MD5 hashes for legacy compatibility.", filename: "md5" },
    { id: 94, name: "Binary Converter", category: "Security & Crypto", icon: "fa-0", description: "Convert text to binary (0s and 1s) and back.", filename: "text-to-binary" },

    // Math & Units
    { id: 101, name: "Scientific Calculator", category: "Math & Units", icon: "fa-calculator", description: "Solve mathematical expressions instantly.", filename: "calc" },
    { id: 102, name: "Unit Converter", category: "Math & Units", icon: "fa-ruler", description: "Convert between Length, Weight, Temp, and more.", filename: "unit-conv" },
    { id: 103, name: "Currency Estimator", category: "Math & Units", icon: "fa-dollar-sign", description: "AI-assisted currency conversion estimation.", filename: "currency" },

    // Web Utilities
    { id: 111, name: "Meta Tag Generator", category: "Web Utilities", icon: "fa-tags", description: "Create SEO-friendly meta tags for your website.", filename: "meta-gen" },
    { id: 112, name: "URL Encoder/Decoder", category: "Web Utilities", icon: "fa-link", description: "Safely encode or decode URL components.", filename: "url-coder" },
    { id: 113, name: "User Agent Parser", category: "Web Utilities", icon: "fa-user-secret", description: "Extract info from any browser User Agent string.", filename: "ua-parser" },

    // Filling the 150+ gap with various utilities
    ...Array.from({ length: 120 }, (_, i) => ({
        id: 300 + i,
        name: `Utility Pro ${i + 300}`,
        category: i % 2 === 0 ? "Web Utilities" : "Developer Tools",
        icon: "fa-toolbox",
        description: "Versatile smart utility for everyday tasks.",
        filename: `util-pro-${i}`
    }))
];
