import SiteSetting from '../models/SiteSetting.js';

export const getAll = async (req, res) => {
  try {
    const settings = await SiteSetting.find();
    const map = {};
    settings.forEach((s) => { map[s.key] = s.value; });
    res.json(map);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const entries = req.body;
    const keys = Object.keys(entries);
    const ops = keys.map((key) => ({
      updateOne: {
        filter: { key },
        update: { $set: { value: entries[key] } },
        upsert: true,
      },
    }));
    await SiteSetting.bulkWrite(ops);
    const updated = await SiteSetting.find();
    const map = {};
    updated.forEach((s) => { map[s.key] = s.value; });
    res.json(map);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
