import React, { useCallback, useRef, useState } from 'react';

type FileDropZoneProps = {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  label?: string;
};

const FileDropZone = ({
  onFiles,
  accept,
  multiple = true,
  className,
  label = 'Drag and drop files here, or click to select',
}: FileDropZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const chosen = Array.from(files);
      const valid = chosen.filter((file) => {
        if (!accept) return true;
        const accepted = accept.split(',').map((item) => item.trim());
        return accepted.some((pattern) => {
          if (pattern.startsWith('.')) {
            return file.name.toLowerCase().endsWith(pattern.toLowerCase());
          }
          return file.type === pattern;
        });
      });
      onFiles(multiple ? valid : valid.slice(0, 1));
    },
    [accept, multiple, onFiles],
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragActive(false);
      handleFiles(event.dataTransfer.files);
    },
    [handleFiles],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const onClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(event.target.files);
      // reset input value so same file triggers change event again
      event.target.value = '';
    },
    [handleFiles],
  );

  return (
    <div
      className={className}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        border: '2px dashed #ccc',
        borderRadius: 8,
        padding: 16,
        textAlign: 'center',
        background: isDragActive ? '#f5f5f5' : 'transparent',
        color: '#333',
      }}
      data-testid="file-drop-zone"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <p style={{ margin: 0 }}>{label}</p>
      {accept && (
        <small style={{ display: 'block', marginTop: 8 }}>
          Accepted: {accept}
        </small>
      )}
    </div>
  );
};

export default FileDropZone;
