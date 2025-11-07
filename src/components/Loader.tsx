import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center gap-2" role="status" aria-label="Loading">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-1 h-8 bg-gradient-primary rounded-full"
          animate={{
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Listening to voice command...</span>
    </div>
  );
};

export default Loader;
