import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";
import { BiSolidMinusCircle } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, toggleAccordion }) => {
  return (
    <AccordionItem className="wow fadeInUp">
      <AccordionButton onClick={toggleAccordion}>
        <Box flex="1" textAlign="left">
          <Text
            fontSize="18px"
            fontWeight="500"
            fontFamily="Montserrat"
            color="black"
            transition="color 0.3s ease"
          >
            {question}
          </Text>
        </Box>
        <AccordionIcon>
          {isOpen ? (
            <BiSolidMinusCircle size={"20px"} color={"#E65D0F"} />
          ) : (
            <BsFillPlusCircleFill size={"20px"} color={"#010156"} />
          )}
        </AccordionIcon>
      </AccordionButton>
      <AccordionPanel>
        <Text>{answer}</Text>
      </AccordionPanel>
    </AccordionItem>
  );
};

interface FAQProps {
  faqData: { question: string; answer: string }[];
}

export const FAQ: React.FC<FAQProps> = ({ faqData }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => () => {
    setExpanded(expanded === panel ? false : panel);
  };

  return (
    <Box className="col-lg-6 mt-5 mt-lg-0">
      <Box className="faq-content style-2 style-color">
        <Accordion allowToggle>
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={expanded === `panel${index}`}
              toggleAccordion={handleChange(`panel${index}`)}
            />
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};
