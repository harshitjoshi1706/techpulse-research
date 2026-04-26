import React from "react";
function About() {
  return (
    <section className="section page-section">
      <div className="container about-layout">
        <div>
          <p className="eyebrow">About TechPulse CSR</p>
          <h1>A compact tech publishing UI for rendering research.</h1>
          <p className="section-intro">
            TechPulse CSR is Version 1 of a mini news and blog platform. It is built as a
            client-rendered React application so the same interface can later be compared
            with server-rendered and statically generated versions.
          </p>
        </div>

        <div className="about-panel">
          <h2>Version 1 scope</h2>
          <ul>
            <li>Client Side Rendering only</li>
            <li>Local JSON article dataset</li>
            <li>Search by article title</li>
            <li>Category pages and category filtering</li>
            <li>Load more pagination</li>
            <li>Responsive card-based layout</li>
          </ul>
        </div>

        <div className="about-columns">
          <div>
            <h2>Architecture</h2>
            <p>
              Articles are loaded in the browser through React state and effects. The
              component structure keeps navigation, cards, search, hero, footer, and
              pagination reusable across future rendering modes.
            </p>
          </div>
          <div>
            <h2>Design approach</h2>
            <p>
              The interface uses a white canvas, restrained blue accent, professional
              typography, and scan-friendly spacing for a polished research comparison
              baseline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
