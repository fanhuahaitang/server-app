import multer from "@koa/multer";

const upload = multer();

const uploadFilesMiddleware = upload.any();

export default uploadFilesMiddleware;