import React, { useState } from 'react';

export default function About() {
  //const [contactInfo, setContactInfo] = useState({ name: '', email: '', message: '' });

  //const [supportInfo, setSupportInfo] = useState({ issue: '', description: '' });

  //const [submissionMessage, setSubmissionMessage] = useState('');
  //const [formSubmitted, setFormSubmitted] = useState(null); 

  //const handleContactChange = (e) => {
  //  setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  //};

  //const handleSupportChange = (e) => {
  //  setSupportInfo({ ...supportInfo, [e.target.name]: e.target.value });
  //};

  //const handleContactSubmit = (e) => {
  //  e.preventDefault();
  //  console.log("Contact form submitted", contactInfo);
  //  setSubmissionMessage('Tack för att du kontaktar oss. Vi återkommer till dig inom 24h.');
  //  setFormSubmitted('contact'); 
  //};

  //const handleSupportSubmit = (e) => {
  //  e.preventDefault();
  //  console.log("Support form submitted", supportInfo);
  //  setSubmissionMessage('Tack för att du kontaktar oss! Vi återkommer till dig inom 24h.');
  //  setFormSubmitted('support'); 
  //};

  return (
    <div className="container py-4" id="home">
      <div className="col-lg-8 mx-auto py-5">
        <h1 className="aboutheader">
          Om NutriDay<br />
          <br />Startat i 2024, NutriDay är en online och mobil (iOS, Android) kalori- och näringsämnesräknare. NutriDay guidar dig genom din resa med exakt kalori- och näringsämnesdata.<br />
          <br />Få detaljerad och nedbruten information om ditt intag av protein, fett och kolydrater, inklusive socker, fibrer, mättade fetter m.m. Justera ditt intag efter personligt behag.<br />
          <br />
          <br /> Mission <br />
          <br />Vi här på NutriDay värderar din hälsa och vad du stoppar i munnen!
          Det är därför vi skapade denna app så du kan enklare spåra din diet.
          Med riktig och exakt information från Livsmedelsverket,
          kan du se all näringsämnesinformation du behöver från individuella matprodukter.
          <br />
          <br />
          Data från Riksmaten vuxna 2010-11 från https://www.livsmedelsverket.se/om-oss/psidata/apimatvanor 2024-08-20. Beräkningar av energi- och näringsämnen bygger på Livsmedelsverkets livsmedelsdatabas version Riksmaten vuxna 2010-11.<br />
          <br />
          <br />
          Gratis affärsmodell
          <br />
          <br />
          Huvudfunktionerna i NutriDay fungerar kostnadsfritt. Det finns ingen reklam eller funktioner att betala för.
        </h1>
      </div>

      {/* Code for eventual additions of contact and support information. */ }
      {/*<div className="row justify-content-center">*/}
      {/*  <div className="col-md-5 mx-2">*/}
      {/*    <div className={`contact-form py-4 px-4 border rounded ${formSubmitted === 'contact' ? 'd-none' : ''}`}>*/}
      {/*      <h2 className="text-center-about">Kontakt</h2>*/}
      {/*      <form onSubmit={handleContactSubmit}>*/}
      {/*        <div className="mb-3">*/}
      {/*          <label htmlFor="contact-name" className="form-label-about">Namn</label>*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            className="form-control"*/}
      {/*            id="contact-name"*/}
      {/*            name="name"*/}
      {/*            value={contactInfo.name}*/}
      {/*            onChange={handleContactChange}*/}
      {/*            required*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <div className="mb-3">*/}
      {/*          <label htmlFor="contact-email" className="form-label-about">Email</label>*/}
      {/*          <input*/}
      {/*            type="email"*/}
      {/*            className="form-control"*/}
      {/*            id="contact-email"*/}
      {/*            name="email"*/}
      {/*            value={contactInfo.email}*/}
      {/*            onChange={handleContactChange}*/}
      {/*            required*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <div className="mb-3">*/}
      {/*          <label htmlFor="contact-message" className="form-label-about">Meddelande</label>*/}
      {/*          <textarea*/}
      {/*            className="form-control"*/}
      {/*            id="contact-message"*/}
      {/*            name="message"*/}
      {/*            rows="3"*/}
      {/*            value={contactInfo.message}*/}
      {/*            placeholder="Skriv ett meddelande"*/}
      {/*            onChange={handleContactChange}*/}
      {/*            required*/}
      {/*          ></textarea>*/}
      {/*        </div>*/}
      {/*        <button type="submit" className="btn-about w-25">Skicka</button>*/}
      {/*      </form>*/}
      {/*    </div>*/}
      {/*    {formSubmitted === 'contact' && (*/}
      {/*      <div className="alert alert-success py-4 px-4 border rounded">*/}
      {/*        {submissionMessage}*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}

      {/*  <div className="col-md-5 mx-2">*/}
      {/*    <div className={`support-form py-4 px-4 border rounded ${formSubmitted === 'support' ? 'd-none' : ''}`}>*/}
      {/*      <h2 className="text-center-about">Support</h2>*/}
      {/*      <form onSubmit={handleSupportSubmit}>*/}
      {/*        <div className="mb-3">*/}
      {/*          <label htmlFor="support-name" className="form-label-about">Namn</label>*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            className="form-control"*/}
      {/*            id="support-name"*/}
      {/*            name="name"*/}
      {/*            value={supportInfo.name}*/}
      {/*            onChange={handleSupportChange}*/}
      {/*            required*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <div className="mb-3">*/}
      {/*          <label htmlFor="support-email" className="form-label-about">Email</label>*/}
      {/*          <input*/}
      {/*            type="email"*/}
      {/*            className="form-control"*/}
      {/*            id="support-email"*/}
      {/*            name="email"*/}
      {/*            value={supportInfo.email}*/}
      {/*            onChange={handleSupportChange}*/}
      {/*            required*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <div className="mb-3">*/}
      {/*          <label htmlFor="issue" className="form-label-about">Problem</label>*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            className="form-control"*/}
      {/*            id="issue"*/}
      {/*            name="issue"*/}
      {/*            value={supportInfo.issue}*/}
      {/*            onChange={handleSupportChange}*/}
      {/*            required*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <div className="mb-3">*/}
      {/*          <label htmlFor="description" className="form-label-about">Beskrivning</label>*/}
      {/*          <textarea*/}
      {/*            className="form-control"*/}
      {/*            id="description"*/}
      {/*            name="description"*/}
      {/*            rows="3"*/}
      {/*            value={supportInfo.description}*/}
      {/*            onChange={handleSupportChange}*/}
      {/*            placeholder="Beskriv ditt problem så utförligt som möjligt"*/}
      {/*            required*/}
      {/*          ></textarea>*/}
      {/*        </div>*/}
      {/*        <button type="submit" className="btn-about w-25">Skicka</button>*/}
      {/*      </form>*/}
      {/*    </div>*/}
      {/*    {formSubmitted === 'support' && (*/}
      {/*      <div className="alert alert-success py-4 px-4 border rounded">*/}
      {/*        {submissionMessage}*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
