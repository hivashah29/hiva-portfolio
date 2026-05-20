import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ZenlyProject from "./pages/ZenlyProject"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zenly" element={<ZenlyProject />} />
      </Routes>
    </BrowserRouter>
  )
}
