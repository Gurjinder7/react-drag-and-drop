import React from "react";

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

			if (accept?.length === 0) {
				return true;
			}
			if (accept === "pdf" && fileExt === ".pdf") {
				return true;
			}
			if (
				(accept === "image" && fileExt === ".jpg") ||
				(accept === "image" && fileExt === ".jpeg") ||
				(accept === "image" && fileExt === ".png")
			) {
				return true;
			}
			if (
				(accept === "doc" && fileExt === ".doc") ||
				(accept === "doc" && fileExt === ".docx")
			) {
				return true;
			}
			if (accept === "csv" && fileExt === ".csv") {
				return true;
			}
			if (
				(accept === "excel" && fileExt === ".xlsx") ||
				(accept === "excel" && fileExt === ".ods")
			) {
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
