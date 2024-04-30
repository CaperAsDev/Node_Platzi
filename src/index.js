import createApp from "./app.js";

const port = process.env.PORT || 3000
const app = await createApp();

app.listen(port, ()=> {
  console.log(`Corriendo en http://localhost:${port}`);
})
