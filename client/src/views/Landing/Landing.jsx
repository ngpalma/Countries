import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import handsBg from "./Hands.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const Landing = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-between h-screen overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${handsBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full py-10 w-full">

        {/* Title */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-widest uppercase drop-shadow-lg text-center px-4"
        >
          Aplicación de Países
        </motion.h1>

        {/* Globe */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col items-center gap-3">
          <Link
            to="/home"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
          >
            <motion.img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Globo_terraqueo_3.gif"
              alt="Mapa mundi"
              className="rounded-full shadow-2xl border-4 border-brand-amber"
              animate={{ width: hovered ? 280 : 160, height: hovered ? 280 : 160 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ boxShadow: "0 0 40px rgba(253,180,75,0.5)" }}
            />
          </Link>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.2 }}
            className="text-brand-amber font-semibold tracking-widest uppercase text-sm"
          >
            Ingresar al sitio
          </motion.span>
        </motion.div>

        {/* Author + social links */}
        <motion.div {...fadeUp(0.5)} className="flex flex-col items-center gap-4">
          <h2 className="text-white text-xl font-semibold drop-shadow">
            Por Nicolás Palma
          </h2>
          <div className="flex items-center gap-5">
            {[
              { href: "https://www.linkedin.com/in/nicolas-gerardo-palma/", src: "https://www.pngplay.com/wp-content/uploads/12/LinkedIn-No-Background.png", alt: "LinkedIn" },
              { href: "https://github.com/ngpalma", src: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", alt: "GitHub" },
              { href: "mailto:nicolasgerardopalma@gmail.com", src: "https://cdn.onlinewebfonts.com/svg/img_432958.png", alt: "Gmail" },
            ].map(({ href, src, alt }) => (
              <motion.div key={alt} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                <Link to={href} target="_blank">
                  <img src={src} alt={alt} className="w-11 h-11 rounded-full object-cover bg-white p-1 ring-2 ring-transparent hover:ring-brand-amber transition-all duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Landing;
