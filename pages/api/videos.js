// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    "videos": [
      {
        id: 1,
        previewImage: "photo-1652339943823-e5a6cceda9ab",
        youtubeId: "xsLJZyih3Ac"
      },
      {
        id: 2,
        previewImage: "photo-1652235858716-5f3ae94a3a38",
        youtubeId: "uBEL3YVzMwk"
      },
      {
        id: 3,
        previewImage: "photo-1652318259140-99520e69ad93",
        youtubeId: "3c584TGG7jQ"
      },
      {
        id: 4,
        previewImage: "photo-1562158147-f8d6fbcd76f8",
        youtubeId: "dQw4w9WgXcQ"
      }
    ]
   })
}
