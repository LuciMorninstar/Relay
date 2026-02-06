import arcjet, {shield,detectBot,slidingWindow} from "@arcjet/node";

export const aj = arcjet({

  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
      ],
    }),
  
    slidingWindow({
      mode: "LIVE",
      interval:60,
      limit:5,
      max:100

    }),
  ],
});

