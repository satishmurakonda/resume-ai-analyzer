import { useRef, useState } from 'react';
import './Dashboard.css';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function MaterialIcon({ children, className = '' }) {
  return <span className={`material-icons ${className}`.trim()} aria-hidden="true">{children}</span>;
}


function ProfileCard({ user }) {
  const displayName = user?.displayName || 'Google User';
  const photoURL = user?.photoURL;

  return (
    <section className="dashboard-profile-card">
      <h2>Analyze With AI</h2>

      {photoURL ? (
        <img
          className="dashboard-profile-avatar"
          src={photoURL}
          alt={`${displayName}'s profile`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="dashboard-profile-placeholder">
          {displayName.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="dashboard-profile-name">
        {displayName}
      </div>

      <div className="dashboard-profile-role">
        <span />
        AI Resume Reviewer
      </div>
    </section>
  );
}


export default function Dashboard( {user} ) {
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
          <div className="dashboard-instruction-title"><NotificationsActiveIcon sx = {{color: "red"}}/><strong>Important instructions</strong></div>
          <div className="dashboard-instruction-row"><DescriptionIcon/><span>Paste the complete job description in the "Jobd Description: field before submitting".</span></div>
          <div className="dashboard-instruction-row"><AttachFileIcon/><span>Only PDF format (.pdf) resumes are accepted.</span></div>
        </section>

        <section className="dashboard-upload-section" aria-label="Upload resume">
          <div className={`dashboard-file-display ${resume ? 'has-file' : ''}`}>
            <>{resume ? <PictureAsPdfIcon sx= {{fontSize: 70 ,color : "#F27A22",marginLeft: 20}}/> : <CloudDownloadIcon sx= {{fontSize: 70 ,color : "#F27A22",marginLeft: 20}}/>}</>
            <div className="dashboard-file-copy">
              <strong title={resume?.name}>{resume ? resume.name : 'Upload your resume'}</strong>
              <span>{resume ? `${(resume.size / 1024 / 1024).toFixed(2)} MB · PDF document` : ''}</span>
            </div>
            {resume && <button type="button" className="dashboard-clear-file" aria-label="Remove selected resume" onClick={removeResume}></button>}
          </div>
          <input ref={fileInputRef} className="dashboard-hidden-file-input" id="resume-upload" type="file" accept=".pdf,application/pdf" onChange={handleFileChange} />
          <button type="button" className="dashboard-gradient-button dashboard-upload-button" onClick={() => fileInputRef.current?.click()}>
            <span>{resume ? 'Change Resume' : 'Upload Resume'}</span>
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
        <ProfileCard user={user} />
      </aside>
    </div>
  );
}
