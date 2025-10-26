import React from "react";

/**
 * @param getFileData - Required* - to receive the file object from this component, use event object in the receving function for the file data.
 * @param id - Required* - to uniquely identify the component in DOM
 * @param ref -  Required* - to receive ref for the component
 * @param style - Optional - add your own css classes to overwrite the styling. You can add any CSS classes to overwrite the input type styling
 * @param size - Optional - mention a number to limit the file size (in MBs)
 * @param accept - Optional - mention any file extension to limit the file type . You can do single file extension type or combine multiple file extensions to allow more than one format as in example.
 * 
 * @example <DragAndDrop 
 getFileData={getFileDataFromDragAndDrop}
 id="file123"
 ref={fileRef}
 style="bg-red bg-border"
 size="1"
 accept="pdf/docx"
>
@description Check Read me of the package for more details. Please Note: Different id and refs is important for multiple instances.
 */
const DragAndDrop = React.forwardRef(
	(
		{
			getFileData = (e) => {
				return e;
			},
			id = "uploadFile123",
			style = "",
			size = "",
			accept = "",
		},
		ref,
	) => {
		const [file, setFile] = React.useState(null);
		const [showWarning, setShowWarning] = React.useState(false);
		const [showTypeWarning, setShowTypeWarning] = React.useState(false);

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

			if (ref) {
				ref.current.value = null;
			}
		};

		const checkSize = (file) => {
			setShowWarning(false);
			setShowTypeWarning(false);

			if (size) {
				if (file.size > Number(size) * 1000000) {
					setFile(null);
					setShowWarning(true);
				} else {
					if (checkFileType(file)) {
						getFileData(file);
						setFile(file);
					} else {
						setFile(null);
						setShowTypeWarning(true);
					}
				}
			} else {
				if (checkFileType(file)) {
					getFileData(file);
					setFile(file);
				} else {
					setFile(null);
					setShowTypeWarning(true);
				}
			}
		};

		const checkFileType = (file) => {
			const extPattern = /\.[0-9a-z]+$/i;
			const fileExt = file.name.match(extPattern)[0];
			const fileType = fileExt.substring(1,fileExt.length);


			if (accept?.length === 0) {
				return true;
			}

			if (accept.includes(fileType)) {
				return true;
			}

			return false;
		};

		return (
			<label
				onDragEnter={(e) => handleDrag(e)}
				onDragLeave={(e) => handleDrag(e)}
				onDragOver={(e) => handleDrag(e)}
				onDrop={(e) => handleDrop(e)}
				htmlFor={id}
				className={`gur7_label_container_457 ${style}`}
			>
				Choose Or drop a file...
				<input
					onChange={(e) => uploadFile(e)}
					id={id}
					ref={ref}
					type="file"
					placeholder=""
					accept={accept}
					className="gur7_input_file_457"
				/>
				{file && (
					<>
						<p className="gur7_feedback_info">{file?.name}</p>
						<p className="gur7_feedback_info">{formatFileSize(file?.size)}</p>
					</>
				)}
				{showWarning && (
					<p className="gur7_feedback_info">File size limited to: {size} MB</p>
				)}
				{showTypeWarning && (
					<p className="gur7_feedback_info">
						File type allowed: {accept?.toUpperCase()}
					</p>
				)}
				<span
					className="gur7_cross"
					onClick={(e) => removeFile(e)}
					title="Remove added file"
				>
					&#128473;
				</span>
			</label>
		);
	},
);

export default DragAndDrop;
