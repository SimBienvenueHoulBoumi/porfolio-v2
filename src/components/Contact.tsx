"use client";
import { FC } from "react";

const Contact: FC = () => (
  <section id="contact" className="py-16 px-4 bg-gradient-to-br from-gray-950 to-black">
    <div className="max-w-2xl mx-auto text-center fade-in">
      <h3 className="text-3xl font-bold mb-8 text-blue-400">Contact</h3>
      <p className="mb-6 text-lg text-gray-200">
        Discutons de votre projet ! <br />
        Email : <a href="mailto:houlboumi.sim.bienvenue@gmail.com" className="underline text-blue-300">houlboumi.sim.bienvenue@gmail.com</a>
      </p>
      <div className="flex justify-center gap-8 text-3xl mb-2">
        <a href="https://github.com/SimBienvenueHoulBoumi" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-gray-400"><span role="img" aria-label="github">🐙</span></a>
        <a href="https://www.linkedin.com/in/sim-bienvenue-houl-boumi/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-gray-400"><span role="img" aria-label="linkedin">💼</span></a>
      </div>
    </div>
  </section>
);

export default Contact;
