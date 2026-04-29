import { Home, Form, Detail, Landing } from "./views/index.js";
import { NavBar } from "./components/index.js";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.2,  ease: "easeIn"  } },
};

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Toaster position="top-right" richColors closeButton />
      {location.pathname !== "/" && <NavBar />}
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <Routes location={location}>
            <Route exact path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
