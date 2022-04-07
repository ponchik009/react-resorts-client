import React from "react";

interface FileUploadProps {
  setFile: Function;
  accept: string;
  path?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
  path = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8NT9z0NaWgWZ_vw7XyP7rFNu8ZHvdcHqRHqWx9OVaTxfgGjm9_E8IpsWEFOgOQGTxPw&usqp=CAU",
}) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [fileUrl, setFileUrl] = React.useState(path);

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
