// Import multiple files at once
// eager - import the files immediately instead of assigning
//         them to functions
//         So instead of links['file_name']().then(file=>console.log(file))
//         Like this console.log(links['file_name'])
// Import all pdfs in the folder
export const links = import.meta.glob(
    "../assets/pdfs/*.pdf", 
    { eager: true, import: "default" }
);