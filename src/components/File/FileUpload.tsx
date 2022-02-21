import React from "react";

interface FileUploadProps {
  setFile: Function;
  accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [fileUrl, setFileUrl] = React.useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    setFileUrl(URL.createObjectURL(e.target.files![0]));
  };

  return (
    <div
      onClick={() => ref.current.click()}
      style={{ display: "flex", flexDirection: "column", alignItems: "start" }}
    >
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      <img src={fileUrl} alt="Будущий отель" style={{ width: "400px" }} />
      {children}
    </div>
  );
};

export default FileUpload;
