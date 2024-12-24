import React, { useState } from 'react';
import ExifReader from 'exifreader';
import ExifReaderAlt from 'exif-reader';
import './ExifReaderTest.css';

const ExifReaderComparison = () => {
    const [metadataExifReader, setMetadataExifReader] = useState(null);
    const [metadataExifReaderAlt, setMetadataExifReaderAlt] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = async (event) => {
        setMetadataExifReader(null);
        setMetadataExifReaderAlt(null);
        setError(null);

        const file = event.target.files[0];
        if (!file) return;

        try {
            const arrayBuffer = await file.arrayBuffer();

            // `exifreader`
            const tagsExifReader = ExifReader.load(arrayBuffer);
            setMetadataExifReader(tagsExifReader);

            // `exif-reader`
            const dataView = new DataView(arrayBuffer);
            const tagsExifReaderAlt = ExifReaderAlt(dataView);
            setMetadataExifReaderAlt(tagsExifReaderAlt);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1>DesignPrint NYC - Image MetaData Tests</h1>
            </header>
            <main>
                <div className="file-input">
                    <input type="file" onChange={handleFileChange} />
                    {error && <p className="error">Error: {error}</p>}
                </div>
                <div className="columns">
                    <div className="column">
                        <h2>ExifReader Output</h2>
                        {metadataExifReader ? (
                            <pre>{JSON.stringify(metadataExifReader, null, 2)}</pre>
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                    <div className="column">
                        <h2>Exif-Reader Output</h2>
                        {metadataExifReaderAlt ? (
                            <pre>{JSON.stringify(metadataExifReaderAlt, null, 2)}</pre>
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ExifReaderComparison;
