/*import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import ApiRoutes from '../../constants/ApiRoutes.constant';

const RichText = ({ name, value, onChange, onReady, onFocus, onBlur,disabled }) => {

    const editorConfiguration = {
        toolbar:{
            items: [
                'heading', '|',
                'fontfamily', 'fontsize', 'fontColor', '|',
                'alignment','|',
                'bold', 'italic', 'underline', 'strikethrough', '|',
                'numberedList', 'bulletedList', '|',
                'horizontalline', 'insertImage', 'insertTable', 'link', 'mediaEmbed', 'code','|',
                'undo', 'redo','|',
                'findAndReplace',
            ],
            shouldNotGroupWhenFull: true
        },
        ui: {
            viewportOffset: { top: 80 }
        },
        image: {
            toolbar: [
                'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', 'imageStyle:full',
                '|',
                'imageResize:original',
                '|',
                'imageTextAlternative'
            ],
            styles: [
                'alignLeft', 'alignCenter', 'alignRight', 'full'
            ],
        },
        mediaEmbed:{previewsInData:true},
        link: {
            // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
            addTargetToExternalLinks: true,
    
            // Let the users control the "download" attribute of each link.
            decorators: [
                {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'download'
                    }
                }
            ]
        },
        simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: `${ApiRoutes.INF}/cloudinary/ckeditor-upload`,
    
            // // Enable the XMLHttpRequest.withCredentials property.
            // withCredentials: true,
    
            // // Headers sent along with the XMLHttpRequest to the upload server.
            // headers: {
            //     'X-CSRF-TOKEN': 'CSRF-Token',
            //     Authorization: 'Bearer <JSON Web Token>'
            // }
        },
        // autosave: {
        //     save( editor ) {
        //         // The saveData() function must return a promise
        //         // which should be resolved when the data is successfully saved.
        //         return saveData( editor.getData() );
        //     }
        // }
    };

    const handleChange = (e, editor) => {
        const data = editor.getData();
        onChange(data)
    }

    // useEffect(() => {
    //     // ClassicEditor.builtinPlugins.map(plugin => console.log(plugin.pluginName));
    // }, [])

    return (
        <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={value}
            onReady={onReady}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
        />
    );
}

export default RichText;*/
