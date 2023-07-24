import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAppContext } from "../../context/appContext";
import { Loader, Alert, IP } from "../../components";

const Upload = () => {
  const { file, setFile, UploadData, isLoading, showAlert } = useAppContext();
  const { show, setShow } = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);
  const handleUpload = () => {
    if (!file) {
      showAlert("warn", "file is not there");
      return;
    }
    UploadData(file[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
   
    <div className="flex items-center justify-start flex-col bg-[#f0f4f8] w-full  border-t border-l border-gray-300 "
    style={{ height: 'calc(100vh - 5.5rem)'}}
    >
      <div className="bg-white flex pt-[6rem] pb-[2.5rem]  flex-col w-9/12 md:w-6/12 items-center justify-center mt-[4rem] rounded-md "
      
      >
        {/* dropzone  */}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="bg-sky-50 w-full py-[6rem] px-[6rem] rounded-md border-[3px] border-dotted  mb-[1.5rem]  border-blue-500 cursor-pointer shadow-lg hover:shadow-xl transition duration-400 ease-in-out">
            {isDragActive ? (
              <p className="w-full">Drop the .xlsx ot .txt file here ...</p>
            ) : (
              <div className="flex flex-col gap-3 justify-center items-center">
                <span className="bg-blue-500 rounded-full p-2">
                  {/* <img src="/upload.png" width={56} alt="" /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>

                </span>
                
                <p className="w-full">
                  Drag 'n' drop file here or&nbsp;
                  <span className="font-medium underline">Choose files</span> 
                </p>
              </div>
            )}
          </div>
        </div>
        {/* btns */}
        <div className="flex mt-10 gap-3 ">
          <p className="bg-gray-100 flex items-center justify-center font-medium  rounded-md text-sm w-full  px-5 py-2.5">
            {file ? file[0]?.name : "Drop the file above"}
          </p>
          <button
            disabled={isLoading}
            onClick={handleUpload}
            className=" text-white bg-green-400 font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {/* if loading */}
        {isLoading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
