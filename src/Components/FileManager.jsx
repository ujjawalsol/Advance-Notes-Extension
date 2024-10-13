const FileManager = ({ type }) => {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      console.log(`${type} file selected: `, file);
    };
  
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">Upload {type} File</h3>
        <input type="file" onChange={handleFileChange} />
      </div>
    );
  };

export default FileManager;