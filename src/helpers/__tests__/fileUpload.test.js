import cloudinary from 'cloudinary';
import { fileUpload } from '../fileUpload';

cloudinary.config({
    cloud_name: 'dxd81c3e7',
    api_key: '162195671786613',
    api_secret: 'u5EnPMSo7wcLcQX-PPetquNNzZU',
});

describe('Tests on FileUpload', () => {
    test('should upload a file and return an url', async () => {
        const fileBlob = await fetch(
            'https://img.icons8.com/cotton/2x/image--v2.png'
        ).then((resp) => resp.blob());
        const file = new File([fileBlob], 'test-image.png');
        const url = await fileUpload(file);
        expect(url).toMatch(/^https?:/);
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');
        return await cloudinary.v2.api.delete_resources(imageId, {});
    }, 15000);
    test('should not upload an invalid file', async () => {
        const file = new File([], 'test-image.png');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    }, 15000);
});
