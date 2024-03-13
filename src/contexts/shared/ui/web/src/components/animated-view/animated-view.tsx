import { motion } from 'framer-motion'
export function AnimatedView({ children }: any) {
  return <>
    <motion.div
      initial={{opacity: 0, height: 0}}
      animate={{opacity: 1, height: '100%'}}
      exit={{opacity: 0, height: 0, }}
      transition={{duration: 0.5}}
    >
      {children}
    </motion.div>
  </>
}
