import { useState } from 'react';

const FileUpload = ({ onFileSelect, currentFile, onRemove }) => {
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      onFileSelect(file);
    } else {
      setSelectedFileName('');
      onFileSelect(null);
    }
  };

  const displayName = selectedFileName
    || (currentFile ? currentFile.originalName || currentFile.filename : 'No file selected');

  return (
    <div className="file-upload-wrapper">
      <label className="file-upload-label">
        <span className="file-upload-button">Choose File</span>
        <span className="file-name">{displayName}</span>
        <input type="file" onChange={handleChange} className="file-upload-input" />
      </label>

      {selectedFileName && (
        <button
          type="button"
          className="file-upload-clear"
          onClick={() => {
            setSelectedFileName('');
            onFileSelect(null);
          }}
          title="Remove selected file"
        >
          ✕
        </button>
      )}

      {currentFile && !selectedFileName && onRemove && (
        <button
          type="button"
          className="file-upload-clear"
          onClick={() => {
            onRemove();
            setSelectedFileName('');
          }}
          title="Remove existing attachment"
        >
          ✕
        </button>
      )}

      <p className="file-hint">Max 5 MB – Allowed: images, PDF, DOC, DOCX, TXT</p>
    </div>
  );
};

export default FileUpload;