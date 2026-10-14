import './History.css';

export default function History() {
  return (
    <section className="history-page">
      <div className="history-page-icon"><span className="material-icons" aria-hidden="true">history</span></div>
      <p className="history-page-eyebrow">YOUR ACTIVITY</p>
      <h1>Analysis History</h1>
      <p className="history-page-description">Your previous resume analyses will appear here when the backend and history storage are connected.</p>
      <span className="history-page-badge">Coming in the next phase</span>
    </section>
  );
}
