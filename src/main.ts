import { mount } from "svelte";
import App from "./App.svelte";
import "./style/normalize.css";
import "./style/app.css";

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
