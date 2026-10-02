'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    }


const FAQItem : React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="text-xl font-medium">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Plus className="w-6 h-6 " />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-neutral-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: "What are your core services as a UX design and branding firm?",
      answer: "We specialize in user experience design, brand identity development, and web design services that help businesses create meaningful connections with their audiences."
    },
    {
      question: "What separates Epic from other branding and web design agencies?",
      answer: "Our unique approach combines strategic thinking with cutting-edge design practices, ensuring each project delivers both aesthetic excellence and measurable results."
    },
    {
      question: "Do you work with clients in different timezones?",
      answer: "Yes, we have experience working with clients globally and maintain flexible communication schedules to accommodate different time zones."
    },
    {
      question: "How much does hiring you for a design project cost?",
      answer: "Our pricing varies based on project scope and requirements. We offer customized solutions to meet different budget ranges while maintaining high-quality deliverables."
    },
    {
      question: "What is your design process like?",
      answer: "Our design process is collaborative and iterative, involving clients at every stage to ensure the final product meets their unique needs and goals while maintaining our high standards of quality."
    },
    {
        question: "How long does it take to complete a typical design project?",
        answer: "The timeline for each project varies depending on its complexity and scope. We work closely with clients to establish realistic deadlines and ensure timely delivery."
    }
  ];

  return (
    <div className=" 
    
    mx-auto 2xl:w-4/5 md:px-16
    
     px-6   py-16 pb-32 ">
      <h1 className="text-4xl font-bold mb-12 ">FAQ</h1>
      <div className="space-y-2">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;