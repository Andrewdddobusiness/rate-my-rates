import { Container, Text } from "@nextui-org/react";

import { motion } from "framer-motion";

const Banner: React.FC = () => {
  return (
    <Container
      display="flex"
      alignItems="center"
      direction="column"
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
    >
      <motion.div
        animate={{
          y: ["0%", "5%", "0%"], // Animate the y-axis position of the text
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Text
          h1
          size={76}
          css={{
            textGradient: "45deg, $blue600 -20%, $green600 100%",
          }}
        >
          Rate My Rates
        </Text>
      </motion.div>
    </Container>
  );
};

export default Banner;
