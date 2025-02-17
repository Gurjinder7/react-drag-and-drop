
// import { forwardRef, useState } from "react";
import React from "react";

const DragAndDrop = React.forwardRef(
    (
        {
            setFileData = (e) => {
                return e;
            },
            id = "uploadFile",
            style = "",
            size = "",
            accept = ""
        },
        ref,
    ) => {
        const [file, setFile] = React.useState(null);
        const [showWarning, setShowWarning] = React.useState(false);
        const handleDrag = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer.files?.[0]) {
                checkSize(e.dataTransfer.files[0]);
            }
        };

        const uploadFile = (e) => {
            if (e.target.files?.[0]) {
                checkSize(e.target.files[0]);
            }
        };

        const formatFileSize = (value) => {
            if (value > 1000000) {
                return Number(value / (1024 * 1024)).toFixed(2) + " MB";
            }
            return (Number(value / (1024 * 1024)) * 1000).toFixed(2) + " KB";
        };

        const removeFile = (e) => {
            e.stopPropagation();
            e.preventDefault();
            setFile(null);
        };

        const checkSize = (file) => {
            setShowWarning(false);
            console.log(file);

            if (!!size) {
                if (file.size > Number(size)*1000000) {
                    setFile(null);
                    setShowWarning(true);
                } else {
                    setFileData(file);
                    setFile(file);
                }
            } else {
                setFileData(file);
                setFile(file);
            }
        
        };

        return (
            
            <label
                onDragEnter={(e) => handleDrag(e)}
                onDragLeave={(e) => handleDrag(e)}
                onDragOver={(e) => handleDrag(e)}
                onDrop={(e) => handleDrop(e)}
                htmlFor={id}
                className={style}
            >
                Choose Or drop a file
                <input
                    onChange={(e) => uploadFile(e)}
                    id={id}
                    ref={ref}
                    type="file"
                    placeholder=""
                    accept={accept}
                    className="inputfile"
                />
                {file && (
                    <>
                        <p>{file?.name}</p>
                        <p>{formatFileSize(file?.size)}</p>
                    </>
                )}

                {showWarning && (
                    <p>File size limited to: {size} MB</p>
                )}
                <span onClick={(e) => removeFile(e)} title="Remove added file">
                    &#128473;
                </span>
            </label>
        );
    },
);

export default DragAndDrop;
