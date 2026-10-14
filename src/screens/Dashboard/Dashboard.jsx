import { useRef, useState } from 'react';
import './Dashboard.css';

function MaterialIcon({ children, className = '' }) {
  return <span className={`material-icons ${className}`.trim()} aria-hidden="true">{children}</span>;
}

function ProfileCard() {
  return (
    <section className="dashboard-profile-card">
      <h2>Analyze With AI</h2>
      <img
        className="dashboard-profile-avatar"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=85"
        alt="Profile"
      />
      <div className="dashboard-profile-name">Mashhood Ahmad<br />Danish</div>
      <div className="dashboard-profile-role"><span /> AI Resume Reviewer</div>
    </section>
  );
}

export default function Dashboard() {
  const fileInputRef = useRef(null);
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isReady, setIsReady] = useState(false);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    setMessage('');
    setIsReady(false);
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setResume(null);
      event.target.value = '';
      setMessage('Please choose a PDF resume.');
      return;
    }
    setResume(file);
  }

  function handleAnalyze() {
    if (!resume) {
      setMessage('Upload your resume in PDF format first.');
      setIsReady(false);
      return;
    }
    if (!jobDescription.trim()) {
      setMessage('Paste the job description before analyzing.');
      setIsReady(false);
      return;
    }
    setMessage('');
    setIsReady(true);
  }

  function removeResume() {
    setResume(null);
    setIsReady(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="dashboard-layout">
      <main className="dashboard-screening-card">
        <div className="dashboard-eyebrow"><span /> SMART RESUME SCREENING</div>
        <h1>Resume Match Score</h1>
        <p className="dashboard-intro">See how closely a candidate matches the role requirements.</p>

        <section className="dashboard-instructions">
          <div className="dashboard-instruction-title"><MaterialIcon>notifications</MaterialIcon><strong>Important instructions</strong></div>
          <div className="dashboard-instruction-row"><MaterialIcon>description</MaterialIcon><span>Paste the complete job description in the field below.</span></div>
          <div className="dashboard-instruction-row"><MaterialIcon>picture_as_pdf</MaterialIcon><span>Only PDF format resumes are accepted.</span></div>
        </section>

        <section className="dashboard-upload-section" aria-label="Upload resume">
          <div className={`dashboard-file-display ${resume ? 'has-file' : ''}`}>
            <MaterialIcon>{resume ? 'task' : 'upload_file'}</MaterialIcon>
            <div className="dashboard-file-copy">
              <strong title={resume?.name}>{resume ? resume.name : 'Upload your resume'}</strong>
              <span>{resume ? `${(resume.size / 1024 / 1024).toFixed(2)} MB · PDF document` : 'Choose a PDF file from your computer'}</span>
            </div>
            {resume && <button type="button" className="dashboard-clear-file" aria-label="Remove selected resume" onClick={removeResume}><MaterialIcon>close</MaterialIcon></button>}
          </div>
          <input ref={fileInputRef} className="dashboard-hidden-file-input" id="resume-upload" type="file" accept=".pdf,application/pdf" onChange={handleFileChange} />
          <button type="button" className="dashboard-gradient-button dashboard-upload-button" onClick={() => fileInputRef.current?.click()}>
            <MaterialIcon>cloud_upload</MaterialIcon><span>{resume ? 'Change Resume' : 'Upload Resume'}</span>
          </button>
        </section>

        <label className="dashboard-field-label" htmlFor="job-description">Job description</label>
        <div className="dashboard-description-area">
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(event) => { setJobDescription(event.target.value); setMessage(''); setIsReady(false); }}
            placeholder="Paste your job description here..."
            rows="7"
          />
          <div className="dashboard-textarea-footer"><span>Include responsibilities, skills, and qualifications.</span><span>{jobDescription.length} characters</span></div>
        </div>

        <div className="dashboard-action-row">
          {message && <p className="dashboard-form-message" role="alert"><MaterialIcon>error_outline</MaterialIcon>{message}</p>}
          <button type="button" className="dashboard-gradient-button dashboard-analyze-button" onClick={handleAnalyze}>
            <span>Analyze</span><MaterialIcon>auto_awesome</MaterialIcon>
          </button>
        </div>

        {isReady && (
          <div className="dashboard-result-notice" role="status">
            <MaterialIcon>check_circle</MaterialIcon>
            <div><strong>Ready for AI analysis</strong><p>Your PDF and job description are ready. Backend AI analysis will be connected in the next step.</p></div>
          </div>
        )}
      </main>

      <aside className="dashboard-right-column">
        <ProfileCard />
        <div className="dashboard-tip-card">
          <div className="dashboard-tip-icon"><MaterialIcon>tips_and_updates</MaterialIcon></div>
          <div><strong>Pro tip</strong><p>A detailed job description helps produce a more useful match analysis.</p></div>
        </div>
      </aside>
    </div>
  );
}
