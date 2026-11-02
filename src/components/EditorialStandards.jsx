export default function EditorialStandards() {
  return (
    <section className="standards">
      <div className="wrap">
        <div className="std-head">
          <h2>How We Report</h2>
          <p>
            Longevity Reviewed is independent. We take no brand sponsorships and no advertising. Our reporting follows one standard: follow the evidence, wherever it leads.
          </p>
        </div>
        <div className="std-grid">
          <div className="std-item">
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Editorially Independent</h3>
            <p>No brand pays for coverage or placement. Editors decide, not advertisers.</p>
          </div>
          <div className="std-item">
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="M9 4h6M10 4v4l-4 9a2 2 0 002 3h8a2 2 0 002-3l-4-9V4" />
              </svg>
            </div>
            <h3>Evidence First</h3>
            <p>We prioritise human trials and peer-reviewed research, and we link our sources.</p>
          </div>
          <div className="std-item">
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l3 2" />
              </svg>
            </div>
            <h3>Corrections, Openly</h3>
            <p>When we get something wrong we fix it in the open, with a dated note.</p>
          </div>
          <div className="std-item">
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </div>
            <h3>Clear Labelling</h3>
            <p>Any commercial content is clearly labelled and kept separate from our reporting.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
