// import { getSingleProject } from "lib/api";
// import { getSingleArchive } from "lib/archive";

// export default async function previewReadOnly(req, res) {
//   if (
//     req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
//     !req.query.slug
//   ) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }

//   const project = await getSingleProject(req.query.slug);
//   const archive = await getSingleArchive(req.query.slug);

//   if (!project && !archive) {
//     return res.status(401).json({ message: "Invalid Slug" });
//   }

//   res.setPreviewData({ message: "ok" });

//   if (project) {
//     res.writeHead(307, { Location: `/projects/${project.slug}` });
//   }
//   if (archive) {
//     res.writeHead(307, { Location: `/archive/${archive.slug}` });
//   }

//   res.end();
// }
