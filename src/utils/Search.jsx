import pdfData from "./pdfs.json";
import { links } from "./CreateLinks";

// Modify the pdfData json to add a link key that contains
// the imported pdf as a value
const resolvedPdfs = pdfData.map((pdf) => {
  const key = `../assets/pdfs/${pdf.name}`;
  return {
    ...pdf,
    link: links[key],
  };
});

export default function Search(query) {
  if (!query) return resolvedPdfs;

  const q = query.toLowerCase();

  return resolvedPdfs.filter((pdf) => 
    pdf.office.toLowerCase().includes(q)
  );
}