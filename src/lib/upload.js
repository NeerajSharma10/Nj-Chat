
import {storage} from './firebase'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';

const upload = async (avatar) => {
    return new Promise((resolve, reject) => {

        const storageRef = ref(storage, 'images/rivers.jpeg');
        const uploadTask = uploadBytesResumable(storageRef, avatar.file);
        
        uploadTask.on('state_changed', 
        (snapshot) => { 
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            console.log("Error");
            reject(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
            toast.info("Image Uploaded Bruh !!!");
            });
        }
        );

        console.log("Hello xxxx");

        //upload ending 
    });
}


export {upload}
