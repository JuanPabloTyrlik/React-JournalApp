export const fileUpload = async (file) => {
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dxd81c3e7/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'jp-journal-app');
    formData.append('file', file);
    const url =
        (await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData,
        })
            .then((resp) => resp.json())
            .then((data) => data.secure_url)) || null;
    return url;
};
