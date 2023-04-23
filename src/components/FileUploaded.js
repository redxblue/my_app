import React, {useRef} from 'react'

const FileUploaded = ({onFileSelect}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        onFileSelect(e.target.files[0])
    }

    return (<div className="file-uploader">
        <input type="file" onChange={handleFileInput}/>
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary">
            </button>

    </div>
        
   )
}



export default FileUploaded;



{/*
const noop = () => {};

const FileInput = ({ value, onChange = noop, ...rest }) => (
  <div>
    {Boolean(value.length) && (
      <div>Selected files: {value.map(f => f.name).join(", ")}</div>
    )}
    <label>
      Click to select some files...
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        onChange={e => {
          onChange([...e.target.files]);
        }}
      />
    </label>
  </div>
  
);

*/}