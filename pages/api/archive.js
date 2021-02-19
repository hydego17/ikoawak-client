import { getAllArchives } from "lib/archive";

export default async function getArchives(req, res) {
  try {
    const data = await getAllArchives();

    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).end();
  }
}
