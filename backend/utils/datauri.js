import DataURI from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataURI();
  const extName = path.extname(file.originalname).toString();
  // parser.format returns an object with a `content` string (data URI)
  // return that object directly so callers can use `fileUri.content`.
  return parser.format(extName, file.buffer);
};

export default getDataUri;