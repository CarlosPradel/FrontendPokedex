import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageUpload = ({ onImageUpload }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);

        onImageUpload(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {previewUrl && <img src={previewUrl} alt="Vista previa" style={{ width: '150px', marginTop: '10px' }} />}
        </div>
    );
};


ImageUpload.propTypes = {
    onImageUpload: PropTypes.func.isRequired
};

export default ImageUpload;
